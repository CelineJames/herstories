from app.database import SessionLocal
from app.models import ArchiveItem

db = SessionLocal()

archive_items = [
    ArchiveItem(
        title="The Abeokuta Women's Revolt, 1949",
        item_type="document",
        description="A detailed account of the mass protest led by Funmilayo Ransome-Kuti and the Abeokuta Women's Union against taxation and the oppressive rule of the Alake. Over 10,000 women participated, forcing the Alake to abdicate.",
        era="colonial",
        region="West Africa",
        country="nigeria",
        tags=["protest", "taxation", "women's rights", "Yoruba", "colonial resistance"],
        source="Nigerian National Archives",
        thumbnail_url="/assets/funmi-kuti.jpeg",
    ),
    ArchiveItem(
        title="Wangari Maathai and the Green Belt Movement",
        item_type="photo",
        description="A photographic record of Wangari Maathai's founding of the Green Belt Movement in 1977, which mobilised thousands of Kenyan women to plant trees, conserve the environment and fight for democratic rights.",
        era="post-independence",
        region="East Africa",
        country="kenya",
        tags=["environment", "activism", "Nobel Prize", "reforestation", "women's empowerment"],
        source="Green Belt Movement Archive",
        thumbnail_url="/assets/wangari.jpeg",
    ),
    ArchiveItem(
        title="Ellen Johnson Sirleaf — Inaugural Address, 2006",
        item_type="document",
        description="The full text of Ellen Johnson Sirleaf's inaugural address as President of Liberia — the first female head of state in Africa. She called for reconciliation, reconstruction and women's inclusion in governance.",
        era="contemporary",
        region="West Africa",
        country="liberia",
        tags=["presidency", "democracy", "reconciliation", "first female president"],
        source="Liberian Government Archives",
        thumbnail_url="/assets/sirleaf.jpg",
    ),
    ArchiveItem(
        title="Miriam Makeba at the United Nations, 1963",
        item_type="oral_history",
        description="Transcript of Miriam Makeba's historic testimony before the United Nations Special Committee Against Apartheid, where she spoke out against the South African apartheid regime and called for international action.",
        era="colonial",
        region="Southern Africa",
        country="south-africa",
        tags=["apartheid", "United Nations", "music", "activism", "testimony"],
        source="United Nations Archives",
        thumbnail_url="/assets/makemba.jpeg",
    ),
    ArchiveItem(
        title="Yaa Asantewaa and the War of the Golden Stool, 1900",
        item_type="document",
        description="Historical records documenting Yaa Asantewaa's role as the military leader of the Ashanti uprising against British colonial rule. She rallied chiefs and warriors when male leaders hesitated, leading one of the last major wars of resistance in Africa.",
        era="pre-colonial",
        region="West Africa",
        country="ghana",
        tags=["resistance", "Ashanti", "British colonialism", "military leadership", "Golden Stool"],
        source="Ghana National Archives",
        thumbnail_url="/assets/yaa-asantewa.webp",
    ),
    ArchiveItem(
        title="Charlotte Maxeke — First Black South African Woman Graduate",
        item_type="photo",
        description="Photographic and written records commemorating Charlotte Maxeke's graduation from Wilberforce University in Ohio in 1903 — making her the first Black South African woman to earn a university degree.",
        era="colonial",
        region="Southern Africa",
        country="south-africa",
        tags=["education", "first", "ANC", "women's rights", "pioneer"],
        source="South African History Archive",
        thumbnail_url="/assets/charlotte-maxeke.jpeg",
    ),
    ArchiveItem(
        title="Chimamanda Ngozi Adichie — We Should All Be Feminists, TED 2012",
        item_type="oral_history",
        description="Transcript of Chimamanda Ngozi Adichie's landmark TED talk delivered in 2012, later adapted into a book. The talk redefined feminist discourse globally and was sampled by Beyoncé in the song Flawless.",
        era="contemporary",
        region="West Africa",
        country="nigeria",
        tags=["feminism", "TED talk", "literature", "gender", "identity"],
        source="TED Archives",
        thumbnail_url="/assets/adiche.jpg",
    ),
    ArchiveItem(
        title="Fatou Bensouda — ICC Chief Prosecutor Appointment, 2012",
        item_type="document",
        description="Official records and press materials documenting Fatou Bensouda's election as Chief Prosecutor of the International Criminal Court — the first African woman to hold the position.",
        era="contemporary",
        region="West Africa",
        country="gambia",
        tags=["international law", "ICC", "justice", "first African woman", "war crimes"],
        source="International Criminal Court",
        thumbnail_url="/assets/fatou-bensouda.jpg",
    ),
]

print("Seeding archive items...")

for item in archive_items:
    exists = db.query(ArchiveItem).filter(ArchiveItem.title == item.title).first()
    if not exists:
        db.add(item)

db.commit()
db.close()

print(f"Done. {len(archive_items)} archive items seeded.")