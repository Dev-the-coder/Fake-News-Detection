from serpapi import GoogleSearch
from llama_connect_service import LlamaConnectService
from embedding_service import Embedder
from dotenv import load_dotenv
import os
import re

load_dotenv()


class GoogleSearchService:
    def __init__(self):
        self.serpapi_key = os.getenv("SERPAPI_KEY")

    def search_google(self, news_content):
        lcs = LlamaConnectService()
        article_summarised = lcs.summarise_article(news_content)
        search_query = self.extract_query(article_summarised)
        params = {
            "q": search_query,
            "engine": "google",
            "api_key": self.serpapi_key,
        }
        search = GoogleSearch(params)
        results = search.get_dict().get("organic_results", [])
        return self.process_search_results(search_query, results)

    def extract_query(self, article_summarised):
        return re.findall(r'"([^"]*)"', article_summarised)[0]

    def process_search_results(self, query, results):
        embedder = Embedder()
        query_embed = embedder.generate_embedding(query)
        relevance_scores = []

        for result in results:
            title = result.get("title")
            snippet = result.get("snippet")
            result_embed = embedder.generate_embedding(f"{title}. {snippet}")
            similarity_score = embedder.check_relevance(query_embed, result_embed)
            if similarity_score > 0.5:
                relevance_scores.append(
                    {
                        "title": title,
                        "link": result.get("link"),
                        "similarity_score": similarity_score,
                        "post_date": result.get("date"),
                        "content_source": result.get("source"),
                        "verdict": (
                            "likely related"
                            if similarity_score > 0.65
                            else "likely unrelated"
                        ),
                    }
                )

        return relevance_scores
