import os
import random
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.chains import RetrievalQA
import pinecone

load_dotenv()
PORT = os.getenv('PORT')

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_ENV = os.getenv('PINECONE_ENV')

embeddings = OpenAIEmbeddings()

# initialize pinecone
pinecone.init(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_ENV
)

index_name = "kritrim-ai"
llm = OpenAI(openai_api_key=OPENAI_API_KEY, temperature=0)
docsearch = Pinecone.from_existing_index(index_name, embeddings)

qa = RetrievalQA.from_chain_type(
    llm=OpenAI(), chain_type="stuff", retriever=docsearch.as_retriever()
)

new_prompt = '''Use the following pieces of context to answer the question at the end. If the answer is not present in the context, please answer with "I am sorry, but I couldn't find the answer".

{context}

Question: {question}
Helpful Answer:'''

qa.combine_documents_chain.llm_chain.prompt.template = new_prompt


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/chatbot', methods=['POST'])
def home():
    question = request.json.get('question')
    if question is None:
        response = jsonify({'error': 'Bad Request'})
        response.status_code = 400
        return response

    try:
        result = qa.run(question)

        response = jsonify({'response': result, 'success': True})
        response.status_code = 200
        return response
    
    except Exception as e:
        response = jsonify({'error': str(e), 'success': False})
        response.status_code = 500
        return response


if __name__ == '__main__':
    app.run(port=PORT, debug=True)
