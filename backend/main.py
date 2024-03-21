from fastapi import FastAPI, HTTPException
from prompt_to_response_resolver import main_resolver
from models.prompt_response_model import GetPromptModel

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/get_answer")
def read_item(_prompt: GetPromptModel):
    """
    Function implementation of /get_answer route
    """
    try:
        user_prompt = _prompt.prompt
        print(f"{user_prompt=}")
        response = main_resolver(user_prompt)
        print(f"{response=}")
        return {"answer": response}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
