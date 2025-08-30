from app.database import Base, engine, SessionLocal
from app.models import Biography

# Step 1: Create tables
print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Tables created.")

# Step 2: Insert data
db = SessionLocal()



    # Add others like Ngozi Okonjo-Iweala, Miriam Makeba, Ellen Johnson Sirleaf, Gambo Sawaba below as needed
biographies = [
    Biography(
        name="Chimamanda Ngozi Adichie",
        image="adiche.jpg",
        country="nigeria",
        flag="flags/nigeria.png",
        category="Feminist",
        summary="Award-winning Nigerian writer and feminist icon.",
        details={
            "basic_info": {
                "full_name": "Chimamanda Ngozi Adichie",
                "birth": "September 15, 1977 in Enugu, Nigeria; raised in Nsukka",
                "nationality": "Nigerian",
                "physical_appearance": "N/A",
                "status": "Alive"
            },
            "education": [
                {
                    "institution": "University of Nigeria",
                    "degree": "Studied Medicine (not completed)",
                    "year": "1996"
                },
                {
                    "institution": "Eastern Connecticut State University",
                    "degree": "BA in Communication and Political Science (summa cum laude)",
                    "year": "2001"
                },
                {
                    "institution": "Johns Hopkins University",
                    "degree": "MA in Creative Writing",
                    "year": "2003"
                },
                {
                    "institution": "Yale University",
                    "degree": "MA in African History",
                    "year": "2008"
                }
            ],
            "career_highlights": [
                "Debut novel *Purple Hibiscus* (2003), won Commonwealth Writers’ Prize for Best First Book",
                "*Half of a Yellow Sun* (2006), won the Orange Prize for Fiction",
                "*Americanah* (2013), won National Book Critics Circle Award and New York Times Top Ten Book",
                "*The Visit* (2025, short story titled *Dream Count*) marked her return to fiction after a decade"
            ],
            "author_and_advocate": [
                "Delivered TED talks: *The Danger of a Single Story* (2009) and *We Should All Be Feminists* (2012)",
                "*We Should All Be Feminists* adapted into a book (2014) and featured in Beyoncé’s *Flawless*",
                "Authored *Dear Ijeawele* (2017) and *Notes on Grief* (2021)"
            ],
            "honors": [
                "MacArthur Fellowship (2008)",
                "Named in The New Yorker’s '20 Under 40' (2010)",
                "Listed in Africa39, Time 100 Most Influential People (2015), Fortune's World’s 50 Greatest Leaders (2017)",
                "Holds 16 honorary doctorates from institutions including Yale, Duke, Edinburgh, and University of Johannesburg",
                "Elected to American Academy of Arts and Sciences and of Arts and Letters (2017)",
                "Received W. E. B. Du Bois Medal (2022)",
                "Declined Nigeria's national honor (Order of the Federal Republic) in 2022"
            ],
            "personal_life": [
                "Married Dr. Ivara Esege in 2009",
                "Mother of one daughter (2016) and recently welcomed twins",
                "Divides time between Nigeria and the U.S.",
                "Leads creative writing workshops and critiques traditional gender roles"
            ],
            "impact_and_influence": [
                "Revitalized global interest in African literature and challenged stereotypical narratives",
                "Influenced feminist thought worldwide through fiction and essays",
                "Her TED talks are among the most-watched globally and have shaped pop culture (notably Beyoncé’s branding)"
            ],
            "full_summary": (
                "Chimamanda Ngozi Adichie is a celebrated Nigerian author, feminist advocate, and global literary figure. "
                "Her groundbreaking novels (*Purple Hibiscus*, *Half of a Yellow Sun*, *Americanah*) and essays (*We Should All Be Feminists*, *Dear Ijeawele*) "
                "explore themes of identity, gender, migration, and cultural narrative. With numerous awards, fellowships, and honorary degrees—and a significant role in shaping twenty‑first‑century discussions about feminism and African stories—"
                "she remains influential both literary and intellectually."
            )
        }
    ),
    Biography(
        name="Funmilayo Ransome-Kuti",
        image="funmi-kuti.jpeg",
        country="nigeria",
        flag="flags/nigeria.png",
        category="Activist",
        summary="Trailblazing Nigerian women’s rights activist and nationalist.",
        details={
            "basic_info": {
                "full_name": "Frances Abigail Olufunmilayo Thomas Ransome‑Kuti",
                "birth": "October 25, 1900 in Abeokuta (Egbaland), Nigeria",
                "nationality": "Nigerian",
                "physical_appearance": "Short, strong presence; often wore traditional Yoruba attire.",
                "status": "Deceased (April 13, 1978, Lagos)"
            },
            "education": [
                { "institution": "Abeokuta Grammar School",
                 "degree": "First female student at secondary school",
                  "year": "1914–1917" 
                  },
                { "institution": "Wincham Hall School, England", 
                "degree": "Finishing school & exposure to socialism/anti‑colonialism", 
                "year": "1919–1923"
                 }
            ],
            "career_highlights": [
                "Began as an educator in Abeokuta, organizing pre‑school and adult literacy programmes",
                "Founded Abeokuta Ladies’ Club (1932), leading to Abeokuta Women’s Union (1944)",
                "Led mass protests of up to 10,000 women that forced Alake of Egba to abdicate in 1949",
                "Turned AWU into national Nigerian Women’s Union (1949) and later Federation of Nigerian Women’s Societies (1953)",
                "Served on Abeokuta local council (1949–1960), first female in Western House of Chiefs",
                "Founded Commoners’ People’s Party; active in independence-era national politics"
            ],
            "author_and_advocate": [
                "Spoke internationally in London in 1947 as only Nigerian woman at constitutional conference",
                "Wrote under her own name in Daily Worker criticizing colonial marginalization of women"
            ],
            "honors": [
                "Lenin Peace Prize (1970)",
                "Chieftaincy title: Oloye of the Yoruba people; first woman in the Western House of Chiefs",
                "Posthumous national hero titles; commemorated on Nigerian currency"
            ],
            "personal_life": [
                "Married Reverend Israel Oludotun Ransome‑Kuti in 1925",
                "Mother of four children including Fela Anikulapo‑Kuti, Dr. Olikoye, and Dr. Beko",
                "Endured political repression; thrown from a second‑floor window during 1977 military raid, died from injuries"
            ],
            "impact_and_influence": [
                "Known as 'Lioness of Lisabi' for leading women’s revolt and feminist nationalism",
                "Established one of Africa’s most powerful women’s movements bridging elite and market women",
                "Advocated women’s suffrage, education, healthcare, and dismantling colonial oppression"
            ],
            "full_summary": (
                "Funmilayo Ransome‑Kuti was a pioneering Nigerian feminist, educator, and nationalist whose grassroots organizing "
                "united elite and market women in the fight for civil and economic rights. She led mass protests that reshaped colonial policy, "
                "pioneered national women’s organizations, and served in local governance. Her courage, activism, and advocacy earned her "
                "international recognition and enduring legacy in Nigeria’s history."
            )
        }
    ),
    Biography(
    name="Gaositwe Chiepe",
    image="chiepe.jpg",
    country="botswana",
    flag="flags/botswana.png",
    category="Diplomat & Educator",
    summary="Trailblazing diplomat and Botswana’s first female cabinet minister.",
    details={
        "basic_info": {
            "full_name": "Dr. Gaositwe Keagakwa Tibe Chiepe",
            "birth": "20 October 1922, Kanye, Botswana",
            "nationality": "Motswana",
            "physical_appearance": "Elderly stateswoman with traditional dress and stately demeanor.",
            "status": "Deceased (Died 2023 at age 100)"
        },
        "education": [
            { "institution": "Tiger Kloof Educational Institute (South Africa)", "degree": "Teaching Certificate", "year": "—" },
            { "institution": "Fort Hare University", "degree": "BA", "year": "—" },
            { "institution": "University of Bristol (UK)", "degree": "MA in Education", "year": "1958" }
        ],
        "career_highlights": [
            "First female education officer in Botswana",
            "Permanent Representative of Botswana to the United Nations and High Commissioner to the UK",
            "Served as Botswana’s Minister of Foreign Affairs, Minister of Education, and Minister of Trade & Industry",
            "One of the longest-serving cabinet ministers in Botswana’s post-independence history",
            "Played key roles in shaping Botswana’s education system and foreign policy"
        ],
        "author_and_advocate": [
            "Promoted women's participation in politics and diplomacy",
            "Advocate for accessible education across Botswana and Southern Africa"
        ],
        "honors": [
            "Awarded Botswana’s Presidential Order of Honour",
            "Received honorary doctorates including from the University of Botswana",
            "Honored with state recognition on her 100th birthday"
        ],
        "personal_life": [
            "Never married; dedicated her life to national service and education"
        ],
        "impact_and_influence": [
            "Paved the way for women in African diplomacy and politics",
            "Instrumental in laying the foundation of Botswana’s postcolonial education policies",
            "Respected globally for her integrity, intellect, and service"
        ],
        "full_summary": (
            "Dr. Gaositwe Chiepe was a pioneering educator, diplomat, and cabinet minister in Botswana. As one of the first "
            "Botswana women to attain higher education and enter government service, she served as ambassador, foreign minister, and "
            "education minister. She helped shape Botswana’s foreign relations and school systems post-independence. Her decades of leadership, "
            "both at home and abroad, broke barriers for women in diplomacy and government. Dr. Chiepe passed away in 2023 at the age of 100, "
            "leaving behind a legacy of excellence, resilience, and national pride."
        )
    }
    ),
    Biography(
    name="Unity Dow",
    image="unity-dow.jpg",
    country="botswana",
    flag="flags/botswana.png",
    category="Jurist & Author",
    summary="Botswana’s first female High Court judge and acclaimed human rights advocate.",
    details={
        "basic_info": {
            "full_name": "Unity Dow",
            "birth": "23 April 1959, Mochudi, Botswana",
            "nationality": "Motswana",
            "physical_appearance": "Short natural hair, dignified presence, often in traditional or formal attire.",
            "status": "Alive"
        },
        "education": [
            { "institution": "University of Botswana and Swaziland", "degree": "LLB (Law)", "year": "1983" },
            { "institution": "University of Edinburgh", "degree": "Postgraduate Legal Studies", "year": "—" }
        ],
        "career_highlights": [
            "Co-founder of Botswana’s first all-woman law firm",
            "Won the landmark 1992 citizenship case against gender-based nationality laws",
            "Appointed as Botswana’s first female High Court judge (1997–2009)",
            "Delivered key ruling in 2006 supporting Basarwa (San) indigenous rights",
            "Former Minister of Education and Minister of Foreign Affairs",
            "Member of Parliament for Kgatleng West (2024– )"
        ],
        "author_and_advocate": [
            "Author of fiction and non-fiction works addressing justice, gender, and African identity",
            "Co-founder of Women and Law in Southern Africa (WLSA)",
            "Co-author of *Saturday Is for Funerals* exploring the HIV/AIDS crisis"
        ],
        "honors": [
            "Recipient of France’s Légion d’honneur",
            "Honorary doctorates from institutions including University of Edinburgh and St. Michael’s College",
            "Named among Africa’s most influential women"
        ],
        "personal_life": [
            "Married with children; values education and civic service"
        ],
        "impact_and_influence": [
            "Changed Botswana’s laws to recognize gender equality in citizenship rights",
            "Promoted indigenous rights and inclusive legal reform across Africa",
            "Blended literature and law to advocate for social transformation"
        ],
        "full_summary": (
            "Unity Dow is a pioneering Motswana jurist, author, and human rights activist. As Botswana’s first female "
            "High Court judge, she broke legal and gender barriers, most notably through her 1992 victory that overturned "
            "gender-discriminatory citizenship laws. Her landmark judgments and ministerial roles have advanced indigenous "
            "rights, education, and social justice. Dow is also a prolific writer whose works explore justice, gender, and African identity, "
            "cementing her legacy as a transformative figure in law, politics, and literature."
        )
    }
    ),
    Biography(
        name="Wangari Maathai",
        image="wangari.jpeg",
        flag="flags/kenya.png",
        country="kenya",
        category="Activist",
        summary="Kenyan environmentalist, political activist, and Nobel Peace laureate.",
        details={
            "basic_info": {
                "full_name": "Wangarĩ Muta Maathai",
                "birth": "April 1, 1940 in Tetu, Kenya",
                "nationality": "Kenyan",
                "physical_appearance": "Medium height, often seen in colorful African dress; authoritative presence.",
                "status": "Deceased (September 25, 2011, Nairobi)"
            },
            "education": [
                { "institution": "Mount St. Scholastica College, USA", "degree": "BSc in Biology", "year": "1964" },
                { "institution": "University of Pittsburgh", "degree": "MSc in Biological Sciences", "year": "1966" },
                { "institution": "University of Nairobi", "degree": "PhD in Veterinary Anatomy", "year": "1971" }
            ],
            "career_highlights": [
                "Founded Green Belt Movement (1977) to promote tree‑planting, environmental conservation and women’s empowerment",
                "First African woman to win Nobel Peace Prize (2004)",
                "Elected to Kenyan Parliament and served as Assistant Minister for Environment (2003–2005)",
                "Authored several books on ecology, development and African culture"
            ],
            "author_and_advocate": [
                "Wrote and lectured internationally on environmental justice, sustainable development and human rights"
            ],
            "honors": [
                "Nobel Peace Prize (2004)",
                "Right Livelihood Award (1984)",
                "Indira Gandhi Peace Prize (2006)",
                "UNEP Champion of the Earth, France’s Legion of Honour, Légion d'honneur (France)"
            ],
            "personal_life": [
                "Mother of one daughter, Wanjira Maathai",
                "Endured government arrests and trials for environmental activism",
                "Advocated democracy and anti‑corruption until her death"
            ],
            "impact_and_influence": [
                "Transformed environmental conservation into grassroots mass action through tree planting",
                "Inspired global environmental movements linking ecology and gender rights",
                "Played major role in Kenyan party politics and democratic reform"
            ],
            "full_summary": (
                "Wangarĩ Maathai was an inspiring Kenyan environmental and political activist whose founding of the Green Belt Movement "
                "brought together ecological restoration and women's empowerment. As the first African woman Nobel Peace Prize laureate, "
                "she forged a global legacy in sustainable development, democracy, and social justice."
            )
        }
    ),

    Biography(
        name="Fumilayo Adadevoh",
        image="adadevoh.jpeg",
        country="nigeria",
        flag="flags/nigeria.png",
        category="Activist",
        summary="Nigerian doctor who halted the spread of Ebola in Lagos.",
        details={
            "basic_info": {
                "full_name": "Ameyo Stella Adadevoh",
                "birth": "October 27, 1956 in Lagos, Nigeria",
                "nationality": "Nigerian",
                "physical_appearance": "Medium height; medical professional attire; calm and determined demeanor.",
                "status": "Deceased (August 19, 2014, Lagos)"
            },
            "education": [
                { "institution": "University of Lagos", "degree": "MBBS", "year": "1980" },
                { "institution": "London School of Hygiene & Tropical Medicine", "degree": "Postgraduate in Endocrinology", "year": "1985" }
            ],
            "career_highlights": [
                "Chief Consultant Physician at First Consultants Medical Centre, Lagos",
                "Diagnosed and quarantined Nigeria’s index Ebola patient in 2014, breaking transmission chain"
            ],
            "author_and_advocate": [
                "Advocated for improved public health protocols and emergency response infrastructure"
            ],
            "honors": [
                "Posthumous national honour by Nigerian government",
                "Recognized by UN Foundation in 2015",
                "Memorials established in her name"
            ],
            "personal_life": [
                "Married with one son",
                "Known for strong Christian faith, professionalism, and ethical leadership"
            ],
            "impact_and_influence": [
                "Credited with preventing a major Ebola outbreak in Nigeria through decisive action",
                "Recognized worldwide for her courage and public health legacy"
            ],
            "full_summary": (
                "Dr. Ameyo Stella Adadevoh was a dedicated Nigerian physician whose quick-thinking and moral courage prevented a widespread Ebola outbreak in Lagos. "
                "By isolating the index case despite pressure, she saved countless lives and became a national heroine with international recognition."
            )
        }
    ),

    Biography(
        name="Ngozi Okonjo‑Iweala",
        image="iweala.jpeg",
        country="nigeria",
        flag="flags/nigeria.png",
        category="Economist",
        summary="Nigerian economist, former Finance Minister and first female Director‑General of the WTO.",
        details={
            "basic_info": {
                "full_name": "Dr. Ngozi Okonjo‑Iweala",
                "birth": "June 13, 1954 in Ogwashi‑Ukwu, Nigeria",
                "nationality": "Nigerian (also U.S. citizenship since 2019)",
                "physical_appearance": "Professional demeanor; often seen in elegant business attire.",
                "status": "Alive"
            },
            "education": [
                { "institution": "Harvard University",
                 "degree": "AB in Economics (magna cum laude)", 
                 "year": "1976" 
                 },
                { "institution": "MIT", 
                "degree": "Master in City Planning (1978); PhD in Regional Economics and Development", 
                "year": "1981" 
                }
            ],
            "career_highlights": [
                "Spent 25 years at the World Bank, rising to Managing Director (2007–2011) managing an $81 billion portfolio",
                "Served twice as Nigeria’s Finance Minister (2003–2006, 2011–2015) and briefly as Foreign Affairs Minister (2006)",
                "Appointed first woman and first African Director‑General of the World Trade Organization in March 2021"
            ],
            "author_and_advocate": [
                "Speaks globally on trade reform, development economics, debt relief, vaccine equity and climate finance",
                "Served on boards including Gavi, Rockefeller Foundation, Twitter, Standard Chartered and more"
            ],
            "honors": [
                "Multiple honorary doctorates from institutions like Trinity College Dublin, Brown University, Amherst",
                "Time magazine’s recognition as a global leader reforming trade and development",
            ],
            "personal_life": [
                "Married to Ikemba Iweala; mother of four children (including Uzodinma)",
                "Holds dual citizenship and splits time between Nigeria and the U.S."
            ],
            "impact_and_influence": [
                "Negotiated Nigeria’s $18 billion debt relief; championed transparency and anticorruption reforms",
                "As WTO chief, aims to align trade to tackle COVID‑19, climate change, and equitable development"
            ],
            "full_summary": (
                "Dr. Ngozi Okonjo‑Iweala is a globally respected Nigerian economist and development leader. "
                "With decades of service at the World Bank and Nigeria’s government, she forged a reputation as a debt negotiator and reformer. "
                "In 2021 she broke barriers as the first woman and first African to lead the WTO. Her influence spans global finance, trade, "
                "public health equity, and climate policy."
            )
        }
    ),

    Biography(
        name="Ellen Johnson Sirleaf",
        image="ellen.jpg",
        country="liberia",
        flag="flags/liberia.png",
        category="Stateswoman",
        summary="Liberian economist and Africa’s first elected female head of state, Nobel Peace Prize laureate.",
        details={
            "basic_info": {
                "full_name": "Ellen Eugenia Johnson Sirleaf",
                "birth": "October 29, 1938 in Monrovia, Liberia",
                "nationality": "Liberian",
                "physical_appearance": "Poised and dignified; often wears tailored suits.",
                "status": "Alive"
            },
            "education": [
                { "institution": "College of West Africa, Monrovia", "degree": "Secondary schooling", "year": "1950s" },
                { "institution": "Madison Business College, Wisconsin", "degree": "Accounting diploma", "year": "1961?" },
                { "institution": "Harvard University (Kennedy School)", "degree": "MPA in Public Administration", "year": "1971" }
            ],
            "career_highlights": [
                "Served as Assistant Minister of Finance (1972–73) and Finance Minister under Doe’s regime (1980–85)",
                "Spent years in exile working for UNDP and women’s development before returning to run for presidency",
                "Elected President of Liberia in 2005 and re‑elected in 2011; first female head of state in Africa"
            ],
            "author_and_advocate": [
                "Advocated women’s inclusion in peace processes and launched the Sirleaf Market Women’s Fund",
                "Founded the Ellen Johnson Sirleaf Presidential Center for Women and Development (2018)"
            ],
            "honors": [
                "Nobel Peace Prize (2011) shared with Leymah Gbowee and Tawakkul Karman",
                "Ibrahim Prize for Achievement in African Leadership (2017)",
                "Numerous honorary degrees and leadership awards"
            ],
            "personal_life": [
                "Married and later divorced; mother of four sons",
                "Survived imprisonment under Doe’s regime; remained committed to reconciliation and governance"
            ],
            "impact_and_influence": [
                "Stabilized post-war Liberia, negotiated $4.6 billion debt forgiveness, promoted female empowerment and governance",
                "As Chair of ECOWAS in 2016, extended her diplomatic influence regionally"
            ],
            "full_summary": (
                "Ellen Johnson Sirleaf is a transformative stateswoman who led Liberia from war‑torn crisis to democratic recovery. "
                "With a background in economics and development, she prioritized debt relief, women’s empowerment, and rebuilding state institutions. "
                "In 2011 she received the Nobel Peace Prize for her contributions to peace and women's rights. Her leadership legacy continues through "
                "her mentorship initiatives across Africa."
            )
        }
    ),

    Biography(
        name="Miriam Makeba",
        image="makeba.jpeg",
        country="south-africa",
        flag="flags/south-africa.png",
        category="Artist",
        summary="South African singer, civil rights activist and global musical icon known as ‘Mama Africa.’",
        details={
            "basic_info": {
                "full_name": "Zenzile Miriam Makeba",
                "birth": "March 4, 1932 in Prospect Township, Johannesburg, South Africa",
                "nationality": "South African",
                "physical_appearance": "Graceful performer; expressive features; often in traditional African attire.",
                "status": "Deceased (November 9, 2008 in Italy)"
            },
            "education": [
                { "institution": "Kimerton Training Institute, Pretoria", "degree": "Vocational training", "year": "1940s" },
                { "institution": "Church choir and performing groups", "degree": "Early musical training", "year": "1950s" }
            ],
            "career_highlights": [
                "Joined the Manhattan Brothers and later formed the Skylarks in South Africa (1950s)",
                "Featured in 1959 film *Come Back, Africa*, leading to exile for anti‑apartheid stance",
                "First African woman to win a Grammy (with Harry Belafonte, 1966)",
                "Starred in Paul Simon’s *Graceland* tour (1987) and movie *Sarafina!* (1992)",
                "Recorded iconic songs like ‘Pata Pata’ and ‘Soweto Blues’ condemning apartheid"
            ],
            "author_and_advocate": [
                "Testified at the United Nations in 1963 against apartheid",
                "Appointed FAO Goodwill Ambassador (1999) and spoke for civil rights globally"
            ],
            "honors": [
                "Grammy Award for Best Folk Recording (1966)",
                "Dag Hammarskjöld Peace Prize (1986)",
                "Honorary citizenship in multiple countries"
            ],
            "personal_life": [
                "Mother of one daughter, Bongi Makeba",
                "Married briefly at age 17; later married Stokely Carmichael (1968–1978)",
                "Lived in exile across the U.S. and Guinea before returning post‑apartheid"
            ],
            "impact_and_influence": [
                "Brought African music to global audiences and used art to galvanize anti‑apartheid sentiment",
                "Became a symbol of resistance and reconciliation in Africa and the diaspora"
            ],
            "full_summary": (
                "Miriam Makeba—‘Mama Africa’—was an extraordinary singer and activist who used her voice to fight apartheid and uplift African identity worldwide. "
                "From her breakout in South Africa to her exile and global fame, she became the first African woman Grammy winner and continued to perform and advocate "
                "for justice until her passing in 2008. Her legacy lives on in music, civil rights and cultural pride."
            )
        }
    ),

    Biography(
        name="Gambo Sawaba",
        image="sawaba.jpeg",
        country="nigeria",
        flag="flags/nigeria.png",
        category="Activist",
        summary="Homie Hajiya Gambo Sawaba, pioneering northern Nigerian women’s rights activist and politician.",
        details={
            "basic_info": {
                "full_name": "Hajaratu Gambo Amarteifio Sawaba",
                "birth": "February 15, 1933 in Zaria, Nigeria",
                "nationality": "Nigerian",
                "physical_appearance": "Petite frame with fierce presence; often dressed modestly.",
                "status": "Deceased (October 2001 in Zaria)"
            },
            "education": [
                { "institution": "Native Authority Primary School, Tudun Wada, Zaria", "degree": "Primary education", "year": "1930s" },
                { "institution": "Self‑educated political activism", "degree": "N/A", "year": "N/A" }
            ],
            "career_highlights": [
                "Joined NEPU at age 17 and became leader of its National Women’s Wing",
                "Served as Deputy Chairman of Great Nigeria People’s Party (GNPP)",
                "Arrested and jailed at least 16 times for activism; campaigned against under‑aged marriage and forced labour"
            ],
            "author_and_advocate": [
                "Mentored by Funmilayo Ransome‑Kuti; traveled to Abeokuta to meet her",
                "Spoke publicly against child marriage and advocated Western education for northern women"
            ],
            "honors": [
                "Widely regarded as pioneer of northern Nigerian women’s liberation",
                "Recognized posthumously by women’s groups and historians"
            ],
            "personal_life": [
                "Married off at age 13; mother to one daughter",
                "Endured personal loss early and used personal hardship to fuel activism"
            ],
            "impact_and_influence": [
                "Symbol of resistance in northern Nigeria; inspired generations of Muslim and Hausa‑Fulani women",
                "Bridged regional politics with gender rights in colonial and post‑colonial Nigeria"
            ],
            "full_summary": (
                "Hajiya Gambo Sawaba was a bold political activist and women’s rights advocate from northern Nigeria. "
                "Despite early marriage and limited formal education, she led mass mobilization through NEPU and GNPP, "
                "challenging entrenched gender norms and colonial structures. Jailed numerous times, she remains a legendary figure in Nigeria’s feminist and political history."
            )
        }
    ),

    Biography(
        name="Ala Salah",
        image="ala-salah.avif",
        country="egypt",
        flag="flags/egypt.png",
        category="Physician",
        summary="Egypt‑born anesthesiologist and sustainability leader.",
        details={
            "basic_info": {
                "full_name": "Dr. Alaa Salama",
                "birth": "Date unknown, born in Egypt",
                "nationality": "Egyptian",
                "physical_appearance": "Professional medical attire; calm demeanor.",
                "status": "Alive"
            },
            "education": [
                { "institution": "Ain Shams University (Egypt)", "degree": "MBBCh", "year": "—" },
                { "institution": "Catholic University of Louvain (Belgium)", "degree": "MSc in Environmental Management", "year": "—" }
            ],
            "career_highlights": [
                "Staff physician in Anesthesiology at Cleveland Clinic Abu Dhabi",
                "Former consultant at University Hospital Basel, Switzerland",
                "Google Data Centres Sustainability Program Manager overseeing global operations"
            ],
            "author_and_advocate": [
                "Advocates integration of healthcare practice and environmental sustainability"
            ],
            "honors": [
                "Recognized in medical leadership roles and sustainability sectors"
            ],
            "personal_life": [
                "Details not publicly disclosed"
            ],
            "impact_and_influence": [
                "Fusing medical expertise with corporate sustainability leadership in global institutions"
            ],
            "full_summary": (
                "Dr. Alaa Salama is an Egyptian‑trained anesthesiologist and environmental management specialist. "
                "With leadership roles spanning major healthcare institutions and Google’s sustainability programmes, "
                "he represents a unique blend of clinical practice and sustainable operations in a global context."
            )
        }
    ),

    Biography(
        name="Amel Karboul",
        image="amel-karboul.jpg",
        country="tunisia",
        flag="flags/tunisia.png",
        category="Leader",
        summary="Tunisian author, speaker, former tourism minister and education innovator.",
        details={
            "basic_info": {
                "full_name": "Amel Karboul",
                "birth": "April 25, 1973 in Tunis, Tunisia",
                "nationality": "Tunisian",
                "physical_appearance": "Dynamic and polished; speaks multiple languages.",
                "status": "Alive"
            },
            "education": [
                { "institution": "University of Karlsruhe (Germany)",
                 "degree": "Engineering degree", 
                 "year": "—" 
                 },
                { "institution": "UK doctorate", 
                "degree": "PhD (unspecified)",
                 "year": "—" 
                 }
            ],
            "career_highlights": [
                "First female Minister of Tourism for Tunisia (2014–2015)",
                "CEO and founder of Change, Leadership & Partners",
                "Project leader at Mercedes‑Benz, consultant at DaimlerChrysler Corporate University, BCG"
            ],
            "author_and_advocate": [
                "Author of *Coffin Corner* (2015) on leadership culture",
                "Visionary speaker on education reform, leadership and social innovation"
            ],
            "honors": [
                "Named among top ten most influential women in Africa (2014–15)"
            ],
            "personal_life": [
                "Married to German engineer Marcus Gottschalk (2002–2016)",
                "Mother of two daughters"
            ],
            "impact_and_influence": [
                "Shaped Tunisia’s post‑Arab Spring governance and global leadership discourse",
                "Promoted results‑based education investments through Education Outcomes Fund"
            ],
            "full_summary": (
                "Dr. Amel Karboul is a Tunisian change‑maker whose cross‑sector leadership spans government, business, and education. "
                "As Tunisia’s first female tourism minister and founder of a global leadership firm, she blends innovation, management consulting, "
                "and advocacy, influencing leadership, education outcomes and regional governance."
            )
        }
    ),

    Biography(
        name="Aoua Keita",
        image="aoua-keita.jpeg",
        country="mali",
        flag="flags/mali.png",
        category="Activist",
        summary="Malian midwife, writer, politician and independence pioneer.",
        details={
            "basic_info": {
                "full_name": "Aoua Kéita",
                "birth": "July 12, 1912 in Bamako, French Sudan (now Mali)",
                "nationality": "Malian",
                "physical_appearance": "N/A",
                "status": "Deceased (May 7, 1980)"
            },
            "education": [
                { "institution": "École des Filles, Bamako", "degree": "Primary & secondary", "year": "graduated ~1928" },
                { "institution": "École de Médecine de Dakar", "degree": "Diploma in Midwifery", "year": "1931" }
            ],
            "career_highlights": [
                "First woman elected to French Sudan’s Legislative Assembly (1959)",
                "Served in Mali’s National Assembly after independence (1960s)",
                "Authored autobiography *Femme d’Afrique* (1975)"
            ],
            "author_and_advocate": [
                "Wrote and campaigned for women’s civic rights, education, and legal equality",
                "Instrumental in drafting Mali’s Marriage and Guardianship Code"
            ],
            "honors": [
                "Celebrated post‑independence for women’s political representation"
            ],
            "personal_life": [
                "Married a Dr. Diawara (later separated)",
                "Later lived in exile during political upheaval before returning to Bamako"
            ],
            "impact_and_influence": [
                "Pioneered women’s parliamentary leadership in Francophone West Africa",
                "Blended feminist, nationalist, and Pan‑African politics in early post‑colonial Mali"
            ],
            "full_summary": (
                "Aoua Kéita was a trailblazing Malian midwife, writer and politician. As the first woman elected to her country's legislature pre‑independence and an advocate of legal reform, "
                "she authored *Femme d’Afrique* and contributed to Mali’s first women's legislation. Her activism advanced women's rights in early post‑colonial West Africa."
            )
        }
    ),

    Biography(
        name="Ilwad Elman",
        image="ilwad-elman.jpg",
        country="somalia",
        flag="flags/somalia.png",
        category="Human Rights",
        summary="Somali‑Canadian peacebuilder and humanitarian activist.",
        details={
            "basic_info": {
                "full_name": "Ilwad Elman",
                "birth": "1989–1990 in Mogadishu, Somalia",
                "nationality": "Somali‑Canadian",
                "physical_appearance": "N/A",
                "status": "Alive"
            },
            "education": [],
            "career_highlights": [
                "COO of Elman Peace & Human Rights Center, Mogadishu",
                "Founded Somalia’s first rape crisis centre (2010)",
                "Short‑listed for 2019 Nobel Peace Prize"
            ],
            "author_and_advocate": [
                "Advocates disarmament of child soldiers and gender justice",
                "Worked on #MeToo‑in‑Somalia movement and Sexual Offenses Bill"
            ],
            "honors": [
                "African Young Personality (Female) of the Year, Africa Youth Awards 2016",
                "Recognized by Right Livelihood Award"
            ],
            "personal_life": [
                "Daughter of peace activists Elman Ali Ahmed (assassinated) and Fartuun Adan"
            ],
            "impact_and_influence": [
                "Pioneered trauma‑informed peacebuilding and gender‑based violence programming in Somalia",
                "Scaled community‑based rehabilitation across East Africa"
            ],
            "full_summary": (
                "Ilwad Elman is a Somali‑Canadian activist whose leadership in peacebuilding and women’s protection transformed post‑conflict Somalia. "
                "Through Elman Peace Centre, she launched innovative programmes to reintegrate former child soldiers and support survivors of sexual violence. "
                "Her mother’s legacy and her own endurance have made her a global voice for justice and healing."
            )
        }
    ),

    Biography(
        name="Joyce Banda",
        image="joyce-banda.jpg",
        country="malawi",
        flag="flags/malawi.png",
        category="Stateswoman",
        summary="Malawian politician, philanthropist and Malawi’s first female President.",
        details={
            "basic_info": {
                "full_name": "Joyce Hilda Banda (née Ntila)",
                "birth": "April 12, 1950 in Malemia, Nyasaland (now Malawi)",
                "nationality": "Malawian",
                "physical_appearance": "Poised and robust leadership presence.",
                "status": "Alive"
            },
            "education": [
                { "institution": "Atlantic International University (online)",
                 "degree": "Bachelor’s degree",
                  "year": "—" 
                  }
            ],
            "career_highlights": [
                "Minister of Gender, Child Welfare and Community Services (2004–2006)",
                "Foreign Minister (2006–2009)",
                "Vice President (2009–2012) and President of Malawi (2012–2014)"
            ],
            "author_and_advocate": [
                "Advocated for women’s and disability rights and legislative reforms (e.g. Domestic Violence Bill)"
            ],
            "honors": [
                "Africa Prize for Leadership for the Sustainable End of Hunger (1997)",
                "Named among Africa’s most powerful women by Forbes"
            ],
            "personal_life": [
                "Married twice; mother of five",
                "Educator and grassroots women's rights activist before entering politics"
            ],
            "impact_and_influence": [
                "Stabilized Malawi during a leadership crisis, pursued debt relief, and expanded women's participation in governance",
                "Founded People's Party and continued public advocacy after presidency"
            ],
            "full_summary": (
                "Joyce Banda served as Malawi’s Vice President and became her country’s first female President. "
                "Her administration emphasized women's empowerment, debt relief and democratic governance. "
                "A veteran activist and legislator, she remains a respected voice for social justice in Africa."
            )
        }
    ),

    Biography(
        name="Nawal el‑Saadawi",
        image="nawal-sadawi.avif",
        country="egypt",
        flag="flags/egypt.png",
        category="Feminist",
        summary="Egyptian physician, psychiatrist, author and pioneering feminist advocate.",
        details={
            "basic_info": {
                "full_name": "Dr. Nawal El Saadawi",
                "birth": "October 27, 1931 in Kafr Taḥlah, Egypt",
                "nationality": "Egyptian",
                "physical_appearance": "N/A",
                "status": "Deceased (March 21, 2021)"
            },
            "education": [
                { "institution": "Egyptian medical schools", "degree": "Medical Doctor; specialist", "year": "1950s–60s" }
            ],
            "career_highlights": [
                "Authored over 50 books including *Woman at Point Zero* on gender oppression",
                "One of the first Muslim women physicians in Egypt",
                "Founded Women’s Action Committee and spoke internationally"
            ],
            "author_and_advocate": [
                "Wrote critically on patriarchy, religion, FGM, sexuality and class",
                "Her works translated widely across 30+ languages"
            ],
            "honors": [
                "Named one of Time’s 100 Most Influential Women of the Past Century (2020)",
                "Called ‘Simone de Beauvoir of the Arab world’"
            ],
            "personal_life": [
                "Married multiple times; had a daughter and son",
                "Imprisoned repeatedly for political dissent"
            ],
            "impact_and_influence": [
                "Defined modern Arabic feminist discourse and challenged oppressive religious and cultural norms",
                "Inspired generations of activists in MENA region"
            ],
            "full_summary": (
                "Dr. Nawal El Saadawi was a fearless Egyptian feminist, physician, and writer whose groundbreaking work exposed the intimate link between patriarchy, religion, and power. "
                "Her novels and essays catalyzed feminist movements across the Arab world. An imprisoned dissident, she remained a global icon until her death in 2021."
            )
        }
    ),

    Biography(
        name="Tsitsi Dangarembga",
        image="tsitsi-dangaremba.jpg",
        country="zimbabwe",
        flag="flags/zimbabwe.png",
        category="Author",
        summary="Zimbabwean novelist, filmmaker and cultural activist.",
        details={
            "basic_info": {
                "full_name": "Tsitsi Dangarembga",
                "birth": "February 4, 1959 in Mutoko, Southern Rhodesia (now Zimbabwe)",
                "nationality": "Zimbabwean",
                "physical_appearance": "N/A",
                "status": "Alive"
            },
            "education": [
                { "institution": "Mission school in Mutare", "degree": "Primary & secondary education", "year": "1965–mid‑1970s" },
                { "institution": "University of Cambridge", "degree": "Studied medicine (did not complete)", "year": "late 1970s" }
            ],
            "career_highlights": [
                "Published debut novel *Nervous Conditions* (1988), first English novel by a Black Zimbabwean woman",
                "Commonwealth Writers’ Prize for *Nervous Conditions*",
                "Booker Prize shortlisted for *This Mournable Body* (2020)"
            ],
            "author_and_advocate": [
                "Filmmaker and playwright addressing gender, race, post‑colonial identity",
                "Public speaker on cultural justice and Zimbabwe’s political futures"
            ],
            "honors": [
                "PEN Pinter Prize",
                "Numerous literary fellowships and residencies (e.g. Bellagio Center)"
            ],
            "personal_life": [
                "Childhood split between England and Zimbabwe",
                "Mother from first Rhodesian Black woman graduate; father a school headmaster"
            ],
            "impact_and_influence": [
                "Shaped African feminism and literature through iconic narratives",
                "Active in anti‑corruption protests; recently arrested for protest participation"
            ],
            "full_summary": (
                "Tsitsi Dangarembga is a globally influential Zimbabwean novelist, filmmaker and cultural activist. "
                "Her landmark debut *Nervous Conditions* redefined African literary voices. With her recent *This Mournable Body*, she continues to challenge political oppression and gender norms. "
                "Her activism and art intersect to fight for justice and cultural self‑determination."
            )
        }
    ),

    Biography(
        name="Charlotte Maxeke",
        image="charlotte-maxeke.jpeg",
        country="south-africa",
        flag="flags/south-africa.png",
        category="Activist, Educator, Feminist",
        summary="South African pioneer: first Black woman university graduate, activist, educator, and founding feminist leader.",
        details={
            "basic_info": {
                "full_name": "Charlotte Makgomo Mannya Maxeke",
                "birth": "April 7, 1871 in Ga‑Ramokgopa (Polokwane), South Africa",
                "nationality": "South African",
                "physical_appearance": "Talented vocalist; dignified presence as a religious and community leader.",
                "status": "Deceased (October 16, 1939 in Johannesburg)"
            },
            "education": [
                { "institution": "Wilberforce University, Ohio", "degree": "BSc in Science (1903)", "year": "1903" }
            ],
            "career_highlights": [
                "First Black South African woman to earn a university degree",
                "Founding president of the Bantu Women’s League (1918), precursor to ANC Women’s League",
                "Organized anti‑pass protests and led delegations to government",
                "Appointed the first African probation officer in Johannesburg"
            ],
            "author_and_advocate": [
                "Wrote newspaper pieces advocating women’s rights and African liberation",
                "Delivered electrifying speeches within AME Church and ANC events"
            ],
            "honors": [
                "Known as 'Mother of Black Freedom in South Africa'",
                "Charlotte Maxeke Johannesburg Academic Hospital named in her honour",
                "Annual memorial lectures and schools named after her"
            ],
            "personal_life": [
                "Married fellow Wilberforce graduate Marshall Maxeke in 1903",
                "Worked closely in missionary, educational and political initiatives throughout her life"
            ],
            "impact_and_influence": [
                "Trailblazer for African women’s education and political participation",
                "Inspired formation of women’s rights movements and ANC Women’s League"
            ],
            "full_summary": (
                "Charlotte Maxeke was a visionary South African educator, feminist and political activist. "
                "As the first Black South African woman to earn a university degree, she pioneered women’s leadership "
                "and organized mass campaigns against colonial and racial oppression. Her legacy endures in numerous "
                "institutions and the continuing struggle for African women’s liberation."
            )
        }
    ),

    Biography(
        name="Ama Ata Aidoo",
        image="ama-ataido.jpeg",
        country="ghana",
        flag="flags/ghana.png",
        category="Author, Feminist, Educator, Politician",
        summary="Ghanaian author, playwright, feminist thinker and former education minister.",
        details={
            "basic_info": {
                "full_name": "Christina Ama Ata Aidoo",
                "birth": "March 23, 1942 in Abeadzi Kyiakor, Gold Coast (now Ghana)",
                "nationality": "Ghanaian",
                "physical_appearance": "Expressive and articulate in traditional Ghanaian dress or academic attire.",
                "status": "Deceased (May 31, 2023 in Accra)"
            },
            "education": [
                { "institution": "University of Ghana, Legon", "degree": "BA in English", "year": "1964" }
            ],
            "career_highlights": [
                "Published first play *The Dilemma of a Ghost* (1965), first Ghanaian female dramatist",
                "Authored novels and poems including *Our Sister Killjoy*, *Changes: A Love Story*",
                "Served as Ghana’s Minister of Education (1982‑83)"
            ],
            "author_and_advocate": [
                "Advocated consistently for women’s rights, African identity, and educational reform",
                "Founded the Mbaasem Foundation (2000) to support African women writers"
            ],
            "honors": [
                "Commonwealth Writers’ Prize winner (1992)",
                "Multiple literary awards and honorary degrees"
            ],
            "personal_life": [
                "Academic posts in Ghana and abroad",
                "Mentored generations of African female writers"
            ],
            "impact_and_influence": [
                "Shaped African feminist literature and discourse",
                "Preserved African storytelling traditions and encouraged literary expression"
            ],
            "full_summary": (
                "Ama Ata Aidoo was a powerful Ghanaian literary voice and feminist thinker whose plays, novels and public service shaped post‑colonial African identity. "
                "Her leadership in education and advocacy for women elevated the role of African female writers and thinkers across the continent."
            )
        }
    ),

    Biography(
        name="Aïcha Fofana",
        image="aicha-fofana.jpeg",
        country="mali",
        flag="flags/mali.png",
        category="Author, Activist, Feminist",
        summary="First Malian woman to publish a novel and a dedicated advocate for women’s rights.",
        details={
            "basic_info": {
                "full_name": "Aïcha Aminata Laïla Fofana",
                "birth": "1957 in Bamako, Mali",
                "nationality": "Malian",
                "physical_appearance": "N/A",
                "status": "Deceased (August 10, 2003 in Bamako)"
            },
            "education": [
                { "institution": "Lycée Notre‑Dame (Bamako & Bordeaux)", "degree": "Secondary education", "year": "1970s" },
                { "institution": "Sorbonne (Paris)", "degree": "Language studies", "year": "1980s" }
            ],
            "career_highlights": [
                "Published *Marriage: on copie* (1994), first novel by a Malian woman",
                "Wrote *La fourmilière* (published posthumously, 2006)",
                "Founded Promo‑femme TV school for young women photographers in Bamako"
            ],
            "author_and_advocate": [
                "Used her novels and plays to critique gender norms and corruption",
                "Co‑founded Malian Association of Human Rights (1998)"
            ],
            "honors": [
                "Celebrated as a literary pioneer among Malian women writers"
            ],
            "personal_life": [
                "Daughter of Mali’s Health Minister Bénitiéni Fofana",
                "Active in theatre and literature despite early passing"
            ],
            "impact_and_influence": [
                "Opened the door for women’s literary expression in Mali",
                "Mentored and inspired a generation of Malian women creatives"
            ],
            "full_summary": (
                "Aïcha Fofana was a pioneering Malian novelist and activist who broke new ground as the first woman in her country to publish a novel. "
                "Through her writing, theatre, and rights‑based activism, she challenged social conventions and expanded women’s educational and cultural opportunities in Mali."
            )
        }
    ),

    Biography(
        name="Adame Ba Konaré",
        image="adame-konare.jpg",
        country="mali",
        flag="flags/mali.png",
        category="Historian, Feminist, First Lady, Educator",
        summary="Malian historian, first lady, feminist author and founder of a women’s museum.",
        details={
            "basic_info": {
                "full_name": "Adame Ba Konaré",
                "birth": "May 1, 1947 in Ségou, Mali",
                "nationality": "Malian",
                "physical_appearance": "Academic and dignified presence as historian and public figure.",
                "status": "Alive"
            },
            "education": [
                { "institution": "École Normale Supérieure, Bamako", "degree": "History training", "year": "1970s" },
                { "institution": "University of Warsaw", "degree": "PhD in History", "year": "1976" }
            ],
            "career_highlights": [
                "Professor of History in Bamako",
                "First Lady of Mali (1999–2002) during husband President Alpha Oumar Konaré’s tenure",
                "Founded Muso Kunda (women’s museum) in 1987"
            ],
            "author_and_advocate": [
                "Authored biographies and philosophical works on women’s history",
                "Advocated historic preservation and expansion of African women’s narratives"
            ],
            "honors": [
                "Respected figure in Mali’s intellectual and feminist circles",
                "Recognized for preserving cultural memory via Muso Kunda"
            ],
            "personal_life": [
                "Married to ex-President Alpha Oumar Konaré",
                "Mother of Kadiatou Konaré, Minister of Culture"
            ],
            "impact_and_influence": [
                "Advanced understanding of women’s roles in Mali’s history",
                "Created one of few pan‑African women’s museums, cementing female agency in heritage"
            ],
            "full_summary": (
                "Adame Ba Konaré is a Malian historian, feminist author, and cultural preservationist who shaped national memory through scholarship and activism. "
                "As First Lady, she used her platform to create Muso Kunda—the first women’s museum in Africa—and authored works that foregrounded Malian women in history."
            )
        }
    ),

    Biography(
        name="Julienne Lusenge",
        image="julienne-lusenge.webp",
        country="drc",
        flag="flags/drc.png",
        category="Activist,Humanitarian,Feminist",
        summary="DRC human rights defender who founded SOFEPADI and advocates survivors of wartime sexual violence.",
        details={
            "basic_info": {
                "full_name": "Julienne Lusenge",
                "birth": "Date unspecified, born in Democratic Republic of the Congo",
                "nationality": "Congolese",
                "physical_appearance": "N/A",
                "status": "Alive"
            },
            "education": [],
            "career_highlights": [
                "Co‑founded SOFEPADI (2000), supporting survivors of sexual violence during conflict",
                "Founded Congolese Women’s Fund to finance local women’s initiatives",
                "Advises International Campaign to Stop Rape in Conflict"
            ],
            "author_and_advocate": [
                "Journalist-turned-activist documenting wartime abuses and advocating survivors’ reintegration"
            ],
            "honors": [
                "Knight of the Legion of Honour (France, 2013)",
                "Human Rights Award (Embassy of France, 2012)",
                "International Women of Courage Award (US, 2021)",
                "Women’s International Rights Award (Geneva Summit, 2018)"
            ],
            "personal_life": [
                "Driven by personal exposure to conflict in Eastern DRC"
            ],
            "impact_and_influence": [
                "Rehabilitated thousands of survivors through community support systems",
                "Raised global awareness on gender-based violence in conflict zones"
            ],
            "full_summary": (
                "Julienne Lusenge is a Congolese feminist and human rights activist who created pioneering support systems for survivors of wartime sexual violence. "
                "Through SOFEPADI and the Congolese Women’s Fund, she mobilized community reintegration and secured local funding—transforming post‑conflict justice in DRC."
            )
        }
    ),

    Biography(
        name="Fatou Bensouda",
        image="fatou-bensouda.jpg",
        country="gambia",
        flag="flags/gambia.png",
        category="Lawyer,Jurist,Political",
        summary="Gambian prosecutor and former Chief Prosecutor of the International Criminal Court.",
        details={
            "basic_info": {
                "full_name": "Fatou Bom Bensouda",
                "birth": "January 31, 1961 in Banjul, The Gambia",
                "nationality": "Gambian",
                "physical_appearance": "N/A",
                "status": "Alive"
            },
            "education": [
                { "institution": "University of Ife (Nigeria)", "degree": "LL.B (Honors)", "year": "1986" },
                { "institution": "Nigeria Law School", "degree": "Barrister-at-Law", "year": "1987" },
                { "institution": "International Maritime Law Institute, Malta", "degree": "LL.M in Maritime Law", "year": "1990s" }
            ],
            "career_highlights": [
                "Served as Gambia’s Solicitor General and Minister of Justice",
                "Elected Chief Prosecutor of the International Criminal Court (2012–2021)"
            ],
            "author_and_advocate": [
                "Advocated for international justice, anti-corruption and accountability"
            ],
            "honors": [
                "Recognized internationally for her leadership at ICC"
            ],
            "personal_life": [
                "Public service largely over private data"
            ],
            "impact_and_influence": [
                "Oversaw high‑profile prosecutions of war criminals and state leaders under ICC jurisdiction",
                "Raised Gambia’s profile in international law and transitional justice"
            ],
            "full_summary": (
                "Fatou Bensouda is a Gambian jurist who led the ICC as its Chief Prosecutor, with sweeping jurisdiction over crimes against humanity. "
                "Her tenure brought global attention to international justice and accountability, reinforcing the ICC’s role in prosecuting state and non‑state actors."
            )
        }
    ),
]

