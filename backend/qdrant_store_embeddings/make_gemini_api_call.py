"""
This file contains a function that makes an API call to the Gemini Pro LLM.
"""

import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI

load_dotenv()
google_api_key = os.getenv("GEMINI_API_KEY")
llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=google_api_key)
# print(f"{google_api_key=}")


def gemini_api_call(question: str, context: str):
    """_summary_
    Make an API call to the Gemini Pro LLM.

    Args:
        prompt (str): The prompt to pass to the LLM.

    Returns:
        str: The output of the LLM.
    """
    new_prompt = f"""Use the following pieces of context and pick useful info and try to answer the question.

    context: `{context}`

    Question: `{question}`
    Helpful Answer:"""
    output = llm.invoke(new_prompt)
    return output
