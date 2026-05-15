--
-- PostgreSQL database dump
--

\restrict itulaAbs1h4sDrWqVrgZebDVwblhkKZckxepBKMmcJPFfJeBYnWdTFb0h4DTIWp

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg12+1)
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: herstories_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO herstories_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: archive_items; Type: TABLE; Schema: public; Owner: herstories_user
--

CREATE TABLE public.archive_items (
    id integer NOT NULL,
    title character varying NOT NULL,
    item_type character varying NOT NULL,
    description text,
    era character varying,
    region character varying,
    country character varying,
    tags character varying[],
    source character varying,
    file_url character varying,
    thumbnail_url character varying,
    is_published boolean,
    created_at timestamp without time zone
);


ALTER TABLE public.archive_items OWNER TO herstories_user;

--
-- Name: archive_items_id_seq; Type: SEQUENCE; Schema: public; Owner: herstories_user
--

CREATE SEQUENCE public.archive_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.archive_items_id_seq OWNER TO herstories_user;

--
-- Name: archive_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: herstories_user
--

ALTER SEQUENCE public.archive_items_id_seq OWNED BY public.archive_items.id;


--
-- Name: biographies; Type: TABLE; Schema: public; Owner: herstories_user
--

CREATE TABLE public.biographies (
    id integer NOT NULL,
    name character varying,
    image character varying,
    summary character varying,
    country character varying,
    flag character varying,
    category character varying,
    details json,
    slug character varying
);


ALTER TABLE public.biographies OWNER TO herstories_user;

--
-- Name: biographies_id_seq; Type: SEQUENCE; Schema: public; Owner: herstories_user
--

CREATE SEQUENCE public.biographies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.biographies_id_seq OWNER TO herstories_user;

--
-- Name: biographies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: herstories_user
--

ALTER SEQUENCE public.biographies_id_seq OWNED BY public.biographies.id;


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: herstories_user
--

