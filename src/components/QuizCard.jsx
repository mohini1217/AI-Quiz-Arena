import { useNavigate } from "react-router-dom";

function QuizCard({ category, index = 0 }) {
  const navigate = useNavigate();

  if (!category) return null;

  const handleStartQuiz = () => {
    navigate(`/quiz/${category.id}`);
  };

  return (
    <article
      className={`quiz-card quiz-card-${category.color || "purple"}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="quiz-card-top">
        <div className="quiz-card-icon">{category.icon}</div>

        <span className="quiz-card-badge">
          {category.difficulty || "Beginner"}
        </span>
      </div>

      <div className="quiz-card-content">
        <h3>{category.name}</h3>

        <p>
          {category.description ||
            "Test your knowledge and improve your skills."}
        </p>
      </div>

      <div className="quiz-card-info">
        <span>📝 {category.totalQuestions || 5} Questions</span>
        <span>⏱️ 30 sec/question</span>
      </div>

      <button
        type="button"
        className="quiz-card-button"
        onClick={handleStartQuiz}
      >
        Start Challenge <span>→</span>
      </button>
    </article>
  );
}

export default QuizCard;