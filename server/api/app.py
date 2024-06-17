from llama_connect_service import LlamaConnectService
from google_search_service import GoogleSearchService
from credibility_calculator import calculate_credibility, get_llm_ans
from embedding_service import Embedder
from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS  # type: ignore

app = Flask(__name__)
CORS(app)


@app.route("/api/text", methods=["POST"])
def verify_news():
    news_content = request.json.get("news")
    lcs = LlamaConnectService()
    analysis = lcs.analyse_tone(news_content)
    analysis_answer = get_llm_ans(analysis)
    if analysis_answer is None or analysis_answer == -1:
        return {
            "analysis": analysis,
            "search_results": [],
            "credibility": -1000,
            "verdict": "not news",
        }
    gss = GoogleSearchService()
    embedder = Embedder()
    search_results = gss.search_google(news_content)
    relevance_scores = [x["similarity_score"] for x in search_results]
    model_output = embedder.check_news(news_content)
    credibility, llm_ans, _, _ = calculate_credibility(
        model_output, analysis_answer, relevance_scores
    )
    search_results.sort(key=lambda x: x["similarity_score"], reverse=True)
    verdict = 1
    verdict_in_words = "genuine"
    if credibility < 0.75:
        verdict = 0
        verdict_in_words = "fake"
    if verdict ^ llm_ans:
        analysis = lcs.contradiction(news_content, verdict_in_words)
    final_result = {
        "analysis": analysis,
        "search_results": search_results,
        "credibility": credibility * 100,
        "verdict": verdict_in_words,
    }
    return jsonify(final_result)


if __name__ == "__main__":
    app.run(debug=True)
