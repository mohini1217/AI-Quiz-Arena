import { useNavigate, useParams } from "react-router-dom";
import "../styles/Result.css";

function Result() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const history = JSON.parse(
    localStorage.getItem("quizArenaHistory") || "[]"
  );

  const latestResult = JSON.parse(
    localStorage.getItem("quizArenaLatestResult") || "null"
  );

  const result =
    history.find(
      (item) => String(item.id) === String(attemptId)
    ) ||
    (latestResult &&
    String(latestResult.id) === String(attemptId)
      ? latestResult
      : null);

  if (!result) {
    return (
      <main className="result-main">
        <div className="result-not-found">
          <div>🔍</div>
          <h1>Result Not Found</h1>
          <p>
            We couldn't find this quiz result. Please try taking
            the quiz again.
          </p>

          <button
            className="result-primary-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const totalQuestions = Number(result.totalQuestions) || 0;
  const score = Number(result.score) || 0;

  const percentage =
    result.percentage !== undefined
      ? Number(result.percentage)
      : totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;

  const answers = Array.isArray(result.answers)
    ? result.answers
    : [];

  const correctCount = answers.filter(
    (answer) =>
      answer.selectedAnswer !== undefined &&
      answer.selectedAnswer !== null &&
      answer.selectedAnswer !== "" &&
      String(answer.selectedAnswer) ===
        String(answer.correctAnswer)
  ).length;

  const incorrectCount = Math.max(
    0,
    totalQuestions - correctCount
  );

  const date = result.date
    ? new Date(result.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Today";

  return (
    <main className="result-main">
      <section className="result-hero">
        <div className="result-celebration">🏆</div>

        <span className="result-eyebrow">
          CHALLENGE COMPLETED
        </span>

        <h1>
          {percentage >= 80
            ? "Excellent Work!"
            : percentage >= 50
              ? "Good Effort!"
              : "Keep Practicing!"}
        </h1>

        <p className="result-subtitle">
          {percentage >= 80
            ? "Amazing! You've demonstrated a great understanding of this topic. Keep up the excellent work!"
            : percentage >= 50
              ? "Good job completing the challenge! Review your answers and keep improving."
              : "Every attempt helps you learn. Review the explanations below and try again!"}
        </p>

        <span className="result-category-label">
          ⚡{" "}
          {result.categoryName ||
            result.categoryId ||
            "General Knowledge"}
        </span>

        <div className="result-score-card">
          <div
            className="result-score-circle"
            style={{
              "--score-progress": `${Math.min(
                100,
                Math.max(0, percentage)
              )}%`,
            }}
          >
            <div className="result-score-inner">
              <span className="result-score-label">
                YOUR SCORE
              </span>

              <strong>{percentage}%</strong>

              <span className="result-score-fraction">
                {score} / {totalQuestions} correct
              </span>
            </div>
          </div>

          <div className="result-score-stats">
            <div className="result-stat">
              <span className="result-stat-icon">✅</span>

              <div>
                <strong>{correctCount}</strong>
                <span>Correct Answers</span>
              </div>
            </div>

            <div className="result-stat">
              <span className="result-stat-icon">📝</span>

              <div>
                <strong>{incorrectCount}</strong>
                <span>Incorrect / Unanswered</span>
              </div>
            </div>

            <div className="result-stat">
              <span className="result-stat-icon">📅</span>

              <div>
                <strong>{date}</strong>
                <span>Completion Date</span>
              </div>
            </div>
          </div>
        </div>

        <div className="result-action-buttons">
          <button
            className="result-primary-button"
            onClick={() => navigate("/dashboard")}
          >
            ↻ Play Again
          </button>

          <button
            className="result-secondary-button"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </section>

      <section className="result-review-section">
        <div className="result-section-heading">
          <span className="result-eyebrow">
            LEARN FROM YOUR ATTEMPT
          </span>

          <h2>Answer Review</h2>

          <p>
            Review your answers, check the correct options, and
            understand the explanations.
          </p>
        </div>

        <div className="result-review-list">
          {answers.length > 0 ? (
            answers.map((answer, index) => {
              const isAnswered =
                answer.selectedAnswer !== undefined &&
                answer.selectedAnswer !== null &&
                answer.selectedAnswer !== "";

              const isCorrect =
                isAnswered &&
                String(answer.selectedAnswer) ===
                  String(answer.correctAnswer);

              const options = Array.isArray(answer.options)
                ? answer.options
                : [];

              return (
                <article
                  className={`review-card ${
                    isCorrect
                      ? "review-correct"
                      : "review-incorrect"
                  }`}
                  key={`${attemptId}-${index}`}
                >
                  <div className="review-card-header">
                    <span className="review-question-number">
                      QUESTION {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="review-status">
                      {!isAnswered
                        ? "Unanswered"
                        : isCorrect
                          ? "✓ Correct"
                          : "✕ Incorrect"}
                    </span>
                  </div>

                  <h3>{answer.question}</h3>

                  <div className="review-options">
                    {options.map((option, optionIndex) => {
                      const optionValue =
                        typeof option === "object" && option !== null
                          ? option.value ??
                            option.text ??
                            option.label
                          : option;

                      const optionText =
                        typeof option === "object" && option !== null
                          ? option.text ??
                            option.label ??
                            option.value
                          : option;

                      const isSelected =
                        isAnswered &&
                        String(optionValue) ===
                          String(answer.selectedAnswer);

                      const isAnswer =
                        String(optionValue) ===
                        String(answer.correctAnswer);

                      let optionClass = "review-option";

                      if (isAnswer) {
                        optionClass += " review-option-correct";
                      } else if (isSelected && !isCorrect) {
                        optionClass += " review-option-wrong";
                      }

                      return (
                        <div
                          className={optionClass}
                          key={optionIndex}
                        >
                          <span className="review-option-letter">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>

                          <span>{optionText}</span>

                          <span className="review-option-label">
                            {isAnswer
                              ? "Correct Answer"
                              : isSelected
                                ? "Your Answer"
                                : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="review-explanation">
                    <span>💡</span>

                    <div>
                      <strong>Explanation</strong>

                      <p>
                        {answer.explanation ||
                          "Review this concept and try the quiz again."}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="result-not-found">
              <p>
                Detailed answer review is not available for this attempt.
              </p>
            </div>
          )}
        </div>

        <div className="result-bottom-action">
          <button
            className="result-primary-button"
            onClick={() => navigate("/dashboard")}
          >
            ↻ Try Another Quiz
          </button>
        </div>
      </section>
    </main>
  );
}

export default Result;