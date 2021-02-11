--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: core_api; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_api (
    id integer NOT NULL,
    api_id character varying(255) NOT NULL,
    api_authentication character varying(31) NOT NULL,
    api_type character varying(31) NOT NULL,
    contact_email character varying(255) NOT NULL,
    contact_phone character varying(255) NOT NULL,
    contact_url character varying(2000) NOT NULL,
    description text NOT NULL,
    forum_url character varying(2000) NOT NULL,
    forum_vendor character varying(31) NOT NULL,
    is_reference_implementation boolean NOT NULL,
    organization_name character varying(255) NOT NULL,
    service_name character varying(255) NOT NULL,
    terms_government_only boolean,
    terms_pay_per_use boolean,
    terms_support_response_time integer,
    terms_uptime_guarantee numeric(8,6),
    CONSTRAINT core_api_terms_support_response_time_e2919236_check CHECK ((terms_support_response_time >= 0))
);


--
-- Name: core_api_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_api_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_api_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_api_id_seq OWNED BY public.core_api.id;


--
-- Name: core_apibadge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_apibadge (
    id integer NOT NULL,
    api_id character varying(255) NOT NULL,
    badge_id integer NOT NULL
);


--
-- Name: core_apibadge_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_apibadge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_apibadge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_apibadge_id_seq OWNED BY public.core_apibadge.id;


--
-- Name: core_apidesignruletestsuite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_apidesignruletestsuite (
    id integer NOT NULL,
    uuid uuid,
    api_endpoint character varying(200),
    api_id character varying(255) NOT NULL
);


--
-- Name: core_apidesignruletestsuite_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_apidesignruletestsuite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_apidesignruletestsuite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_apidesignruletestsuite_id_seq OWNED BY public.core_apidesignruletestsuite.id;


