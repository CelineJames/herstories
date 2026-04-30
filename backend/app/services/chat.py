import os
import json
import anthropic
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.models import Biography, ArchiveItem

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are Ife, a knowledgeable and warm guide for HerStories — a digital archive celebrating African women's history.

You help users:
- Learn about the African women featured in the HerStories database
- Navigate and understand the digital archive
- Discover connections between different women and historical events
- Find relevant biographies and archive items

Guidelines:
- Answer based on the context provided. If the context doesn't contain enough information, say so honestly.
- Be warm, precise, and respectful of the women you are discussing.
- When relevant, mention that users can find more details in the biography or archive pages.
- Keep responses concise but informative — 2-4 paragraphs maximum.
- Never invent facts. If you don't know something, say so.
- Speak in the first person as Ife, not as "the AI" or "the assistant".
"""

EXTRACTION_PROMPT = """You are a search term extractor for HerStories — a database of African women's biographies and historical archive items.

Given a user's message, extract the most useful search terms to find relevant women, historical events, countries, themes, or time periods.

Return ONLY a valid JSON array of strings. No explanation, no markdown, just the array.

Examples:
User: "Tell me about Wangari Maathai" → ["Wangari Maathai", "Kenya", "environment"]
User: "Who fought against apartheid?" → ["apartheid", "South Africa", "resistance", "activist"]
User: "Show me women from Nigeria" → ["Nigeria"]
User: "What happened during colonial times in West Africa?" → ["colonial", "West Africa"]
User: "I want to learn about Nobel Prize winners" → ["Nobel Prize"]
User: "Who was the first female president in Africa?" → ["president", "Liberia", "Ellen Johnson Sirleaf"]
"""


def extract_search_terms(message: str) -> list:
    """Use Claude to intelligently extract search terms from the user message."""
    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=150,
            system=EXTRACTION_PROMPT,
            messages=[{"role": "user", "content": message}]
        )
        terms = json.loads(response.content[0].text.strip())
        if isinstance(terms, list):
            return [str(t) for t in terms]
        return []
    except Exception as e:
        print(f"DEBUG - extraction failed: {e}")
        # Fallback: use words longer than 3 characters
        return [w.strip("?.,!") for w in message.split() if len(w) > 3]


def get_biography_context(db: Session, message: str) -> str:
    """Search biographies using intelligently extracted search terms."""
    terms = extract_search_terms(message)
    print(f"DEBUG - extracted terms: {terms}")

    if not terms:
        return ""

    results = []
    for term in terms:
        search_term = f"%{term}%"
        matches = db.query(Biography).filter(
            or_(
                Biography.name.ilike(search_term),
                Biography.summary.ilike(search_term),
                Biography.category.ilike(search_term),
                Biography.country.ilike(search_term)
            )
        ).limit(3).all()

        for match in matches:
            if match not in results:
                results.append(match)

    if not results:
        return ""

    context = "Relevant biographies from the HerStories database:\n\n"
    for bio in results[:3]:
        context += f"Name: {bio.name}\n"
        context += f"Country: {bio.country}\n"
        context += f"Category: {bio.category}\n"
        context += f"Summary: {bio.summary}\n"
        if bio.details:
            if bio.details.get("full_summary"):
                context += f"Full story: {bio.details['full_summary']}\n"
            if bio.details.get("career_highlights"):
                highlights = bio.details["career_highlights"]
                context += f"Career highlights: {'; '.join(highlights[:3])}\n"
            if bio.details.get("honors"):
                honors = bio.details["honors"]
                context += f"Honors: {'; '.join(honors[:3])}\n"
        context += f"Profile URL: /biography/{bio.slug}\n\n"

    return context


def get_archive_context(db: Session, message: str, terms: list) -> str:
    """Search archive items using already extracted search terms."""
    if not terms:
        return ""

    results = []
    for term in terms:
        search_term = f"%{term}%"
        matches = db.query(ArchiveItem).filter(
            ArchiveItem.is_published == True,
            or_(
                ArchiveItem.title.ilike(search_term),
                ArchiveItem.description.ilike(search_term)
            )
        ).limit(2).all()

        for match in matches:
            if match not in results:
                results.append(match)

    if not results:
        return ""

    context = "Relevant archive items from the HerStories database:\n\n"
    for item in results[:3]:
        context += f"Title: {item.title}\n"
        context += f"Type: {item.item_type}\n"
        context += f"Era: {item.era}\n"
        context += f"Region: {item.region}\n"
        context += f"Description: {item.description}\n\n"

    return context


def chat(db: Session, message: str, conversation_history: list) -> str:
    """Main chat function — extracts terms, searches context, calls Claude."""

    print(f"DEBUG - message: {message}")

    # Extract search terms once, reuse for both searches
    terms = extract_search_terms(message)
    print(f"DEBUG - extracted terms: {terms}")

    # Search both biography and archive using the same terms
    bio_context = ""
    if terms:
        results = []
        for term in terms:
            search_term = f"%{term}%"
            matches = db.query(Biography).filter(
                or_(
                    Biography.name.ilike(search_term),
                    Biography.summary.ilike(search_term),
                    Biography.category.ilike(search_term),
                    Biography.country.ilike(search_term)
                )
            ).limit(3).all()
            for match in matches:
                if match not in results:
                    results.append(match)

        if results:
            bio_context = "Relevant biographies from the HerStories database:\n\n"
            for bio in results[:3]:
                bio_context += f"Name: {bio.name}\n"
                bio_context += f"Country: {bio.country}\n"
                bio_context += f"Category: {bio.category}\n"
                bio_context += f"Summary: {bio.summary}\n"
                if bio.details:
                    if bio.details.get("full_summary"):
                        bio_context += f"Full story: {bio.details['full_summary']}\n"
                    if bio.details.get("career_highlights"):
                        highlights = bio.details["career_highlights"]
                        bio_context += f"Career highlights: {'; '.join(highlights[:3])}\n"
                    if bio.details.get("honors"):
                        honors = bio.details["honors"]
                        bio_context += f"Honors: {'; '.join(honors[:3])}\n"
                bio_context += f"Profile URL: /biography/{bio.slug}\n\n"

    archive_context = get_archive_context(db, message, terms)

    print(f"DEBUG - bio_context found: {bool(bio_context)}")
    print(f"DEBUG - archive_context found: {bool(archive_context)}")

    context_block = ""
    if bio_context:
        context_block += bio_context
    if archive_context:
        context_block += archive_context

    if context_block:
        user_message = f"""Context from HerStories database:

{context_block}

User question: {message}

Please answer based on the context provided above."""
    else:
        user_message = f"""The user asked: {message}

No specific results were found in the HerStories database for this query.
Please let the user know what HerStories covers and suggest how they might find what they're looking for."""

    messages = conversation_history + [
        {"role": "user", "content": user_message}
    ]

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1000,
        system=SYSTEM_PROMPT,
        messages=messages,
    )

    return response.content[0].text