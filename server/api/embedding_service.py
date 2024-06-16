from sentence_transformers import SentenceTransformer, util
import pickle
import torch.nn.functional as F


class Embedder:
    def __init__(self):
        embedder = "all-MiniLM-L12-v2"
        self.embedding_model = SentenceTransformer(embedder, trust_remote_code=True)

    def generate_embedding(self, sentence):
        embeddings = self.embedding_model.encode([sentence], convert_to_tensor=True)
        embeddings = F.layer_norm(embeddings, normalized_shape=(embeddings.shape[1],))
        embeddings = embeddings[:, :512]
        return F.normalize(embeddings, p=2, dim=1)

    def check_relevance(self, embed1, embed2):
        return util.pytorch_cos_sim(embed1, embed2).item()

    def check_news(self, news_content):
        with open("news_classifier.pkl", "rb") as model_file:
            model = pickle.load(model_file)
        embedding = self.generate_embedding(news_content)
        return model.predict_proba(embedding)[0, 0] - 0.8
