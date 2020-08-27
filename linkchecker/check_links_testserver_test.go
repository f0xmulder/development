package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"net/http/httptest"
	"sync"
	"time"

	"linkchecker/gitlab"
)

type testLogger interface {
	Log(args ...interface{})
	Logf(format string, args ...interface{})
}

type fmtLogger struct{}

func (l fmtLogger) Log(args ...interface{})                 { fmt.Println(args...) }
func (l fmtLogger) Logf(format string, args ...interface{}) { fmt.Printf(format, args...) }

type nullLogger struct{}

func (l nullLogger) Log(args ...interface{})                 {}
func (l nullLogger) Logf(format string, args ...interface{}) {}

func panicLogErr(l testLogger, err error) {
	if err != nil {
		l.Log(err)
		panic(err)
	}
}

type rw http.ResponseWriter
type rq *http.Request

func Writefln(l testLogger, r rw, format string, args ...interface{}) int {
	msg := []byte(fmt.Sprintf(format+"\n", args...))
	nbytes, err := r.Write(msg)
	panicLogErr(l, err)
	if nbytes != len(msg) {
		panicLogErr(l, errors.New(fmt.Sprintf("Unable to write full message, only %v of %v bytes written", nbytes, len(msg))))
	}
	return nbytes
}

// handler contains shared data for the request handler.
type handler struct {
	lock         sync.Mutex
	callCount    map[string]int
	gitlabPosts  []string
	logger       testLogger
	closeChannel chan struct{}
}

func (handler *handler) accessCount(path string) int {
	handler.lock.Lock()
	defer handler.lock.Unlock()
	return handler.callCount[path]
}
func (handler *handler) recordAccess(path string) {
	handler.lock.Lock()
	defer handler.lock.Unlock()
	handler.callCount[path]++
}

type tcpServer struct {
	listener net.Listener
}

func newTcpServer(logger testLogger, requestHandler func(c net.Conn)) *tcpServer {
	listener, err := net.Listen("tcp4", "127.0.0.1:0")
	if err != nil {
		logger.Log(err)
		panic(err)
	}

	go func() {
		for {
			conn, err := listener.Accept()
			if err != nil {
				if errors.Unwrap(err) != nil &&
					errors.Unwrap(err).Error() == "use of closed network connection" {
					// Server was closed
					return
				}
				logger.Log(err)
			}
			go requestHandler(conn)
		}
	}()

	return &tcpServer{listener}
}

func (t *tcpServer) Addr() string {
	return t.listener.Addr().String()
}

func (t *tcpServer) Close() {
	t.listener.Close()
}

type testServer struct {
	httpServer          *httptest.Server
	emptyResponseServer *tcpServer
	resetServer         *tcpServer
	closedServer        *tcpServer
}

func (s testServer) Close() {
	close(s.httpServer.Config.Handler.(*handler).closeChannel)
	s.httpServer.Close()
	s.emptyResponseServer.Close()
	s.resetServer.Close()
}

func (s testServer) getGitlabSubmissions() (submissions []string) {
	handler := s.httpServer.Config.Handler.(*handler)
	handler.lock.Lock()
	defer handler.lock.Unlock()
	submissions = handler.gitlabPosts
	handler.gitlabPosts = []string{}
	return
}

func runTestServer(logger testLogger) testServer {
	handler := &handler{
		callCount:    map[string]int{},
		logger:       logger,
		closeChannel: make(chan struct{}),
	}

	httpServer := httptest.NewServer(handler)

	resetServer := newTcpServer(logger, func(conn net.Conn) {
		// Close generates a reset if there is unread data in the receive buffer, so wait for request to arrive
		time.Sleep(100 * time.Microsecond)
		conn.Close()
	})
	emptyResponseServer := newTcpServer(logger, func(conn net.Conn) {
		// Make sure the receive buffer is empty to generate a clean shutdown
		conn.Read(make([]byte, 5000))
		conn.Close()
	})
	closedServer := newTcpServer(logger, func(c net.Conn) {})
	closedServer.Close()

	return testServer{httpServer, emptyResponseServer, resetServer, closedServer}
}

func (handler *handler) ServeHTTP(resp http.ResponseWriter, req *http.Request) {
	if req.URL.Path == "/api/v4/projects/"+projectId+"/issues" {
		handleGitlabSubmit(resp, req, handler)
		return
	}

	if req.Method != "GET" {
		resp.Header().Add("Allow", "GET")
		resp.WriteHeader(405)
		Writefln(handler.logger, resp, "Method %s not allowed", req.Method)
		return
	}

	handler.recordAccess(req.URL.Path)

	requestHandler, ok := getHandlers(resp, req, handler)[req.URL.Path]
	if ok {
		requestHandler()
		return
	}

	Writefln(handler.logger, resp, "Path %s accessed %v times", req.URL.Path, handler.accessCount(req.URL.Path))
}

func handleGitlabSubmit(resp rw, req rq, handler *handler) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		handler.logger.Log("error reading gitlab submission body:", err)
		resp.WriteHeader(500)
		Writefln(handler.logger, resp, "error reading post body")
		return
	}
	handler.logger.Log("got Gitlab submission", string(body))

	handler.lock.Lock()
	handler.gitlabPosts = append(handler.gitlabPosts, string(body))
	handler.lock.Unlock()

	issue := gitlab.Issue{
		ID:          42,
		Title:       "Test",
		Description: "Test",
		WebURL:      "https://test/issues/42",
	}

	resp.WriteHeader(http.StatusCreated)
	resp.Header().Set("Content-Type", "application/json")
	panicOnErr(json.NewEncoder(resp).Encode(&issue))
}

func getHandlers(resp rw, req rq, handler *handler) map[string]func() {
	return map[string]func(){
		"/ok": func() {
			Writefln(handler.logger, resp, "ok")
		},
		"/ok2": func() {
			Writefln(handler.logger, resp, "ok")
		},
		"/notfound": func() {
			resp.WriteHeader(404)
			Writefln(handler.logger, resp, "not found")
		},
		"/serverError": func() {
			resp.WriteHeader(500)
			Writefln(handler.logger, resp, "server error")
		},
		"/timeout": func() {
			// Block until server is closed
			<-handler.closeChannel
		},
		"/startToFail": func() {
			if handler.accessCount(req.URL.Path) > 1 {
				resp.WriteHeader(500)
				Writefln(handler.logger, resp, "failing")
			} else {
				Writefln(handler.logger, resp, "ok")
			}
		},
	}
}
