from llama_connect_service import LlamaConnectService
from google_search_service import GoogleSearchService
from credibility_calculator import calculate_credibility
from embedding_service import Embedder
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
app = Flask(__name__)
CORS(app)

@app.route("/api/text", methods=["POST"])
def verify_news():
    news_content = request.json.get("news")
    lcs = LlamaConnectService()
    gss = GoogleSearchService()
    embedder = Embedder()
    analysis = lcs.analyse_tone(news_content)
    search_results = gss.search_google(news_content)
    relevance_scores = [x["similarity_score"] for x in search_results]
    model_output = embedder.check_news(news_content)
    credibility = calculate_credibility(model_output, analysis, relevance_scores)
    final_result = {
        "analysis": analysis,
        "search_results": search_results,
        "credibility": credibility * 100,
        "verdict": "fake" if credibility < 0.75 else "not fake",
    }
    return jsonify(final_result)


if __name__ == "__main__":
    app.run(debug=True)
