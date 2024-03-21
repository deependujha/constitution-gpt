"""
Qdrant vector store client.
"""

import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct
from qdrant_client.http.models import Distance, VectorParams


load_dotenv()
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")

# print(f"{QDRANT_API_KEY=}")
# print(f"{QDRANT_URL=}")

qdrant_client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)


def create_qdrant_collection(collection_name: str, embedding_size: int):
    """
    Create a Qdrant collection.
    """

    collection_already_exists = qdrant_client.collection_exists(
        collection_name=collection_name
    )
    if collection_already_exists:
        print(f"Collection {collection_name} already exists.")
        return

    print(f"Creating collection {collection_name}...")
    qdrant_client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=embedding_size, distance=Distance.DOT),
    )


def upload_to_qdrant_collection(
    collection_name: str, ids: int, vectors: list, payloads: dict
):
    """_summary_
    Upload a vector to a Qdrant collection.
    """
    operation_info = qdrant_client.upsert(
        collection_name=collection_name,
        wait=True,
        points=[
            PointStruct(id=idx, vector=vector, payload=payload)
            for (idx, vector, payload) in zip(ids, vectors, payloads)
        ],
    )

    print(f"{operation_info=}")


def search_qdrant_collection(collection_name: str, query_vector: list, limit: int = 3):
    """_summary_
    Search a Qdrant collection.
    """
    search_result = qdrant_client.search(
        collection_name=collection_name,
        query_vector=query_vector,
        limit=limit,
    )
    return search_result