CREATE TABLE public.blog_posts (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    excerpt text,
    content text NOT NULL,
    category character varying,
    cover_image character varying,
    author character varying,
    is_published boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.blog_posts OWNER TO herstories_user;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: herstories_user
--

CREATE SEQUENCE public.blog_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blog_posts_id_seq OWNER TO herstories_user;

--
-- Name: blog_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: herstories_user
--

ALTER SEQUENCE public.blog_posts_id_seq OWNED BY public.blog_posts.id;


--
-- Name: submissions; Type: TABLE; Schema: public; Owner: herstories_user
--

CREATE TABLE public.submissions (
    id integer NOT NULL,
    submission_type character varying NOT NULL,
    subject_name character varying NOT NULL,
    country character varying,
    category character varying,
    summary text,
    full_story text,
    education text,
    career_highlights text,
    honors text,
    impact text,
    reason text,
    source text,
    submitter_name character varying,
    submitter_email character varying,
    status character varying,
    created_at timestamp without time zone
);


ALTER TABLE public.submissions OWNER TO herstories_user;

--
-- Name: submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: herstories_user
--

CREATE SEQUENCE public.submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.submissions_id_seq OWNER TO herstories_user;

--
-- Name: submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: herstories_user
--

ALTER SEQUENCE public.submissions_id_seq OWNED BY public.submissions.id;


--
-- Name: archive_items id; Type: DEFAULT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.archive_items ALTER COLUMN id SET DEFAULT nextval('public.archive_items_id_seq'::regclass);


--
-- Name: biographies id; Type: DEFAULT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.biographies ALTER COLUMN id SET DEFAULT nextval('public.biographies_id_seq'::regclass);


--
-- Name: blog_posts id; Type: DEFAULT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN id SET DEFAULT nextval('public.blog_posts_id_seq'::regclass);


--
-- Name: submissions id; Type: DEFAULT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.submissions ALTER COLUMN id SET DEFAULT nextval('public.submissions_id_seq'::regclass);


--
-- Data for Name: archive_items; Type: TABLE DATA; Schema: public; Owner: herstories_user
--

COPY public.archive_items (id, title, item_type, description, era, region, country, tags, source, file_url, thumbnail_url, is_published, created_at) FROM stdin;
1	The Abeokuta Women's Revolt, 1949	document	A detailed account of the mass protest led by Funmilayo Ransome-Kuti and the Abeokuta Women's Union against taxation and the oppressive rule of the Alake. Over 10,000 women participated, forcing the Alake to abdicate.	colonial	West Africa	nigeria	{protest,taxation,"women's rights",Yoruba,"colonial resistance"}	Nigerian National Archives	\N	/assets/funmi-kuti.jpeg	t	2026-04-28 20:20:54.088314
2	Wangari Maathai and the Green Belt Movement	photo	A photographic record of Wangari Maathai's founding of the Green Belt Movement in 1977, which mobilised thousands of Kenyan women to plant trees, conserve the environment and fight for democratic rights.	post-independence	East Africa	kenya	{environment,activism,"Nobel Prize",reforestation,"women's empowerment"}	Green Belt Movement Archive	\N	/assets/wangari.jpeg	t	2026-04-28 20:20:54.08833
3	Ellen Johnson Sirleaf — Inaugural Address, 2006	document	The full text of Ellen Johnson Sirleaf's inaugural address as President of Liberia — the first female head of state in Africa. She called for reconciliation, reconstruction and women's inclusion in governance.	contemporary	West Africa	liberia	{presidency,democracy,reconciliation,"first female president"}	Liberian Government Archives	\N	/assets/sirleaf.jpg	t	2026-04-28 20:20:54.088332
4	Miriam Makeba at the United Nations, 1963	oral_history	Transcript of Miriam Makeba's historic testimony before the United Nations Special Committee Against Apartheid, where she spoke out against the South African apartheid regime and called for international action.	colonial	Southern Africa	south-africa	{apartheid,"United Nations",music,activism,testimony}	United Nations Archives	\N	/assets/makemba.jpeg	t	2026-04-28 20:20:54.088333
5	Yaa Asantewaa and the War of the Golden Stool, 1900	document	Historical records documenting Yaa Asantewaa's role as the military leader of the Ashanti uprising against British colonial rule. She rallied chiefs and warriors when male leaders hesitated, leading one of the last major wars of resistance in Africa.	pre-colonial	West Africa	ghana	{resistance,Ashanti,"British colonialism","military leadership","Golden Stool"}	Ghana National Archives	\N	/assets/yaa-asantewa.webp	t	2026-04-28 20:20:54.088334
6	Charlotte Maxeke — First Black South African Woman Graduate	photo	Photographic and written records commemorating Charlotte Maxeke's graduation from Wilberforce University in Ohio in 1903 — making her the first Black South African woman to earn a university degree.	colonial	Southern Africa	south-africa	{education,first,ANC,"women's rights",pioneer}	South African History Archive	\N	/assets/charlotte-maxeke.jpeg	t	2026-04-28 20:20:54.088335
7	Chimamanda Ngozi Adichie — We Should All Be Feminists, TED 2012	oral_history	Transcript of Chimamanda Ngozi Adichie's landmark TED talk delivered in 2012, later adapted into a book. The talk redefined feminist discourse globally and was sampled by Beyoncé in the song Flawless.	contemporary	West Africa	nigeria	{feminism,"TED talk",literature,gender,identity}	TED Archives	\N	/assets/adiche.jpg	t	2026-04-28 20:20:54.088336
8	Fatou Bensouda — ICC Chief Prosecutor Appointment, 2012	document	Official records and press materials documenting Fatou Bensouda's election as Chief Prosecutor of the International Criminal Court — the first African woman to hold the position.	contemporary	West Africa	gambia	{"international law",ICC,justice,"first African woman","war crimes"}	International Criminal Court	\N	/assets/fatou-bensouda.jpg	t	2026-04-28 20:20:54.088337
\.


--
-- Data for Name: biographies; Type: TABLE DATA; Schema: public; Owner: herstories_user
--

COPY public.biographies (id, name, image, summary, country, flag, category, details, slug) FROM stdin;
1	Chimamanda Ngozi Adichie	adiche.jpg	Award-winning Nigerian writer and feminist icon.	nigeria	flags/nigeria.png	Feminist	{"basic_info": {"full_name": "Chimamanda Ngozi Adichie", "birth": "September 15, 1977 in Enugu, Nigeria; raised in Nsukka", "nationality": "Nigerian", "physical_appearance": "N/A", "status": "Alive"}, "education": [{"institution": "University of Nigeria", "degree": "Studied Medicine (not completed)", "year": "1996"}, {"institution": "Eastern Connecticut State University", "degree": "BA in Communication and Political Science (summa cum laude)", "year": "2001"}, {"institution": "Johns Hopkins University", "degree": "MA in Creative Writing", "year": "2003"}, {"institution": "Yale University", "degree": "MA in African History", "year": "2008"}], "career_highlights": ["Debut novel *Purple Hibiscus* (2003), won Commonwealth Writers\\u2019 Prize for Best First Book", "*Half of a Yellow Sun* (2006), won the Orange Prize for Fiction", "*Americanah* (2013), won National Book Critics Circle Award and New York Times Top Ten Book", "*The Visit* (2025, short story titled *Dream Count*) marked her return to fiction after a decade"], "author_and_advocate": ["Delivered TED talks: *The Danger of a Single Story* (2009) and *We Should All Be Feminists* (2012)", "*We Should All Be Feminists* adapted into a book (2014) and featured in Beyonc\\u00e9\\u2019s *Flawless*", "Authored *Dear Ijeawele* (2017) and *Notes on Grief* (2021)"], "honors": ["MacArthur Fellowship (2008)", "Named in The New Yorker\\u2019s '20 Under 40' (2010)", "Listed in Africa39, Time 100 Most Influential People (2015), Fortune's World\\u2019s 50 Greatest Leaders (2017)", "Holds 16 honorary doctorates from institutions including Yale, Duke, Edinburgh, and University of Johannesburg", "Elected to American Academy of Arts and Sciences and of Arts and Letters (2017)", "Received W.\\u202fE.\\u202fB. Du Bois Medal (2022)", "Declined Nigeria's national honor (Order of the Federal Republic) in 2022"], "personal_life": ["Married Dr. Ivara Esege in 2009", "Mother of one daughter (2016) and recently welcomed twins", "Divides time between Nigeria and the U.S.", "Leads creative writing workshops and critiques traditional gender roles"], "impact_and_influence": ["Revitalized global interest in African literature and challenged stereotypical narratives", "Influenced feminist thought worldwide through fiction and essays", "Her TED talks are among the most-watched globally and have shaped pop culture (notably Beyonc\\u00e9\\u2019s branding)"], "full_summary": "Chimamanda Ngozi Adichie is a celebrated Nigerian author, feminist advocate, and global literary figure. Her groundbreaking novels (*Purple Hibiscus*, *Half of a Yellow Sun*, *Americanah*) and essays (*We Should All Be Feminists*, *Dear Ijeawele*) explore themes of identity, gender, migration, and cultural narrative. With numerous awards, fellowships, and honorary degrees\\u2014and a significant role in shaping twenty\\u2011first\\u2011century discussions about feminism and African stories\\u2014she remains influential both literary and intellectually."}	chimamanda-ngozi-adichie
2	Funmilayo Ransome-Kuti	funmi-kuti.jpeg	Trailblazing Nigerian women’s rights activist and nationalist.	nigeria	flags/nigeria.png	Activist	{"basic_info": {"full_name": "Frances Abigail Olufunmilayo Thomas Ransome\\u2011Kuti", "birth": "October 25, 1900 in Abeokuta (Egbaland), Nigeria", "nationality": "Nigerian", "physical_appearance": "Short, strong presence; often wore traditional Yoruba attire.", "status": "Deceased (April 13, 1978, Lagos)"}, "education": [{"institution": "Abeokuta Grammar School", "degree": "First female student at secondary school", "year": "1914\\u20131917"}, {"institution": "Wincham Hall School, England", "degree": "Finishing school & exposure to socialism/anti\\u2011colonialism", "year": "1919\\u20131923"}], "career_highlights": ["Began as an educator in Abeokuta, organizing pre\\u2011school and adult literacy programmes", "Founded Abeokuta Ladies\\u2019 Club (1932), leading to Abeokuta Women\\u2019s Union (1944)", "Led mass protests of up to 10,000 women that forced Alake of Egba to abdicate in 1949", "Turned AWU into national Nigerian Women\\u2019s Union (1949) and later Federation of Nigerian Women\\u2019s Societies (1953)", "Served on Abeokuta local council (1949\\u20131960), first female in Western House of Chiefs", "Founded Commoners\\u2019 People\\u2019s Party; active in independence-era national politics"], "author_and_advocate": ["Spoke internationally in London in 1947 as only Nigerian woman at constitutional conference", "Wrote under her own name in Daily Worker criticizing colonial marginalization of women"], "honors": ["Lenin Peace Prize (1970)", "Chieftaincy title: Oloye of the Yoruba people; first woman in the Western House of Chiefs", "Posthumous national hero titles; commemorated on Nigerian currency"], "personal_life": ["Married Reverend Israel Oludotun Ransome\\u2011Kuti in 1925", "Mother of four children including Fela Anikulapo\\u2011Kuti, Dr. Olikoye, and Dr. Beko", "Endured political repression; thrown from a second\\u2011floor window during 1977 military raid, died from injuries"], "impact_and_influence": ["Known as 'Lioness of Lisabi' for leading women\\u2019s revolt and feminist nationalism", "Established one of Africa\\u2019s most powerful women\\u2019s movements bridging elite and market women", "Advocated women\\u2019s suffrage, education, healthcare, and dismantling colonial oppression"], "full_summary": "Funmilayo Ransome\\u2011Kuti was a pioneering Nigerian feminist, educator, and nationalist whose grassroots organizing united elite and market women in the fight for civil and economic rights. She led mass protests that reshaped colonial policy, pioneered national women\\u2019s organizations, and served in local governance. Her courage, activism, and advocacy earned her international recognition and enduring legacy in Nigeria\\u2019s history."}	funmilayo-ransome-kuti
10	Miriam Makeba	makeba.jpeg	South African singer, civil rights activist and global musical icon known as ‘Mama Africa.’	south-africa	flags/south-africa.png	Artist	{"basic_info": {"full_name": "Zenzile Miriam Makeba", "birth": "March\\u202f4,\\u202f1932 in Prospect Township, Johannesburg, South Africa", "nationality": "South African", "physical_appearance": "Graceful performer; expressive features; often in traditional African attire.", "status": "Deceased (November\\u202f9,\\u202f2008 in Italy)"}, "education": [{"institution": "Kimerton Training Institute, Pretoria", "degree": "Vocational training", "year": "1940s"}, {"institution": "Church choir and performing groups", "degree": "Early musical training", "year": "1950s"}], "career_highlights": ["Joined the Manhattan Brothers and later formed the Skylarks in South Africa (1950s)", "Featured in 1959 film *Come Back, Africa*, leading to exile for anti\\u2011apartheid stance", "First African woman to win a Grammy (with Harry Belafonte, 1966)", "Starred in Paul Simon\\u2019s *Graceland* tour (1987) and movie *Sarafina!* (1992)", "Recorded iconic songs like \\u2018Pata Pata\\u2019 and \\u2018Soweto Blues\\u2019 condemning apartheid"], "author_and_advocate": ["Testified at the United Nations in 1963 against apartheid", "Appointed FAO Goodwill Ambassador (1999) and spoke for civil rights globally"], "honors": ["Grammy Award for Best Folk Recording (1966)", "Dag Hammarskj\\u00f6ld Peace Prize (1986)", "Honorary citizenship in multiple countries"], "personal_life": ["Mother of one daughter, Bongi Makeba", "Married briefly at age 17; later married Stokely Carmichael (1968\\u20131978)", "Lived in exile across the U.S. and Guinea before returning post\\u2011apartheid"], "impact_and_influence": ["Brought African music to global audiences and used art to galvanize anti\\u2011apartheid sentiment", "Became a symbol of resistance and reconciliation in Africa and the diaspora"], "full_summary": "Miriam Makeba\\u2014\\u2018Mama Africa\\u2019\\u2014was an extraordinary singer and activist who used her voice to fight apartheid and uplift African identity worldwide. From her breakout in South Africa to her exile and global fame, she became the first African woman Grammy winner and continued to perform and advocate for justice until her passing in 2008. Her legacy lives on in music, civil rights and cultural pride."}	miriam-makeba
12	Ala Salah	ala-salah.avif	Egypt‑born anesthesiologist and sustainability leader.	egypt	flags/egypt.png	Physician	{"basic_info": {"full_name": "Dr. Alaa Salama", "birth": "Date unknown, born in Egypt", "nationality": "Egyptian", "physical_appearance": "Professional medical attire; calm demeanor.", "status": "Alive"}, "education": [{"institution": "Ain Shams University (Egypt)", "degree": "MBBCh", "year": "\\u2014"}, {"institution": "Catholic University of Louvain (Belgium)", "degree": "MSc in Environmental Management", "year": "\\u2014"}], "career_highlights": ["Staff physician in Anesthesiology at Cleveland Clinic Abu Dhabi", "Former consultant at University Hospital Basel, Switzerland", "Google Data Centres Sustainability Program Manager overseeing global operations"], "author_and_advocate": ["Advocates integration of healthcare practice and environmental sustainability"], "honors": ["Recognized in medical leadership roles and sustainability sectors"], "personal_life": ["Details not publicly disclosed"], "impact_and_influence": ["Fusing medical expertise with corporate sustainability leadership in global institutions"], "full_summary": "Dr. Alaa Salama is an Egyptian\\u2011trained anesthesiologist and environmental management specialist. With leadership roles spanning major healthcare institutions and Google\\u2019s sustainability programmes, he represents a unique blend of clinical practice and sustainable operations in a global context."}	ala-salah
3	Gaositwe Chiepe	chiepe.jpeg	Trailblazing diplomat and Botswana’s first female cabinet minister.	botswana	flags/botswana.png	Diplomat, Educator	{"basic_info": {"full_name": "Dr. Gaositwe Keagakwa Tibe Chiepe", "birth": "20 October 1922, Kanye, Botswana", "nationality": "Motswana", "physical_appearance": "Elderly stateswoman with traditional dress and stately demeanor.", "status": "Deceased (Died 2023 at age 100)"}, "education": [{"institution": "Tiger Kloof Educational Institute (South Africa)", "degree": "Teaching Certificate", "year": "\\u2014"}, {"institution": "Fort Hare University", "degree": "BA", "year": "\\u2014"}, {"institution": "University of Bristol (UK)", "degree": "MA in Education", "year": "1958"}], "career_highlights": ["First female education officer in Botswana", "Permanent Representative of Botswana to the United Nations and High Commissioner to the UK", "Served as Botswana\\u2019s Minister of Foreign Affairs, Minister of Education, and Minister of Trade & Industry", "One of the longest-serving cabinet ministers in Botswana\\u2019s post-independence history", "Played key roles in shaping Botswana\\u2019s education system and foreign policy"], "author_and_advocate": ["Promoted women's participation in politics and diplomacy", "Advocate for accessible education across Botswana and Southern Africa"], "honors": ["Awarded Botswana\\u2019s Presidential Order of Honour", "Received honorary doctorates including from the University of Botswana", "Honored with state recognition on her 100th birthday"], "personal_life": ["Never married; dedicated her life to national service and education"], "impact_and_influence": ["Paved the way for women in African diplomacy and politics", "Instrumental in laying the foundation of Botswana\\u2019s postcolonial education policies", "Respected globally for her integrity, intellect, and service"], "full_summary": "Dr. Gaositwe Chiepe was a pioneering educator, diplomat, and cabinet minister in Botswana. As one of the first Botswana women to attain higher education and enter government service, she served as ambassador, foreign minister, and education minister. She helped shape Botswana\\u2019s foreign relations and school systems post-independence. Her decades of leadership, both at home and abroad, broke barriers for women in diplomacy and government. Dr. Chiepe passed away in 2023 at the age of 100, leaving behind a legacy of excellence, resilience, and national pride."}	gaositwe-chiepe
4	Zaha Hadid	zaha_hadid.webp	Trailblazing Iraqi-British architect, first woman to receive the Pritzker Architecture Prize, known for futuristic and curvilinear designs.	iraq	flags/iraq.png	Architect	{"basic_info": {"full_name": "Zaha Mohammad Hadid", "birth": "October 31, 1950 in Baghdad, Iraq", "nationality": "Iraqi-British", "physical_appearance": "Elegant and expressive, often in bold fashion reflecting her artistic vision.", "status": "Deceased (March 31, 2016, Miami, USA)"}, "education": [{"institution": "American University of Beirut", "degree": "Mathematics", "year": "1968\\u20131971"}, {"institution": "Architectural Association School of Architecture, London", "degree": "Diploma in Architecture", "year": "1977"}], "career_highlights": ["Joined the Office for Metropolitan Architecture (OMA) and worked with Rem Koolhaas before founding Zaha Hadid Architects in 1980", "Gained recognition for bold, unconventional designs that challenged architectural norms", "Major works include the Vitra Fire Station (Germany), MAXXI Museum (Rome), Guangzhou Opera House (China), and London Aquatics Centre (2012 Olympics)"], "author_and_advocate": ["Published \\u2018Zaha Hadid: Complete Works\\u2019 showcasing her visionary projects", "Advocated for more inclusion of women in architecture and design fields"], "honors": ["Pritzker Architecture Prize (2004) \\u2013 first woman recipient", "RIBA Gold Medal (2016) \\u2013 first woman to receive it individually", "Dame Commander of the Order of the British Empire (2002)", "Listed among TIME magazine\\u2019s 100 most influential people (2010)"], "personal_life": ["Never married, no children; dedicated her life to architecture", "Known for her strong personality, uncompromising vision, and passion for futuristic design"], "impact_and_influence": ["Redefined 21st-century architecture with fluid, dynamic, and experimental forms", "Broke barriers for women in architecture, inspiring new generations worldwide", "Her firm, Zaha Hadid Architects, continues her legacy globally"], "full_summary": "Zaha Hadid was a visionary architect whose radical approach reshaped contemporary architecture. Born in Baghdad and educated in London, she challenged structural conventions with designs that fused mathematics, art, and engineering. Her groundbreaking career included being the first woman to win the Pritzker Architecture Prize and receiving global honors for her innovation. Though she passed away in 2016, her firm continues to influence urban landscapes across the world, ensuring her legacy as one of the most important architects of modern times."}	zaha-hadid
5	Unity Dow	unity-dow.jpg	Botswana’s first female High Court judge and acclaimed human rights advocate.	botswana	flags/botswana.png	Jurist & Author	{"basic_info": {"full_name": "Unity Dow", "birth": "23 April 1959, Mochudi, Botswana", "nationality": "Motswana", "physical_appearance": "Short natural hair, dignified presence, often in traditional or formal attire.", "status": "Alive"}, "education": [{"institution": "University of Botswana and Swaziland", "degree": "LLB (Law)", "year": "1983"}, {"institution": "University of Edinburgh", "degree": "Postgraduate Legal Studies", "year": "\\u2014"}], "career_highlights": ["Co-founder of Botswana\\u2019s first all-woman law firm", "Won the landmark 1992 citizenship case against gender-based nationality laws", "Appointed as Botswana\\u2019s first female High Court judge (1997\\u20132009)", "Delivered key ruling in 2006 supporting Basarwa (San) indigenous rights", "Former Minister of Education and Minister of Foreign Affairs", "Member of Parliament for Kgatleng West (2024\\u2013 )"], "author_and_advocate": ["Author of fiction and non-fiction works addressing justice, gender, and African identity", "Co-founder of Women and Law in Southern Africa (WLSA)", "Co-author of *Saturday Is for Funerals* exploring the HIV/AIDS crisis"], "honors": ["Recipient of France\\u2019s L\\u00e9gion d\\u2019honneur", "Honorary doctorates from institutions including University of Edinburgh and St. Michael\\u2019s College", "Named among Africa\\u2019s most influential women"], "personal_life": ["Married with children; values education and civic service"], "impact_and_influence": ["Changed Botswana\\u2019s laws to recognize gender equality in citizenship rights", "Promoted indigenous rights and inclusive legal reform across Africa", "Blended literature and law to advocate for social transformation"], "full_summary": "Unity Dow is a pioneering Motswana jurist, author, and human rights activist. As Botswana\\u2019s first female High Court judge, she broke legal and gender barriers, most notably through her 1992 victory that overturned gender-discriminatory citizenship laws. Her landmark judgments and ministerial roles have advanced indigenous rights, education, and social justice. Dow is also a prolific writer whose works explore justice, gender, and African identity, cementing her legacy as a transformative figure in law, politics, and literature."}	unity-dow
6	Wangari Maathai	wangari.jpeg	Kenyan environmentalist, political activist, and Nobel Peace laureate.	kenya	flags/kenya.png	Activist	{"basic_info": {"full_name": "Wangar\\u0129 Muta Maathai", "birth": "April 1, 1940 in Tetu, Kenya", "nationality": "Kenyan", "physical_appearance": "Medium height, often seen in colorful African dress; authoritative presence.", "status": "Deceased (September 25, 2011, Nairobi)"}, "education": [{"institution": "Mount St. Scholastica College, USA", "degree": "BSc in Biology", "year": "1964"}, {"institution": "University of Pittsburgh", "degree": "MSc in Biological Sciences", "year": "1966"}, {"institution": "University of Nairobi", "degree": "PhD in Veterinary Anatomy", "year": "1971"}], "career_highlights": ["Founded Green Belt Movement (1977) to promote tree\\u2011planting, environmental conservation and women\\u2019s empowerment", "First African woman to win Nobel Peace Prize (2004)", "Elected to Kenyan Parliament and served as Assistant Minister for Environment (2003\\u20132005)", "Authored several books on ecology, development and African culture"], "author_and_advocate": ["Wrote and lectured internationally on environmental justice, sustainable development and human rights"], "honors": ["Nobel Peace Prize (2004)", "Right Livelihood Award (1984)", "Indira Gandhi Peace Prize (2006)", "UNEP Champion of the Earth, France\\u2019s Legion of Honour, L\\u00e9gion d'honneur (France)"], "personal_life": ["Mother of one daughter, Wanjira Maathai", "Endured government arrests and trials for environmental activism", "Advocated democracy and anti\\u2011corruption until her death"], "impact_and_influence": ["Transformed environmental conservation into grassroots mass action through tree planting", "Inspired global environmental movements linking ecology and gender rights", "Played major role in Kenyan party politics and democratic reform"], "full_summary": "Wangar\\u0129 Maathai was an inspiring Kenyan environmental and political activist whose founding of the Green Belt Movement brought together ecological restoration and women's empowerment. As the first African woman Nobel Peace Prize laureate, she forged a global legacy in sustainable development, democracy, and social justice."}	wangari-maathai
7	Fumilayo Adadevoh	adadevoh.jpeg	Nigerian doctor who halted the spread of Ebola in Lagos.	nigeria	flags/nigeria.png	Activist	{"basic_info": {"full_name": "Ameyo Stella Adadevoh", "birth": "October 27, 1956 in Lagos, Nigeria", "nationality": "Nigerian", "physical_appearance": "Medium height; medical professional attire; calm and determined demeanor.", "status": "Deceased (August 19, 2014, Lagos)"}, "education": [{"institution": "University of Lagos", "degree": "MBBS", "year": "1980"}, {"institution": "London School of Hygiene & Tropical Medicine", "degree": "Postgraduate in Endocrinology", "year": "1985"}], "career_highlights": ["Chief Consultant Physician at First Consultants Medical Centre, Lagos", "Diagnosed and quarantined Nigeria\\u2019s index Ebola patient in 2014, breaking transmission chain"], "author_and_advocate": ["Advocated for improved public health protocols and emergency response infrastructure"], "honors": ["Posthumous national honour by Nigerian government", "Recognized by UN Foundation in 2015", "Memorials established in her name"], "personal_life": ["Married with one son", "Known for strong Christian faith, professionalism, and ethical leadership"], "impact_and_influence": ["Credited with preventing a major Ebola outbreak in Nigeria through decisive action", "Recognized worldwide for her courage and public health legacy"], "full_summary": "Dr. Ameyo Stella Adadevoh was a dedicated Nigerian physician whose quick-thinking and moral courage prevented a widespread Ebola outbreak in Lagos. By isolating the index case despite pressure, she saved countless lives and became a national heroine with international recognition."}	fumilayo-adadevoh
9	Ellen Johnson Sirleaf	ellen.jpg	Liberian economist and Africa’s first elected female head of state, Nobel Peace Prize laureate.	liberia	flags/liberia.png	Stateswoman	{"basic_info": {"full_name": "Ellen Eugenia Johnson Sirleaf", "birth": "October\\u202f29,\\u202f1938 in Monrovia, Liberia", "nationality": "Liberian", "physical_appearance": "Poised and dignified; often wears tailored suits.", "status": "Alive"}, "education": [{"institution": "College of West Africa, Monrovia", "degree": "Secondary schooling", "year": "1950s"}, {"institution": "Madison Business College, Wisconsin", "degree": "Accounting diploma", "year": "1961?"}, {"institution": "Harvard University (Kennedy School)", "degree": "MPA in Public Administration", "year": "1971"}], "career_highlights": ["Served as Assistant Minister of Finance (1972\\u201373) and Finance Minister under Doe\\u2019s regime (1980\\u201385)", "Spent years in exile working for UNDP and women\\u2019s development before returning to run for presidency", "Elected President of Liberia in 2005 and re\\u2011elected in 2011; first female head of state in Africa"], "author_and_advocate": ["Advocated women\\u2019s inclusion in peace processes and launched the Sirleaf Market Women\\u2019s Fund", "Founded the Ellen Johnson Sirleaf Presidential Center for Women and Development (2018)"], "honors": ["Nobel Peace Prize (2011) shared with Leymah Gbowee and Tawakkul Karman", "Ibrahim Prize for Achievement in African Leadership (2017)", "Numerous honorary degrees and leadership awards"], "personal_life": ["Married and later divorced; mother of four sons", "Survived imprisonment under Doe\\u2019s regime; remained committed to reconciliation and governance"], "impact_and_influence": ["Stabilized post-war Liberia, negotiated $4.6\\u202fbillion debt forgiveness, promoted female empowerment and governance", "As Chair of ECOWAS in 2016, extended her diplomatic influence regionally"], "full_summary": "Ellen Johnson Sirleaf is a transformative stateswoman who led Liberia from war\\u2011torn crisis to democratic recovery. With a background in economics and development, she prioritized debt relief, women\\u2019s empowerment, and rebuilding state institutions. In 2011 she received the Nobel Peace Prize for her contributions to peace and women's rights. Her leadership legacy continues through her mentorship initiatives across Africa."}	ellen-johnson-sirleaf
11	Gambo Sawaba	sawaba.jpeg	Homie Hajiya Gambo Sawaba, pioneering northern Nigerian women’s rights activist and politician.	nigeria	flags/nigeria.png	Activist	{"basic_info": {"full_name": "Hajaratu Gambo Amarteifio Sawaba", "birth": "February\\u202f15,\\u202f1933 in Zaria, Nigeria", "nationality": "Nigerian", "physical_appearance": "Petite frame with fierce presence; often dressed modestly.", "status": "Deceased (October\\u202f2001 in Zaria)"}, "education": [{"institution": "Native Authority Primary School, Tudun Wada, Zaria", "degree": "Primary education", "year": "1930s"}, {"institution": "Self\\u2011educated political activism", "degree": "N/A", "year": "N/A"}], "career_highlights": ["Joined NEPU at age 17 and became leader of its National Women\\u2019s Wing", "Served as Deputy Chairman of Great Nigeria People\\u2019s Party (GNPP)", "Arrested and jailed at least 16 times for activism; campaigned against under\\u2011aged marriage and forced labour"], "author_and_advocate": ["Mentored by Funmilayo Ransome\\u2011Kuti; traveled to Abeokuta to meet her", "Spoke publicly against child marriage and advocated Western education for northern women"], "honors": ["Widely regarded as pioneer of northern Nigerian women\\u2019s liberation", "Recognized posthumously by women\\u2019s groups and historians"], "personal_life": ["Married off at age 13; mother to one daughter", "Endured personal loss early and used personal hardship to fuel activism"], "impact_and_influence": ["Symbol of resistance in northern Nigeria; inspired generations of Muslim and Hausa\\u2011Fulani women", "Bridged regional politics with gender rights in colonial and post\\u2011colonial Nigeria"], "full_summary": "Hajiya Gambo Sawaba was a bold political activist and women\\u2019s rights advocate from northern Nigeria. Despite early marriage and limited formal education, she led mass mobilization through NEPU and GNPP, challenging entrenched gender norms and colonial structures. Jailed numerous times, she remains a legendary figure in Nigeria\\u2019s feminist and political history."}	gambo-sawaba
13	Amel Karboul	amel-karboul.jpg	Tunisian author, speaker, former tourism minister and education innovator.	tunisia	flags/tunisia.png	Leader	{"basic_info": {"full_name": "Amel Karboul", "birth": "April 25, 1973 in Tunis, Tunisia", "nationality": "Tunisian", "physical_appearance": "Dynamic and polished; speaks multiple languages.", "status": "Alive"}, "education": [{"institution": "University of Karlsruhe (Germany)", "degree": "Engineering degree", "year": "\\u2014"}, {"institution": "UK doctorate", "degree": "PhD (unspecified)", "year": "\\u2014"}], "career_highlights": ["First female Minister of Tourism for Tunisia (2014\\u20132015)", "CEO and founder of Change, Leadership & Partners", "Project leader at Mercedes\\u2011Benz, consultant at DaimlerChrysler Corporate University, BCG"], "author_and_advocate": ["Author of *Coffin Corner* (2015) on leadership culture", "Visionary speaker on education reform, leadership and social innovation"], "honors": ["Named among top ten most influential women in Africa (2014\\u201315)"], "personal_life": ["Married to German engineer Marcus Gottschalk (2002\\u20132016)", "Mother of two daughters"], "impact_and_influence": ["Shaped Tunisia\\u2019s post\\u2011Arab Spring governance and global leadership discourse", "Promoted results\\u2011based education investments through Education Outcomes Fund"], "full_summary": "Dr. Amel Karboul is a Tunisian change\\u2011maker whose cross\\u2011sector leadership spans government, business, and education. As Tunisia\\u2019s first female tourism minister and founder of a global leadership firm, she blends innovation, management consulting, and advocacy, influencing leadership, education outcomes and regional governance."}	amel-karboul
14	Aoua Keita	aoua-keita.jpeg	Malian midwife, writer, politician and independence pioneer.	mali	flags/mali.png	Activist	{"basic_info": {"full_name": "Aoua K\\u00e9ita", "birth": "July 12, 1912 in Bamako, French Sudan (now Mali)", "nationality": "Malian", "physical_appearance": "N/A", "status": "Deceased (May 7, 1980)"}, "education": [{"institution": "\\u00c9cole des Filles, Bamako", "degree": "Primary & secondary", "year": "graduated ~1928"}, {"institution": "\\u00c9cole de M\\u00e9decine de Dakar", "degree": "Diploma in Midwifery", "year": "1931"}], "career_highlights": ["First woman elected to French Sudan\\u2019s Legislative Assembly (1959)", "Served in Mali\\u2019s National Assembly after independence (1960s)", "Authored autobiography *Femme d\\u2019Afrique* (1975)"], "author_and_advocate": ["Wrote and campaigned for women\\u2019s civic rights, education, and legal equality", "Instrumental in drafting Mali\\u2019s Marriage and Guardianship Code"], "honors": ["Celebrated post\\u2011independence for women\\u2019s political representation"], "personal_life": ["Married a Dr. Diawara (later separated)", "Later lived in exile during political upheaval before returning to Bamako"], "impact_and_influence": ["Pioneered women\\u2019s parliamentary leadership in Francophone West Africa", "Blended feminist, nationalist, and Pan\\u2011African politics in early post\\u2011colonial Mali"], "full_summary": "Aoua K\\u00e9ita was a trailblazing Malian midwife, writer and politician. As the first woman elected to her country's legislature pre\\u2011independence and an advocate of legal reform, she authored *Femme d\\u2019Afrique* and contributed to Mali\\u2019s first women's legislation. Her activism advanced women's rights in early post\\u2011colonial West Africa."}	aoua-keita
15	Ilwad Elman	ilwad-elman.jpg	Somali‑Canadian peacebuilder and humanitarian activist.	somalia	flags/somalia.png	Human Rights Activist	{"basic_info": {"full_name": "Ilwad Elman", "birth": "1989\\u20131990 in Mogadishu, Somalia", "nationality": "Somali\\u2011Canadian", "physical_appearance": "N/A", "status": "Alive"}, "education": [], "career_highlights": ["COO of Elman Peace & Human Rights Center, Mogadishu", "Founded Somalia\\u2019s first rape crisis centre (2010)", "Short\\u2011listed for 2019 Nobel Peace Prize"], "author_and_advocate": ["Advocates disarmament of child soldiers and gender justice", "Worked on #MeToo\\u2011in\\u2011Somalia movement and Sexual Offenses Bill"], "honors": ["African Young Personality (Female) of the Year, Africa Youth Awards 2016", "Recognized by Right Livelihood Award"], "personal_life": ["Daughter of peace activists Elman Ali Ahmed (assassinated) and Fartuun Adan"], "impact_and_influence": ["Pioneered trauma\\u2011informed peacebuilding and gender\\u2011based violence programming in Somalia", "Scaled community\\u2011based rehabilitation across East Africa"], "full_summary": "Ilwad Elman is a Somali\\u2011Canadian activist whose leadership in peacebuilding and women\\u2019s protection transformed post\\u2011conflict Somalia. Through Elman Peace Centre, she launched innovative programmes to reintegrate former child soldiers and support survivors of sexual violence. Her mother\\u2019s legacy and her own endurance have made her a global voice for justice and healing."}	ilwad-elman
16	Joyce Banda	joyce-banda.jpg	Malawian politician, philanthropist and Malawi’s first female President.	malawi	flags/malawi.png	Stateswoman	{"basic_info": {"full_name": "Joyce Hilda Banda (n\\u00e9e Ntila)", "birth": "April 12, 1950 in Malemia, Nyasaland (now Malawi)", "nationality": "Malawian", "physical_appearance": "Poised and robust leadership presence.", "status": "Alive"}, "education": [{"institution": "Atlantic International University (online)", "degree": "Bachelor\\u2019s degree", "year": "\\u2014"}], "career_highlights": ["Minister of Gender, Child Welfare and Community Services (2004\\u20132006)", "Foreign Minister (2006\\u20132009)", "Vice President (2009\\u20132012) and President of Malawi (2012\\u20132014)"], "author_and_advocate": ["Advocated for women\\u2019s and disability rights and legislative reforms (e.g. Domestic Violence Bill)"], "honors": ["Africa Prize for Leadership for the Sustainable End of Hunger (1997)", "Named among Africa\\u2019s most powerful women by Forbes"], "personal_life": ["Married twice; mother of five", "Educator and grassroots women's rights activist before entering politics"], "impact_and_influence": ["Stabilized Malawi during a leadership crisis, pursued debt relief, and expanded women's participation in governance", "Founded People's Party and continued public advocacy after presidency"], "full_summary": "Joyce Banda served as Malawi\\u2019s Vice President and became her country\\u2019s first female President. Her administration emphasized women's empowerment, debt relief and democratic governance. A veteran activist and legislator, she remains a respected voice for social justice in Africa."}	joyce-banda
18	Tsitsi Dangarembga	tsitsi-dangaremba.jpg	Zimbabwean novelist, filmmaker and cultural activist.	zimbabwe	flags/zimbabwe.png	Author	{"basic_info": {"full_name": "Tsitsi Dangarembga", "birth": "February 4, 1959 in Mutoko, Southern Rhodesia (now Zimbabwe)", "nationality": "Zimbabwean", "physical_appearance": "N/A", "status": "Alive"}, "education": [{"institution": "Mission school in Mutare", "degree": "Primary & secondary education", "year": "1965\\u2013mid\\u20111970s"}, {"institution": "University of Cambridge", "degree": "Studied medicine (did not complete)", "year": "late 1970s"}], "career_highlights": ["Published debut novel *Nervous Conditions* (1988), first English novel by a Black Zimbabwean woman", "Commonwealth Writers\\u2019 Prize for *Nervous Conditions*", "Booker Prize shortlisted for *This Mournable Body* (2020)"], "author_and_advocate": ["Filmmaker and playwright addressing gender, race, post\\u2011colonial identity", "Public speaker on cultural justice and Zimbabwe\\u2019s political futures"], "honors": ["PEN Pinter Prize", "Numerous literary fellowships and residencies (e.g. Bellagio Center)"], "personal_life": ["Childhood split between England and Zimbabwe", "Mother from first Rhodesian Black woman graduate; father a school headmaster"], "impact_and_influence": ["Shaped African feminism and literature through iconic narratives", "Active in anti\\u2011corruption protests; recently arrested for protest participation"], "full_summary": "Tsitsi Dangarembga is a globally influential Zimbabwean novelist, filmmaker and cultural activist. Her landmark debut *Nervous Conditions* redefined African literary voices. With her recent *This Mournable Body*, she continues to challenge political oppression and gender norms. Her activism and art intersect to fight for justice and cultural self\\u2011determination."}	tsitsi-dangarembga
19	Charlotte Maxeke	charlotte-maxeke.jpeg	South African pioneer: first Black woman university graduate, activist, educator, and founding feminist leader.	south-africa	flags/south-africa.png	Activist, Educator, Feminist	{"basic_info": {"full_name": "Charlotte Makgomo Mannya Maxeke", "birth": "April\\u202f7,\\u202f1871 in Ga\\u2011Ramokgopa (Polokwane), South Africa", "nationality": "South African", "physical_appearance": "Talented vocalist; dignified presence as a religious and community leader.", "status": "Deceased (October\\u202f16,\\u202f1939 in Johannesburg)"}, "education": [{"institution": "Wilberforce University, Ohio", "degree": "BSc in Science (1903)", "year": "1903"}], "career_highlights": ["First Black South African woman to earn a university degree", "Founding president of the Bantu Women\\u2019s League (1918), precursor to ANC Women\\u2019s League", "Organized anti\\u2011pass protests and led delegations to government", "Appointed the first African probation officer in Johannesburg"], "author_and_advocate": ["Wrote newspaper pieces advocating women\\u2019s rights and African liberation", "Delivered electrifying speeches within AME Church and ANC events"], "honors": ["Known as 'Mother of Black Freedom in South Africa'", "Charlotte Maxeke Johannesburg Academic Hospital named in her honour", "Annual memorial lectures and schools named after her"], "personal_life": ["Married fellow Wilberforce graduate Marshall Maxeke in 1903", "Worked closely in missionary, educational and political initiatives throughout her life"], "impact_and_influence": ["Trailblazer for African women\\u2019s education and political participation", "Inspired formation of women\\u2019s rights movements and ANC Women\\u2019s League"], "full_summary": "Charlotte Maxeke was a visionary South African educator, feminist and political activist. As the first Black South African woman to earn a university degree, she pioneered women\\u2019s leadership and organized mass campaigns against colonial and racial oppression. Her legacy endures in numerous institutions and the continuing struggle for African women\\u2019s liberation."}	charlotte-maxeke
20	Ama Ata Aidoo	ama-ataido.jpeg	Ghanaian author, playwright, feminist thinker and former education minister.	ghana	flags/ghana.png	Author, Feminist, Educator, Politician	{"basic_info": {"full_name": "Christina Ama Ata Aidoo", "birth": "March\\u202f23,\\u202f1942 in Abeadzi\\u202fKyiakor, Gold Coast (now Ghana)", "nationality": "Ghanaian", "physical_appearance": "Expressive and articulate in traditional Ghanaian dress or academic attire.", "status": "Deceased (May\\u202f31,\\u202f2023 in Accra)"}, "education": [{"institution": "University of Ghana, Legon", "degree": "BA in English", "year": "1964"}], "career_highlights": ["Published first play *The Dilemma of a Ghost* (1965), first Ghanaian female dramatist", "Authored novels and poems including *Our Sister Killjoy*, *Changes: A Love Story*", "Served as Ghana\\u2019s Minister of Education (1982\\u201183)"], "author_and_advocate": ["Advocated consistently for women\\u2019s rights, African identity, and educational reform", "Founded the Mbaasem Foundation (2000) to support African women writers"], "honors": ["Commonwealth Writers\\u2019 Prize winner (1992)", "Multiple literary awards and honorary degrees"], "personal_life": ["Academic posts in Ghana and abroad", "Mentored generations of African female writers"], "impact_and_influence": ["Shaped African feminist literature and discourse", "Preserved African storytelling traditions and encouraged literary expression"], "full_summary": "Ama Ata Aidoo was a powerful Ghanaian literary voice and feminist thinker whose plays, novels and public service shaped post\\u2011colonial African identity. Her leadership in education and advocacy for women elevated the role of African female writers and thinkers across the continent."}	ama-ata-aidoo
23	Julienne Lusenge	julienne-lusenge.webp	DRC human rights defender who founded SOFEPADI and advocates survivors of wartime sexual violence.	drc	flags/drc.png	Activist,Humanitarian,Feminist	{"basic_info": {"full_name": "Julienne Lusenge", "birth": "Date unspecified, born in Democratic Republic of the Congo", "nationality": "Congolese", "physical_appearance": "N/A", "status": "Alive"}, "education": [], "career_highlights": ["Co\\u2011founded SOFEPADI (2000), supporting survivors of sexual violence during conflict", "Founded Congolese Women\\u2019s Fund to finance local women\\u2019s initiatives", "Advises International Campaign to Stop Rape in Conflict"], "author_and_advocate": ["Journalist-turned-activist documenting wartime abuses and advocating survivors\\u2019 reintegration"], "honors": ["Knight of the Legion of Honour (France, 2013)", "Human Rights Award (Embassy of France, 2012)", "International Women of Courage Award (US, 2021)", "Women\\u2019s International Rights Award (Geneva Summit, 2018)"], "personal_life": ["Driven by personal exposure to conflict in Eastern DRC"], "impact_and_influence": ["Rehabilitated thousands of survivors through community support systems", "Raised global awareness on gender-based violence in conflict zones"], "full_summary": "Julienne Lusenge is a Congolese feminist and human rights activist who created pioneering support systems for survivors of wartime sexual violence. Through SOFEPADI and the Congolese Women\\u2019s Fund, she mobilized community reintegration and secured local funding\\u2014transforming post\\u2011conflict justice in DRC."}	julienne-lusenge
22	Adame Ba Konaré	adame-konare.jpg	Malian historian, first lady, feminist author and founder of a women’s museum.	mali	flags/mali.png	Historian, Feminist, First Lady, Educator	{"basic_info": {"full_name": "Adame Ba Konar\\u00e9", "birth": "May\\u202f1,\\u202f1947 in S\\u00e9gou, Mali", "nationality": "Malian", "physical_appearance": "Academic and dignified presence as historian and public figure.", "status": "Alive"}, "education": [{"institution": "\\u00c9cole Normale Sup\\u00e9rieure, Bamako", "degree": "History training", "year": "1970s"}, {"institution": "University of Warsaw", "degree": "PhD in History", "year": "1976"}], "career_highlights": ["Professor of History in Bamako", "First Lady of Mali (1999\\u20132002) during husband President Alpha Oumar Konar\\u00e9\\u2019s tenure", "Founded Muso Kunda (women\\u2019s museum) in 1987"], "author_and_advocate": ["Authored biographies and philosophical works on women\\u2019s history", "Advocated historic preservation and expansion of African women\\u2019s narratives"], "honors": ["Respected figure in Mali\\u2019s intellectual and feminist circles", "Recognized for preserving cultural memory via Muso Kunda"], "personal_life": ["Married to ex-President Alpha Oumar Konar\\u00e9", "Mother of Kadiatou Konar\\u00e9, Minister of Culture"], "impact_and_influence": ["Advanced understanding of women\\u2019s roles in Mali\\u2019s history", "Created one of few pan\\u2011African women\\u2019s museums, cementing female agency in heritage"], "full_summary": "Adame Ba Konar\\u00e9 is a Malian historian, feminist author, and cultural preservationist who shaped national memory through scholarship and activism. As First Lady, she used her platform to create Muso Kunda\\u2014the first women\\u2019s museum in Africa\\u2014and authored works that foregrounded Malian women in history."}	adame-ba-konare
24	Fatou Bensouda	fatou-bensouda.jpg	Gambian prosecutor and former Chief Prosecutor of the International Criminal Court.	gambia	flags/gambia.png	Lawyer,Jurist,Political	{"basic_info": {"full_name": "Fatou Bom Bensouda", "birth": "January 31, 1961 in Banjul, The Gambia", "nationality": "Gambian", "physical_appearance": "N/A", "status": "Alive"}, "education": [{"institution": "University of Ife (Nigeria)", "degree": "LL.B (Honors)", "year": "1986"}, {"institution": "Nigeria Law School", "degree": "Barrister-at-Law", "year": "1987"}, {"institution": "International Maritime Law Institute, Malta", "degree": "LL.M in Maritime Law", "year": "1990s"}], "career_highlights": ["Served as Gambia\\u2019s Solicitor General and Minister of Justice", "Elected Chief Prosecutor of the International Criminal Court (2012\\u20132021)"], "author_and_advocate": ["Advocated for international justice, anti-corruption and accountability"], "honors": ["Recognized internationally for her leadership at ICC"], "personal_life": ["Public service largely over private data"], "impact_and_influence": ["Oversaw high\\u2011profile prosecutions of war criminals and state leaders under ICC jurisdiction", "Raised Gambia\\u2019s profile in international law and transitional justice"], "full_summary": "Fatou Bensouda is a Gambian jurist who led the ICC as its Chief Prosecutor, with sweeping jurisdiction over crimes against humanity. Her tenure brought global attention to international justice and accountability, reinforcing the ICC\\u2019s role in prosecuting state and non\\u2011state actors."}	fatou-bensouda
8	Ngozi Okonjo‑Iweala	iweala.jpeg	Nigerian economist, former Finance Minister and first female Director‑General of the WTO.	nigeria	flags/nigeria.png	Economist	{"basic_info": {"full_name": "Dr. Ngozi Okonjo\\u2011Iweala", "birth": "June\\u202f13,\\u202f1954 in Ogwashi\\u2011Ukwu, Nigeria", "nationality": "Nigerian (also U.S. citizenship since 2019)", "physical_appearance": "Professional demeanor; often seen in elegant business attire.", "status": "Alive"}, "education": [{"institution": "Harvard University", "degree": "AB in Economics (magna cum laude)", "year": "1976"}, {"institution": "MIT", "degree": "Master in City Planning (1978); PhD in Regional Economics and Development", "year": "1981"}], "career_highlights": ["Spent 25\\u202fyears at the World Bank, rising to Managing Director (2007\\u20132011) managing an $81\\u202fbillion portfolio", "Served twice as Nigeria\\u2019s Finance Minister (2003\\u20132006, 2011\\u20132015) and briefly as Foreign Affairs Minister (2006)", "Appointed first woman and first African Director\\u2011General of the World Trade Organization in March 2021"], "author_and_advocate": ["Speaks globally on trade reform, development economics, debt relief, vaccine equity and climate finance", "Served on boards including Gavi, Rockefeller Foundation, Twitter, Standard Chartered and more"], "honors": ["Multiple honorary doctorates from institutions like Trinity College Dublin, Brown University, Amherst", "Time magazine\\u2019s recognition as a global leader reforming trade and development"], "personal_life": ["Married to Ikemba Iweala; mother of four children (including Uzodinma)", "Holds dual citizenship and splits time between Nigeria and the U.S."], "impact_and_influence": ["Negotiated Nigeria\\u2019s $18\\u202fbillion debt relief; championed transparency and anticorruption reforms", "As WTO chief, aims to align trade to tackle COVID\\u201119, climate change, and equitable development"], "full_summary": "Dr. Ngozi Okonjo\\u2011Iweala is a globally respected Nigerian economist and development leader. With decades of service at the World Bank and Nigeria\\u2019s government, she forged a reputation as a debt negotiator and reformer. In 2021 she broke barriers as the first woman and first African to lead the WTO. Her influence spans global finance, trade, public health equity, and climate policy."}	ngozi-okonjo-iweala
17	Nawal el‑Saadawi	nawal-sadawi.avif	Egyptian physician, psychiatrist, author and pioneering feminist advocate.	egypt	flags/egypt.png	Feminist	{"basic_info": {"full_name": "Dr. Nawal El Saadawi", "birth": "October 27, 1931 in Kafr Ta\\u1e25lah, Egypt", "nationality": "Egyptian", "physical_appearance": "N/A", "status": "Deceased (March 21, 2021)"}, "education": [{"institution": "Egyptian medical schools", "degree": "Medical Doctor; specialist", "year": "1950s\\u201360s"}], "career_highlights": ["Authored over 50 books including *Woman at Point Zero* on gender oppression", "One of the first Muslim women physicians in Egypt", "Founded Women\\u2019s Action Committee and spoke internationally"], "author_and_advocate": ["Wrote critically on patriarchy, religion, FGM, sexuality and class", "Her works translated widely across 30+ languages"], "honors": ["Named one of Time\\u2019s 100 Most Influential Women of the Past Century (2020)", "Called \\u2018Simone de Beauvoir of the Arab world\\u2019"], "personal_life": ["Married multiple times; had a daughter and son", "Imprisoned repeatedly for political dissent"], "impact_and_influence": ["Defined modern Arabic feminist discourse and challenged oppressive religious and cultural norms", "Inspired generations of activists in MENA region"], "full_summary": "Dr. Nawal El Saadawi was a fearless Egyptian feminist, physician, and writer whose groundbreaking work exposed the intimate link between patriarchy, religion, and power. Her novels and essays catalyzed feminist movements across the Arab world. An imprisoned dissident, she remained a global icon until her death in 2021."}	nawal-el-saadawi
21	Aïcha Fofana	aicha-fofana.jpeg	First Malian woman to publish a novel and a dedicated advocate for women’s rights.	mali	flags/mali.png	Author, Activist, Feminist	{"basic_info": {"full_name": "A\\u00efcha Aminata La\\u00efla Fofana", "birth": "1957 in Bamako, Mali", "nationality": "Malian", "physical_appearance": "N/A", "status": "Deceased (August\\u202f10,\\u202f2003 in Bamako)"}, "education": [{"institution": "Lyc\\u00e9e Notre\\u2011Dame (Bamako & Bordeaux)", "degree": "Secondary education", "year": "1970s"}, {"institution": "Sorbonne (Paris)", "degree": "Language studies", "year": "1980s"}], "career_highlights": ["Published *Marriage: on copie* (1994), first novel by a Malian woman", "Wrote *La fourmili\\u00e8re* (published posthumously, 2006)", "Founded Promo\\u2011femme TV school for young women photographers in Bamako"], "author_and_advocate": ["Used her novels and plays to critique gender norms and corruption", "Co\\u2011founded Malian Association of Human Rights (1998)"], "honors": ["Celebrated as a literary pioneer among Malian women writers"], "personal_life": ["Daughter of Mali\\u2019s Health Minister B\\u00e9niti\\u00e9ni Fofana", "Active in theatre and literature despite early passing"], "impact_and_influence": ["Opened the door for women\\u2019s literary expression in Mali", "Mentored and inspired a generation of Malian women creatives"], "full_summary": "A\\u00efcha Fofana was a pioneering Malian novelist and activist who broke new ground as the first woman in her country to publish a novel. Through her writing, theatre, and rights\\u2011based activism, she challenged social conventions and expanded women\\u2019s educational and cultural opportunities in Mali."}	aicha-fofana
\.


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: herstories_user
--

COPY public.blog_posts (id, title, slug, excerpt, content, category, cover_image, author, is_published, created_at, updated_at) FROM stdin;
1	Why I Built HerStories	why-i-built-herstories	HerStories was born from a simple frustration — the women who shaped Africa were missing from the narratives I studied. This is why I decided to do something about it.	When I was studying history, I noticed a pattern. The textbooks were full of kings, generals, and statesmen. The women — the activists, the queens, the scientists, the artists — were footnotes at best, absent at worst.\n\nThat frustration stayed with me. And when I started learning software development, I realised I had something most historians don't — the ability to build.\n\nHerStories started as a side project. A way to combine my two worlds. But it quickly became something more. Every biography I researched reminded me of how much has been erased, and how much is still waiting to be found.\n\n## What HerStories is trying to do\n\nThis is not just an archive. It is an argument. An argument that African women's history is rich, complex, and worthy of the same serious documentation that we give to the men in the history books.\n\nEvery woman in this database — from Wangari Maathai to Yaa Asantewaa to Funmilayo Ransome-Kuti — deserves more than a paragraph in someone else's story. They deserve their own.\n\n## What comes next\n\nThe archive is growing. The biographies are expanding. And soon, the community will be able to contribute — submitting stories, documents, and histories that I would never find on my own.\n\nIf you know of a woman who should be in HerStories, submit her story. If you have a document, a photograph, an oral history — share it with us.\n\nThis is not my project. It belongs to every African woman whose story has ever been told, and every one whose story hasn't been told yet.	About	\N	HerStories	t	2026-04-29 22:45:50.702657	2026-04-29 22:45:50.702663
2	The Women Who Inspired This Project	women-who-inspired-this-project	Before HerStories had a name, there were women. Women whose stories I kept returning to, whose courage kept asking to be documented.	Every project has a before. Before the code, before the database, before the design — there are the stories that make you feel like something needs to exist.\n\nThese are some of the women who made me feel that way.\n\n## Funmilayo Ransome-Kuti\n\nI first encountered Funmilayo in a footnote. A footnote. The woman who organised 10,000 women in protest, who forced a king to abdicate, who was thrown from a window by soldiers and died from her injuries — in a footnote.\n\nThat footnote made me angry. It also made me start taking notes.\n\n## Yaa Asantewaa\n\nWhen the male chiefs of Ashanti hesitated, Yaa Asantewaa stood up and said the words that have echoed through history — if you men will not go forward, then we women will. She led the last major war of resistance against British colonial rule in Ghana.\n\nMost people outside Ghana have never heard her name.\n\n## Wangari Maathai\n\nWangari Maathai planted trees. She also planted democracy. Her Green Belt Movement showed that environmental conservation and political resistance are not separate things — they grow from the same roots.\n\nShe was the first African woman to win the Nobel Peace Prize. She deserved it.\n\n## Why these women\n\nI am not a descendant of any of these women. I am not from their countries. But their stories found me anyway — in footnotes, in passing references, in the margins of books about the men they worked alongside.\n\nHerStories exists so that their stories are no longer found in margins.	Research	\N	HerStories	t	2026-04-29 22:45:50.702664	2026-04-29 22:45:50.702664
3	Wangari Maathai and the Politics of Trees	wangari-maathai-politics-of-trees	Planting a tree is a political act. Wangari Maathai understood this before almost anyone else did — and it cost her everything, and gave her everything.	In 1977, Wangari Maathai asked Kenyan women to plant trees.\n\nIt sounds simple. It was not simple.\n\n## What the Green Belt Movement really was\n\nOn the surface, the Green Belt Movement was an environmental programme. Women planted trees to combat deforestation, prevent soil erosion, and provide firewood for their families. By the time Maathai died in 2011, the movement had planted over 51 million trees across Kenya.\n\nBut the trees were never just trees.\n\nWhen Maathai asked women to plant trees, she was also asking them to organise. To meet. To talk. To develop opinions about their land, their government, their rights. The Green Belt Movement became one of the most effective grassroots political organisations in Kenyan history — and it started with seeds.\n\n## What it cost her\n\nThe Kenyan government under Daniel arap Moi understood what the trees meant. Maathai was harassed, arrested, beaten. Her marriage ended — her husband told a court that she was too educated, too strong, too difficult to control. The judge agreed and granted the divorce.\n\nShe responded by saying the judge was incompetent. She was jailed for contempt of court.\n\nShe kept planting trees.\n\n## The Nobel Prize and what came after\n\nIn 2004, Wangari Maathai became the first African woman to win the Nobel Peace Prize. The committee cited her contribution to sustainable development, democracy, and peace.\n\nShe accepted the prize in a green dress. She said the trees had taught her that small acts, when multiplied by millions of people, can transform the world.\n\nShe was right. She always was.	Research	\N	HerStories	t	2026-04-29 22:45:50.702664	2026-04-29 22:45:50.702665
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: herstories_user
--

COPY public.submissions (id, submission_type, subject_name, country, category, summary, full_story, education, career_highlights, honors, impact, reason, source, submitter_name, submitter_email, status, created_at) FROM stdin;
\.


--
-- Name: archive_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: herstories_user
--

SELECT pg_catalog.setval('public.archive_items_id_seq', 8, true);


--
-- Name: biographies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: herstories_user
--

SELECT pg_catalog.setval('public.biographies_id_seq', 24, true);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: herstories_user
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 3, true);


