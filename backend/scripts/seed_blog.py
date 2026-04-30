from app.database import SessionLocal
from app.models import BlogPost

db = SessionLocal()

posts = [
    BlogPost(
        title="Why I Built HerStories",
        slug="why-i-built-herstories",
        excerpt="HerStories was born from a simple frustration — the women who shaped Africa were missing from the narratives I studied. This is why I decided to do something about it.",
        content="""
When I was studying history, I noticed a pattern. The textbooks were full of kings, generals, and statesmen. The women — the activists, the queens, the scientists, the artists — were footnotes at best, absent at worst.

That frustration stayed with me. And when I started learning software development, I realised I had something most historians don't — the ability to build.

HerStories started as a side project. A way to combine my two worlds. But it quickly became something more. Every biography I researched reminded me of how much has been erased, and how much is still waiting to be found.

## What HerStories is trying to do

This is not just an archive. It is an argument. An argument that African women's history is rich, complex, and worthy of the same serious documentation that we give to the men in the history books.

Every woman in this database — from Wangari Maathai to Yaa Asantewaa to Funmilayo Ransome-Kuti — deserves more than a paragraph in someone else's story. They deserve their own.

## What comes next

The archive is growing. The biographies are expanding. And soon, the community will be able to contribute — submitting stories, documents, and histories that I would never find on my own.

If you know of a woman who should be in HerStories, submit her story. If you have a document, a photograph, an oral history — share it with us.

This is not my project. It belongs to every African woman whose story has ever been told, and every one whose story hasn't been told yet.
        """.strip(),
        category="About",
        author="HerStories",
        is_published=True,
    ),
    BlogPost(
        title="The Women Who Inspired This Project",
        slug="women-who-inspired-this-project",
        excerpt="Before HerStories had a name, there were women. Women whose stories I kept returning to, whose courage kept asking to be documented.",
        content="""
Every project has a before. Before the code, before the database, before the design — there are the stories that make you feel like something needs to exist.

These are some of the women who made me feel that way.

## Funmilayo Ransome-Kuti

I first encountered Funmilayo in a footnote. A footnote. The woman who organised 10,000 women in protest, who forced a king to abdicate, who was thrown from a window by soldiers and died from her injuries — in a footnote.

That footnote made me angry. It also made me start taking notes.

## Yaa Asantewaa

When the male chiefs of Ashanti hesitated, Yaa Asantewaa stood up and said the words that have echoed through history — if you men will not go forward, then we women will. She led the last major war of resistance against British colonial rule in Ghana.

Most people outside Ghana have never heard her name.

## Wangari Maathai

Wangari Maathai planted trees. She also planted democracy. Her Green Belt Movement showed that environmental conservation and political resistance are not separate things — they grow from the same roots.

She was the first African woman to win the Nobel Peace Prize. She deserved it.

## Why these women

I am not a descendant of any of these women. I am not from their countries. But their stories found me anyway — in footnotes, in passing references, in the margins of books about the men they worked alongside.

HerStories exists so that their stories are no longer found in margins.
        """.strip(),
        category="Research",
        author="HerStories",
        is_published=True,
    ),
    BlogPost(
        title="Wangari Maathai and the Politics of Trees",
        slug="wangari-maathai-politics-of-trees",
        excerpt="Planting a tree is a political act. Wangari Maathai understood this before almost anyone else did — and it cost her everything, and gave her everything.",
        content="""
In 1977, Wangari Maathai asked Kenyan women to plant trees.

It sounds simple. It was not simple.

## What the Green Belt Movement really was

On the surface, the Green Belt Movement was an environmental programme. Women planted trees to combat deforestation, prevent soil erosion, and provide firewood for their families. By the time Maathai died in 2011, the movement had planted over 51 million trees across Kenya.

But the trees were never just trees.

When Maathai asked women to plant trees, she was also asking them to organise. To meet. To talk. To develop opinions about their land, their government, their rights. The Green Belt Movement became one of the most effective grassroots political organisations in Kenyan history — and it started with seeds.

## What it cost her

The Kenyan government under Daniel arap Moi understood what the trees meant. Maathai was harassed, arrested, beaten. Her marriage ended — her husband told a court that she was too educated, too strong, too difficult to control. The judge agreed and granted the divorce.

She responded by saying the judge was incompetent. She was jailed for contempt of court.

She kept planting trees.

## The Nobel Prize and what came after

In 2004, Wangari Maathai became the first African woman to win the Nobel Peace Prize. The committee cited her contribution to sustainable development, democracy, and peace.

She accepted the prize in a green dress. She said the trees had taught her that small acts, when multiplied by millions of people, can transform the world.

She was right. She always was.
        """.strip(),
        category="Research",
        author="HerStories",
        is_published=True,
    ),
]

print("Seeding blog posts...")

for post in posts:
    exists = db.query(BlogPost).filter(BlogPost.slug == post.slug).first()
    if not exists:
        db.add(post)

db.commit()
db.close()

print(f"Done. {len(posts)} posts seeded.")