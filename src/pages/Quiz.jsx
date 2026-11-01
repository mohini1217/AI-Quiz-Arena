import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import categories from "../data/categories";
import quizData from "../data/quizData";
import "../styles/Quiz.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = categories.find((item) => item.id === categoryId);
  const questions = quizData[categoryId] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const finishQuiz = useCallback(
    (finalAnswers) => {
      if (finished || !category || questions.length === 0) {
        return;
      }

      setFinished(true);

      const score = questions.reduce((total, question, index) => {
        return (
          total +
          (finalAnswers[index] === question.correctAnswer ? 1 : 0)
        );
      }, 0);

      let currentUser = null;

      try {
        currentUser = JSON.parse(
          localStorage.getItem("currentUser") || "null"
        );
      } catch (error) {
        console.error("Could not read current user:", error);
      }

      const token = localStorage.getItem("token");

      const attempt = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userKey: currentUser?.id || currentUser?.email || "guest",
        categoryId: category.id,
        categoryName: category.name,
        score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        date: new Date().toISOString(),

        answers: questions.map((question, index) => ({
          questionId: question.id,
          question: question.question,
          options: question.options,
          selectedAnswer:
            finalAnswers[index] === undefined
              ? null
              : finalAnswers[index],
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        })),
      };

      try {
        const history = JSON.parse(
          localStorage.getItem("quizArenaHistory") || "[]"
        );

        history.push(attempt);

        localStorage.setItem(
          "quizArenaHistory",
          JSON.stringify(history)
        );

        localStorage.setItem(
          "quizArenaLatestResult",
          JSON.stringify(attempt)
        );
      } catch (error) {
        console.error("Local result saving failed:", error);

        setFinished(false);

        alert(
          "Your result could not be saved. Please check your browser storage."
        );

        return;
      }

      navigate(`/result/${attempt.id}`, { replace: true });

      if (!token) {
        console.warn(
          "MongoDB save skipped: no login token was found. The result is saved locally."
        );
        return;
      }

      fetch(`${API_URL}/api/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          attemptId: attempt.id,
          categoryId: attempt.categoryId,
          categoryName: attempt.categoryName,
          score: attempt.score,
          totalQuestions: attempt.totalQuestions,
          date: attempt.date,
          answers: attempt.answers,
        }),
      })
        .then(async (response) => {
          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            console.error(
              "MongoDB result saving failed:",
              response.status,
              data.message || "Unknown server error",
              data
            );
            return;
          }

          console.log(
            "Quiz result saved to MongoDB successfully:",
            data
          );
        })
        .catch((error) => {
          console.error(
            "MongoDB connection error:",
            error.message
          );
        });
    },
    [category, questions, navigate, finished]
  );

  useEffect(() => {
    if (!category || questions.length === 0) {
      navigate("/dashboard", { replace: true });
    }
  }, [category, questions.length, navigate]);

  if (!category || !currentQuestion) {
    return null;
  }

  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex);

    setAnswers((previous) => ({
      ...previous,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    const updatedAnswers = {
      ...answers,
    };

    if (selectedOption !== null) {
      updatedAnswers[currentIndex] = selectedOption;
    }

    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex === questions.length - 1) {
      finishQuiz(updatedAnswers);
    } else {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  const handleTimeUp = () => {
    const updatedAnswers = {
      ...answers,
    };

    if (selectedOption !== null) {
      updatedAnswers[currentIndex] = selectedOption;
    }

    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex === questions.length - 1) {
      finishQuiz(updatedAnswers);
    } else {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-page">
      <main className="quiz-main">
        <div className="quiz-topbar">
          <button
            type="button"
            className="quiz-back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>

          <div className="quiz-category-label">
            <span>{category.icon}</span>
            {category.name}
          </div>
        </div>

        <section className="quiz-container">
          <div className="quiz-progress-header">
            <div>
              <span className="quiz-overline">YOUR CHALLENGE</span>
              <h1>Test Your Knowledge</h1>
            </div>

            <div className="quiz-question-counter">
              <strong>{currentIndex + 1}</strong>
              <span>/ {questions.length}</span>
            </div>
          </div>

          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <Timer
            key={`${categoryId}-${currentQuestion.id}-${currentIndex}`}
            questionKey={`${categoryId}-${currentQuestion.id}-${currentIndex}`}
            duration={30}
            onTimeUp={handleTimeUp}
          />

          <div className="quiz-question-section">
            <span className="quiz-question-number">
              QUESTION {String(currentIndex + 1).padStart(2, "0")}
            </span>

            <h2>{currentQuestion.question}</h2>

            <p className="quiz-select-hint">
              Choose the correct answer from the options below.
            </p>

            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  type="button"
                  key={`${currentQuestion.id}-${index}`}
                  className={`quiz-option ${
                    selectedOption === index ? "selected" : ""
                  }`}
                  onClick={() => handleSelectOption(index)}
                  aria-pressed={selectedOption === index}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="option-text">{option}</span>

                  <span className="option-indicator">
                    {selectedOption === index ? "✓" : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-footer">
            <span className="quiz-footer-note">
              ⚡ Stay focused. Your time is running!
            </span>

            <button
              type="button"
              className="quiz-next-button"
              onClick={handleNextQuestion}
              disabled={selectedOption === null || finished}
            >
              {currentIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
              <span>→</span>
            </button>
          </div>
        </section>

        <p className="quiz-bottom-note">
          Your answers will be reviewed at the end of the challenge.
        </p>
      </main>
    </div>
  );
}

export default Quiz;