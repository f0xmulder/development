# Developer documentation
In this application we use the [Go programming language](https://golang.org) for the backend systems and [React](https://reactjs.org/) for the frontend.

## Setup your development environment
First make sure the following tools are available on your computer:

* [Git](https://git-scm.com/)
* [Go](https://golang.org/doc/install)
* [Node.js](https://nodejs.org/) (with NPM)
* [Modd](https://github.com/cortesi/modd)

Then clone this repository:

```bash
git clone git@gitlab.com:commonground/developer.overheid.nl.git
cd developer.overheid.nl/
```

To start the API server:

```bash
cd api/ && modd
```

To start the frontend application:

```bash
cd ui/ && npm install && npm start
```

To run the API tests as a watcher:

```bash
cd api/ && modd -f tests.conf
```

The last command should automatically open a browser on [http://localhost:3000](http://localhost:3000/).