--
-- Name: submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: herstories_user
--

SELECT pg_catalog.setval('public.submissions_id_seq', 1, false);


--
-- Name: archive_items archive_items_pkey; Type: CONSTRAINT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.archive_items
    ADD CONSTRAINT archive_items_pkey PRIMARY KEY (id);


--
-- Name: biographies biographies_pkey; Type: CONSTRAINT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.biographies
    ADD CONSTRAINT biographies_pkey PRIMARY KEY (id);


--
-- Name: biographies biographies_slug_key; Type: CONSTRAINT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.biographies
    ADD CONSTRAINT biographies_slug_key UNIQUE (slug);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: submissions submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: herstories_user
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (id);


--
-- Name: ix_archive_items_era; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_archive_items_era ON public.archive_items USING btree (era);


--
-- Name: ix_archive_items_id; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_archive_items_id ON public.archive_items USING btree (id);


--
-- Name: ix_archive_items_region; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_archive_items_region ON public.archive_items USING btree (region);


--
-- Name: ix_archive_items_title; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_archive_items_title ON public.archive_items USING btree (title);


--
-- Name: ix_biographies_category; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_biographies_category ON public.biographies USING btree (category);


--
-- Name: ix_biographies_country; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_biographies_country ON public.biographies USING btree (country);


--
-- Name: ix_biographies_id; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_biographies_id ON public.biographies USING btree (id);


--
-- Name: ix_biographies_name; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_biographies_name ON public.biographies USING btree (name);


--
-- Name: ix_blog_posts_id; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_blog_posts_id ON public.blog_posts USING btree (id);


--
-- Name: ix_blog_posts_slug; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE UNIQUE INDEX ix_blog_posts_slug ON public.blog_posts USING btree (slug);


--
-- Name: ix_submissions_id; Type: INDEX; Schema: public; Owner: herstories_user
--

CREATE INDEX ix_submissions_id ON public.submissions USING btree (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO herstories_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO herstories_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO herstories_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO herstories_user;


--
-- PostgreSQL database dump complete
--

\unrestrict itulaAbs1h4sDrWqVrgZebDVwblhkKZckxepBKMmcJPFfJeBYnWdTFb0h4DTIWp

