import re
import numpy as np


def get_llm_ans(analysis):
    analysis_answer = re.findall(r"\*\*[+-]?(\d)\*\*", analysis)
    if not len(analysis_answer):
        analysis_answer = re.findall("fake", analysis)
        if not len(analysis_answer):
            analysis_answer = re.findall("genuine", analysis)
            if not len(analysis_answer):
                return
            else:
                analysis_answer = 1
        else:
            analysis_answer = 0
    else:
        analysis_answer = int(analysis_answer[0])
    return analysis_answer


def calculate_credibility(classifier_result, analysis_answer, relevance_scores):
    weights = [0.45, 0.45, 0.1]
    if analysis_answer is None:
        weights[0] = 0
    l = len(relevance_scores)
    if not l:
        weights[1] = 0
        relevance_answer = 0
    else:
        relevance_answer = (
            (1 - np.exp(-l))
            * sum([(l - i + 1) * x for i, x in enumerate(relevance_scores)])
            / sum(list(range(1, l + 1)))
        )
    return (
        (
            weights[0] * analysis_answer
            + relevance_answer * weights[1]
            + classifier_result * weights[2]
        ),
        analysis_answer,
        relevance_answer,
        classifier_result,
    )
