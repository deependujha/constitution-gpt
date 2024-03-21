"""
Contains code to resolve prompts asked by users to responses generated by Gemini model.
"""
from qdrant_store_embeddings.make_gemini_api_call import gemini_api_call
from qdrant_store_embeddings.qdrant_vector_store import search_qdrant_collection
from qdrant_store_embeddings.hugging_face_text_to_embedding import text_to_embeddings

COLLECTION_NAME = "constitution-gpt-embeddings-collection"


def _get_prompt_embedding(_prompt: str):
    """
    Helper function to convert prompt to embedding.
    """
    return text_to_embeddings(_prompt)


def _find_similar_contents_from_pdf(_prompt_embedding: list, limit=5):
    """
    Helper function to find similar contents from pdf.
    """
    search_result = search_qdrant_collection(
        collection_name=COLLECTION_NAME, query_vector=_prompt_embedding, limit=limit
    )

    context = ""

    for res in search_result:
        _con = dict(res)["payload"]["content"]
        context = context + _con

    return context

def _get_response_from_gemini(_context: str, _question: str):
    """
    Helper function to get response from Gemini model.
    """
    return gemini_api_call(_context, _question)


def main_resolver(_prompt: str):
    """
    Main function to resolve prompt to response.
    """
    prompt_embedding = _get_prompt_embedding(_prompt)
    context = _find_similar_contents_from_pdf(prompt_embedding)
    response = _get_response_from_gemini(context, _prompt)

    return response