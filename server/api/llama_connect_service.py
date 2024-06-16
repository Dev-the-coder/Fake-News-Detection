from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()


class LlamaConnectService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("LLAMA_KEY"))

    def analyse_tone(self, news_content):
        completion = self.client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {
                    "role": "user",
                    "content": f"""
                    This is a news:
                    {news_content}
                    Based on the tone of the news, does it sound fake? Analyse in points. 
                    After analysing, say 1 at the end if it seems to be genuine, else 0
                    """,
                }
            ],
            temperature=1,
            max_tokens=1024,
            top_p=1,
            stream=True,
        )

        return "".join([chunk.choices[0].delta.content or "" for chunk in completion])

    def summarise_article(self, news_content):
        completion = self.client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {
                    "role": "user",
                    "content": f"""
                    This is a news:
                    {news_content}
                    Summarise it under " " into a phrase so that it can be searched in google.
                    """,
                }
            ],
            temperature=1,
            max_tokens=1024,
            top_p=1,
            stream=True,
        )

        return "".join([chunk.choices[0].delta.content or "" for chunk in completion])