print("Inserting biographies...")

for bio in biographies:
    exists = db.query(Biography).filter(Biography.name == bio.name).first()
    if not exists:
        db.add(bio)

db.commit()
db.close()

print("Done inserting biographies.")























# from app.database import Base, engine, SessionLocal
# from app.models import Biography

# # Step 1: Create tables
# print("Creating database tables...")
# Base.metadata.create_all(bind=engine)
# print("Tables created.")

# # Step 2: Insert data
# db = SessionLocal()

# biographies = [
#     Biography(
#         name="Chimamanda Ngozi Adichie",
#         image="adiche.jpg",
#         country="nigeria",
#         flag="flags/nigeria.png",
#         category="Feminist",
#         summary="Award-winning Nigerian writer and feminist icon.",
#         details="Chimamanda Ngozi Adichie is a Nigerian writer whose work has been translated into over thirty languages. She is known for her novels like 'Half of a Yellow Sun' and 'Americanah'."
#     ),
#     Biography(
#         name="Funmilayo Ransome-Kuti",
#         image="funmi-kuti.jpeg",
#         country="nigeria",
#         flag= "flags/nigeria.png",
#          category="Activist",
#         summary="Trailblazing Nigerian women's rights Activist.",
#         details="Funmilayo Ransome-Kuti was a teacher, political campaigner, and mother of Afrobeat legend Fela Kuti."
#     ),
#     Biography(
#         name="Wangari Maathai",
#         image="wangari.jpeg",
#         flag="flags/kenya.png",
#          category="Activist",
#         country="kenya",
#         summary="Kenyan environmentalist and Nobel Peace Prize winner.",
#         details="Founded the Green Belt Movement and was the first African woman to win the Nobel Peace Prize."
#     ),
#     Biography(
#         name="Ellen Johnson Sirleaf",
#         image="ellen.jpg",
#         country="liberia",
#         flag="flags/liberia.png",
#         category="Activist",
#         summary="Africa’s first elected female president.",
#         details="Led Liberia and won the Nobel Peace Prize for promoting peace and women's rights."
#     ),
#     Biography(
#         name="Gambo Sawaba",
#         image="http://localhost:8000/static/sawaba.jpeg",
#         country="nigeria",
#         flag="http://localhost:8000/static/flags/nigeria.png",
#         category="Activist",
#         summary="Nigerian women’s rights advocate.",
#         details="Fought for the rights of northern Nigerian women and was jailed over 16 times for activism."
#     ),
#     Biography(
#         name="Ngozi Okonjo-Iweala",
#         image="http://localhost:8000/static/iweala.jpeg",
#         country="nigeria",
#         flag="http://localhost:8000/static/flags/nigeria.png",
#         category="Activist",
#         summary="Director-General of the World Trade Organization.",
#         details="Economist and Nigeria’s first female Finance Minister."
#     ),
#     Biography(
#         name="Miriam Makeba",
#         image="http://localhost:8000/static/makeba.jpeg",
#         country="south-africa",
#         flag="http://localhost:8000/static/flags/south-africa.png",
#         category="Activist",
#         summary="South African singer and activist.",
#         details="Used her voice to fight apartheid; known as 'Mama Africa'."
#     ),
#         Biography(
#             name="Fumilayo Adadevoh",
#             image="http://localhost:8000/static/adadevoh.jpeg",
#             country="nigeria",
#             flag="http://localhost:8000/static/flags/nigeria.png",
#             category="Activist",
#             summary="Nigerian doctor who stopped the spread of Ebola.",
#             details="Helped contain the Ebola outbreak in Lagos by quarantining patient zero."
#         )
# ]

# print("Inserting biographies...")

# for bio in biographies:
#     exists = db.query(Biography).filter(Biography.name == bio.name).first()
#     if not exists:
#         db.add(bio)

# db.commit()
# db.close()

# print("Done inserting biographies.")
