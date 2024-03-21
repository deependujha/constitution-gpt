"""
Contains the code to convert text to an embedding.
Uses the Hugging Face sentence-transformers library.
"""
from langchain_community.embeddings import HuggingFaceEmbeddings


embeddings = HuggingFaceEmbeddings()

"""
Hugging Face embedding:
    max sequence length: 384
    word embedding dimension: 768

======================================================================

HuggingFaceEmbeddings(client=SentenceTransformer(
  (0): Transformer({'max_seq_length': 384, 'do_lower_case': False}) with Transformer model: MPNetModel 
  (1): Pooling({'word_embedding_dimension': 768, 'pooling_mode_cls_token': False, 'pooling_mode_mean_tokens': True, 'pooling_mode_max_tokens': False, 'pooling_mode_mean_sqrt_len_tokens': False, 'pooling_mode_weightedmean_tokens': False, 'pooling_mode_lasttoken': False, 'include_prompt': True})
  (2): Normalize()
), model_name='sentence-transformers/all-mpnet-base-v2', cache_folder=None, model_kwargs={}, encode_kwargs={}, multi_process=False, show_progress=False)
"""

def get_embedding_length():
    """
    function to get the embedding length
    """
    return 768  # word embedding dimension of sentence-transformer

def text_to_embeddings(my_text: str):
    """
    function to convert text to an embedding
    """
    curr_embed = embeddings.embed_query(my_text)
    return curr_embed
