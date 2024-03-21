"""_summary_
This script splits a PDF file into separate pages.
"""

from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader


def split_pdf_into_pages(pdf_path: str):
    """_summary_
    This function splits a PDF file into separate pages.

    Args:
        pdf_path (str): The path to the PDF file.
    """
    loader = PyPDFLoader(pdf_path)
    pages = loader.load_and_split()
    return pages


def split_pages_into_text(pages, chunk_size=1000, chunk_overlap= 300):
    """_summary_
    This function splits a list of PDF pages into separate text documents.

    Args:
        pages (list): A list of PDF pages.
    """
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
    )

    texts = text_splitter.split_documents(pages)

    return texts