--
-- Name: core_badge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_badge (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- Name: core_badge_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_badge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_badge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_badge_id_seq OWNED BY public.core_badge.id;


--
-- Name: core_code; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_code (
    id integer NOT NULL,
    source character varying(31) NOT NULL,
    owner_name character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    url character varying(2000) NOT NULL,
    description text NOT NULL,
    last_change timestamp with time zone NOT NULL,
    stars integer
);


--
-- Name: core_code_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_code_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_code_id_seq OWNED BY public.core_code.id;


--
-- Name: core_code_programming_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_code_programming_languages (
    id integer NOT NULL,
    code_id integer NOT NULL,
    programminglanguage_id integer NOT NULL
);


--
-- Name: core_code_programming_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_code_programming_languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_code_programming_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_code_programming_languages_id_seq OWNED BY public.core_code_programming_languages.id;


--
-- Name: core_codeapi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_codeapi (
    id integer NOT NULL,
    api_id character varying(255) NOT NULL,
    code_id integer NOT NULL
);


--
-- Name: core_codeapi_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_codeapi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_codeapi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_codeapi_id_seq OWNED BY public.core_codeapi.id;


--
-- Name: core_config; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_config (
    id integer NOT NULL,
    variable character varying(255) NOT NULL,
    enabled boolean NOT NULL
);


--
-- Name: core_config_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_config_id_seq OWNED BY public.core_config.id;


--
-- Name: core_designruleresult; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_designruleresult (
    id integer NOT NULL,
    rule_type_url character varying(200) NOT NULL,
    rule_type_name character varying(250) NOT NULL,
    rule_type_description text NOT NULL,
    success boolean NOT NULL,
    errors character varying(500)[],
    session_id integer NOT NULL
);


--
-- Name: core_designruleresult_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_designruleresult_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_designruleresult_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_designruleresult_id_seq OWNED BY public.core_designruleresult.id;


--
-- Name: core_designrulesession; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_designrulesession (
    id integer NOT NULL,
    started_at timestamp with time zone NOT NULL,
    percentage_score numeric(5,2) NOT NULL,
    test_version character varying(200) NOT NULL,
    test_suite_id integer NOT NULL
);


--
-- Name: core_designrulesession_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_designrulesession_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_designrulesession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_designrulesession_id_seq OWNED BY public.core_designrulesession.id;


--
-- Name: core_environment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_environment (
    id integer NOT NULL,
    name character varying(31) NOT NULL,
    api_url character varying(2000) NOT NULL,
    specification_url character varying(2000) NOT NULL,
    documentation_url character varying(2000) NOT NULL,
    api_id character varying(255) NOT NULL
);


--
-- Name: core_environment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_environment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_environment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_environment_id_seq OWNED BY public.core_environment.id;


--
-- Name: core_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_event (
    id integer NOT NULL,
    title text NOT NULL,
    start_date timestamp with time zone NOT NULL,
    location text NOT NULL,
    registration_url character varying(2000) NOT NULL,
    is_published boolean NOT NULL
);


--
-- Name: core_event_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_event_id_seq OWNED BY public.core_event.id;


--
-- Name: core_programminglanguage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_programminglanguage (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- Name: core_programminglanguage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_programminglanguage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_programminglanguage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_programminglanguage_id_seq OWNED BY public.core_programminglanguage.id;


--
-- Name: core_relation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_relation (
    id integer NOT NULL,
    from_api_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    to_api_id character varying(255) NOT NULL
);


--
-- Name: core_relation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_relation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_relation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_relation_id_seq OWNED BY public.core_relation.id;


--
-- Name: core_url; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_url (
    id integer NOT NULL,
    url character varying(2000) NOT NULL
);


--
-- Name: core_url_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_url_id_seq OWNED BY public.core_url.id;


--
-- Name: core_urlapilink; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_urlapilink (
    id integer NOT NULL,
    field character varying(31) NOT NULL,
    api_id integer NOT NULL,
    url_id integer NOT NULL
);


--
-- Name: core_urlapilink_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_urlapilink_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_urlapilink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_urlapilink_id_seq OWNED BY public.core_urlapilink.id;


--
-- Name: core_urlprobe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_urlprobe (
    id integer NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    status_code smallint,
    error text NOT NULL,
    url_id integer NOT NULL
);


--
-- Name: core_urlprobe_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_urlprobe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_urlprobe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_urlprobe_id_seq OWNED BY public.core_urlprobe.id;


--
-- Name: core_api id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_api ALTER COLUMN id SET DEFAULT nextval('public.core_api_id_seq'::regclass);


--
-- Name: core_apibadge id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apibadge ALTER COLUMN id SET DEFAULT nextval('public.core_apibadge_id_seq'::regclass);


--
-- Name: core_apidesignruletestsuite id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apidesignruletestsuite ALTER COLUMN id SET DEFAULT nextval('public.core_apidesignruletestsuite_id_seq'::regclass);


--
-- Name: core_badge id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_badge ALTER COLUMN id SET DEFAULT nextval('public.core_badge_id_seq'::regclass);


--
-- Name: core_code id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code ALTER COLUMN id SET DEFAULT nextval('public.core_code_id_seq'::regclass);


--
-- Name: core_code_programming_languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code_programming_languages ALTER COLUMN id SET DEFAULT nextval('public.core_code_programming_languages_id_seq'::regclass);


--
-- Name: core_codeapi id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_codeapi ALTER COLUMN id SET DEFAULT nextval('public.core_codeapi_id_seq'::regclass);


--
-- Name: core_config id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_config ALTER COLUMN id SET DEFAULT nextval('public.core_config_id_seq'::regclass);


--
-- Name: core_designruleresult id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_designruleresult ALTER COLUMN id SET DEFAULT nextval('public.core_designruleresult_id_seq'::regclass);


--
-- Name: core_designrulesession id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_designrulesession ALTER COLUMN id SET DEFAULT nextval('public.core_designrulesession_id_seq'::regclass);


--
-- Name: core_environment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_environment ALTER COLUMN id SET DEFAULT nextval('public.core_environment_id_seq'::regclass);


--
-- Name: core_event id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_event ALTER COLUMN id SET DEFAULT nextval('public.core_event_id_seq'::regclass);


--
-- Name: core_programminglanguage id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_programminglanguage ALTER COLUMN id SET DEFAULT nextval('public.core_programminglanguage_id_seq'::regclass);


--
-- Name: core_relation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_relation ALTER COLUMN id SET DEFAULT nextval('public.core_relation_id_seq'::regclass);


--
-- Name: core_url id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_url ALTER COLUMN id SET DEFAULT nextval('public.core_url_id_seq'::regclass);


--
-- Name: core_urlapilink id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_urlapilink ALTER COLUMN id SET DEFAULT nextval('public.core_urlapilink_id_seq'::regclass);


--
-- Name: core_urlprobe id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_urlprobe ALTER COLUMN id SET DEFAULT nextval('public.core_urlprobe_id_seq'::regclass);


--
-- Name: core_api core_api_api_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_api
    ADD CONSTRAINT core_api_api_id_key UNIQUE (api_id);


--
-- Name: core_api core_api_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_api
    ADD CONSTRAINT core_api_pkey PRIMARY KEY (id);


--
-- Name: core_apibadge core_apibadge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apibadge
    ADD CONSTRAINT core_apibadge_pkey PRIMARY KEY (id);


--
-- Name: core_apidesignruletestsuite core_apidesignruletestsuite_api_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apidesignruletestsuite
    ADD CONSTRAINT core_apidesignruletestsuite_api_id_key UNIQUE (api_id);


--
-- Name: core_apidesignruletestsuite core_apidesignruletestsuite_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apidesignruletestsuite
    ADD CONSTRAINT core_apidesignruletestsuite_pkey PRIMARY KEY (id);


--
-- Name: core_badge core_badge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_badge
    ADD CONSTRAINT core_badge_pkey PRIMARY KEY (id);


--
-- Name: core_code core_code_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code
    ADD CONSTRAINT core_code_pkey PRIMARY KEY (id);


--
-- Name: core_code_programming_languages core_code_programming_la_code_id_programminglangu_142fb019_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code_programming_languages
    ADD CONSTRAINT core_code_programming_la_code_id_programminglangu_142fb019_uniq UNIQUE (code_id, programminglanguage_id);


--
-- Name: core_code_programming_languages core_code_programming_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code_programming_languages
    ADD CONSTRAINT core_code_programming_languages_pkey PRIMARY KEY (id);


--
-- Name: core_code core_code_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code
    ADD CONSTRAINT core_code_url_key UNIQUE (url);


--
-- Name: core_codeapi core_codeapi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_codeapi
    ADD CONSTRAINT core_codeapi_pkey PRIMARY KEY (id);


--
-- Name: core_config core_config_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_config
    ADD CONSTRAINT core_config_pkey PRIMARY KEY (id);


--
-- Name: core_config core_config_variable_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_config
    ADD CONSTRAINT core_config_variable_key UNIQUE (variable);


--
-- Name: core_designruleresult core_designruleresult_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_designruleresult
    ADD CONSTRAINT core_designruleresult_pkey PRIMARY KEY (id);


--
-- Name: core_designrulesession core_designrulesession_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_designrulesession
    ADD CONSTRAINT core_designrulesession_pkey PRIMARY KEY (id);


--
-- Name: core_environment core_environment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_environment
    ADD CONSTRAINT core_environment_pkey PRIMARY KEY (id);


--
-- Name: core_event core_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_event
    ADD CONSTRAINT core_event_pkey PRIMARY KEY (id);


--
-- Name: core_programminglanguage core_programminglanguage_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_programminglanguage
    ADD CONSTRAINT core_programminglanguage_name_key UNIQUE (name);


--
-- Name: core_programminglanguage core_programminglanguage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_programminglanguage
    ADD CONSTRAINT core_programminglanguage_pkey PRIMARY KEY (id);


--
-- Name: core_relation core_relation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_relation
    ADD CONSTRAINT core_relation_pkey PRIMARY KEY (id);


--
-- Name: core_url core_url_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_url
    ADD CONSTRAINT core_url_pkey PRIMARY KEY (id);


--
-- Name: core_url core_url_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_url
    ADD CONSTRAINT core_url_url_key UNIQUE (url);


--
-- Name: core_urlapilink core_urlapilink_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_urlapilink
    ADD CONSTRAINT core_urlapilink_pkey PRIMARY KEY (id);


--
-- Name: core_urlprobe core_urlprobe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_urlprobe
    ADD CONSTRAINT core_urlprobe_pkey PRIMARY KEY (id);


--
-- Name: core_api_api_id_2f4913ac_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_api_api_id_2f4913ac_like ON public.core_api USING btree (api_id varchar_pattern_ops);


--
-- Name: core_apibadge_api_id_d68f8ec2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_apibadge_api_id_d68f8ec2 ON public.core_apibadge USING btree (api_id);


--
-- Name: core_apibadge_api_id_d68f8ec2_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_apibadge_api_id_d68f8ec2_like ON public.core_apibadge USING btree (api_id varchar_pattern_ops);


--
-- Name: core_apibadge_badge_id_ff11a4e8; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_apibadge_badge_id_ff11a4e8 ON public.core_apibadge USING btree (badge_id);


--
-- Name: core_apidesignruletestsuite_api_id_2e3dc731_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_apidesignruletestsuite_api_id_2e3dc731_like ON public.core_apidesignruletestsuite USING btree (api_id varchar_pattern_ops);


--
-- Name: core_code_last_change_bf026719; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_code_last_change_bf026719 ON public.core_code USING btree (last_change);


--
-- Name: core_code_programming_languages_code_id_42f55771; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_code_programming_languages_code_id_42f55771 ON public.core_code_programming_languages USING btree (code_id);


--
-- Name: core_code_programming_languages_programminglanguage_id_afd45b15; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_code_programming_languages_programminglanguage_id_afd45b15 ON public.core_code_programming_languages USING btree (programminglanguage_id);


--
-- Name: core_code_url_015bc1dd_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_code_url_015bc1dd_like ON public.core_code USING btree (url varchar_pattern_ops);


--
-- Name: core_codeapi_api_id_255daaa7; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_codeapi_api_id_255daaa7 ON public.core_codeapi USING btree (api_id);


--
-- Name: core_codeapi_api_id_255daaa7_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_codeapi_api_id_255daaa7_like ON public.core_codeapi USING btree (api_id varchar_pattern_ops);


--
-- Name: core_codeapi_code_id_93a40ac2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_codeapi_code_id_93a40ac2 ON public.core_codeapi USING btree (code_id);


--
-- Name: core_config_variable_2f56a937_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_config_variable_2f56a937_like ON public.core_config USING btree (variable varchar_pattern_ops);


--
-- Name: core_designruleresult_session_id_e82fe12d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_designruleresult_session_id_e82fe12d ON public.core_designruleresult USING btree (session_id);


--
-- Name: core_designrulesession_test_suite_id_45ebc41c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_designrulesession_test_suite_id_45ebc41c ON public.core_designrulesession USING btree (test_suite_id);


--
-- Name: core_environment_api_id_314dde4b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_environment_api_id_314dde4b ON public.core_environment USING btree (api_id);


--
-- Name: core_environment_api_id_314dde4b_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_environment_api_id_314dde4b_like ON public.core_environment USING btree (api_id varchar_pattern_ops);


--
-- Name: core_event_start_date_29821cf6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_event_start_date_29821cf6 ON public.core_event USING btree (start_date);


--
-- Name: core_programminglanguage_name_6bd382a4_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_programminglanguage_name_6bd382a4_like ON public.core_programminglanguage USING btree (name varchar_pattern_ops);


--
-- Name: core_relation_from_api_id_5c5360dc; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_relation_from_api_id_5c5360dc ON public.core_relation USING btree (from_api_id);


--
-- Name: core_relation_from_api_id_5c5360dc_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_relation_from_api_id_5c5360dc_like ON public.core_relation USING btree (from_api_id varchar_pattern_ops);


--
-- Name: core_relation_to_api_id_cc214e96; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_relation_to_api_id_cc214e96 ON public.core_relation USING btree (to_api_id);


--
-- Name: core_relation_to_api_id_cc214e96_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_relation_to_api_id_cc214e96_like ON public.core_relation USING btree (to_api_id varchar_pattern_ops);


--
-- Name: core_url_url_36efdff4_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_url_url_36efdff4_like ON public.core_url USING btree (url varchar_pattern_ops);


--
-- Name: core_urlapilink_api_id_65a7bea9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_urlapilink_api_id_65a7bea9 ON public.core_urlapilink USING btree (api_id);


--
-- Name: core_urlapilink_url_id_732f9a3b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_urlapilink_url_id_732f9a3b ON public.core_urlapilink USING btree (url_id);


--
-- Name: core_urlpro_url_id_82a002_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_urlpro_url_id_82a002_idx ON public.core_urlprobe USING btree (url_id, "timestamp" DESC);


--
-- Name: core_urlprobe_url_id_b650da51; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX core_urlprobe_url_id_b650da51 ON public.core_urlprobe USING btree (url_id);


--
-- Name: core_apibadge core_apibadge_api_id_d68f8ec2_fk_core_api_api_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apibadge
    ADD CONSTRAINT core_apibadge_api_id_d68f8ec2_fk_core_api_api_id FOREIGN KEY (api_id) REFERENCES public.core_api(api_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_apibadge core_apibadge_badge_id_ff11a4e8_fk_core_badge_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apibadge
    ADD CONSTRAINT core_apibadge_badge_id_ff11a4e8_fk_core_badge_id FOREIGN KEY (badge_id) REFERENCES public.core_badge(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_apidesignruletestsuite core_apidesignruletestsuite_api_id_2e3dc731_fk_core_api_api_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_apidesignruletestsuite
    ADD CONSTRAINT core_apidesignruletestsuite_api_id_2e3dc731_fk_core_api_api_id FOREIGN KEY (api_id) REFERENCES public.core_api(api_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_code_programming_languages core_code_programmin_code_id_42f55771_fk_core_code; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code_programming_languages
    ADD CONSTRAINT core_code_programmin_code_id_42f55771_fk_core_code FOREIGN KEY (code_id) REFERENCES public.core_code(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_code_programming_languages core_code_programmin_programminglanguage__afd45b15_fk_core_prog; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_code_programming_languages
    ADD CONSTRAINT core_code_programmin_programminglanguage__afd45b15_fk_core_prog FOREIGN KEY (programminglanguage_id) REFERENCES public.core_programminglanguage(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_codeapi core_codeapi_api_id_255daaa7_fk_core_api_api_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_codeapi
    ADD CONSTRAINT core_codeapi_api_id_255daaa7_fk_core_api_api_id FOREIGN KEY (api_id) REFERENCES public.core_api(api_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_codeapi core_codeapi_code_id_93a40ac2_fk_core_code_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_codeapi
    ADD CONSTRAINT core_codeapi_code_id_93a40ac2_fk_core_code_id FOREIGN KEY (code_id) REFERENCES public.core_code(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_designruleresult core_designruleresul_session_id_e82fe12d_fk_core_desi; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_designruleresult
    ADD CONSTRAINT core_designruleresul_session_id_e82fe12d_fk_core_desi FOREIGN KEY (session_id) REFERENCES public.core_designrulesession(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_designrulesession core_designrulesessi_test_suite_id_45ebc41c_fk_core_apid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_designrulesession
    ADD CONSTRAINT core_designrulesessi_test_suite_id_45ebc41c_fk_core_apid FOREIGN KEY (test_suite_id) REFERENCES public.core_apidesignruletestsuite(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_environment core_environment_api_id_314dde4b_fk_core_api_api_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_environment
    ADD CONSTRAINT core_environment_api_id_314dde4b_fk_core_api_api_id FOREIGN KEY (api_id) REFERENCES public.core_api(api_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_relation core_relation_from_api_id_5c5360dc_fk_core_api_api_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_relation
    ADD CONSTRAINT core_relation_from_api_id_5c5360dc_fk_core_api_api_id FOREIGN KEY (from_api_id) REFERENCES public.core_api(api_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_relation core_relation_to_api_id_cc214e96_fk_core_api_api_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_relation
    ADD CONSTRAINT core_relation_to_api_id_cc214e96_fk_core_api_api_id FOREIGN KEY (to_api_id) REFERENCES public.core_api(api_id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_urlapilink core_urlapilink_api_id_65a7bea9_fk_core_api_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_urlapilink
    ADD CONSTRAINT core_urlapilink_api_id_65a7bea9_fk_core_api_id FOREIGN KEY (api_id) REFERENCES public.core_api(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_urlapilink core_urlapilink_url_id_732f9a3b_fk_core_url_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_urlapilink
    ADD CONSTRAINT core_urlapilink_url_id_732f9a3b_fk_core_url_id FOREIGN KEY (url_id) REFERENCES public.core_url(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_urlprobe core_urlprobe_url_id_b650da51_fk_core_url_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_urlprobe
    ADD CONSTRAINT core_urlprobe_url_id_b650da51_fk_core_url_id FOREIGN KEY (url_id) REFERENCES public.core_url(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

