
import { useMemo } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import categories from "../data/categories";
import "../styles/Dashboard.css";

function Dashboard() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const userKey = currentUser?.id || currentUser?.email || "guest";

  const history = useMemo(() => {
    try {
      const allHistory = JSON.parse(
        localStorage.getItem("quizArenaHistory") || "[]"
      );

      return allHistory
        .filter((attempt) => attempt.userKey === userKey)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch {
      return [];
    }
  }, [userKey]);

  const totalAttempts = history.length;

  const bestScore = history.reduce(
    (best, attempt) => Math.max(best, attempt.score || 0),
    0
  );

  const averageScore =
    totalAttempts > 0
      ? Math.round(
          history.reduce(
            (total, attempt) => total + (attempt.percentage || 0),
            0
          ) / totalAttempts
        )
      : 0;

  const firstName =
    currentUser?.name?.trim().split(/\s+/)[0] || "Champion";

  return (
    <div className="dashboard-page">
      <main className="dashboard-main">
        <section className="dashboard-welcome">
          <div className="dashboard-welcome-content">
            <span className="dashboard-eyebrow">
              YOUR PERSONAL COMMAND CENTER
            </span>

            <h1>
              Hey, {firstName} <span className="wave-emoji">👋</span>
            </h1>

            <p>
              Ready to challenge yourself? Choose a category and
              make your next attempt count.
            </p>

            <a href="#quiz-categories" className="dashboard-start-button">
              Explore Challenges <span>→</span>
            </a>
          </div>

          <div className="dashboard-welcome-art">
            <div className="dashboard-art-circle">
              <span>🏆</span>
            </div>
            <div className="dashboard-art-spark spark-one">✦</div>
            <div className="dashboard-art-spark spark-two">✧</div>
          </div>
        </section>

        <section className="dashboard-stats">
          <article className="stat-card">
            <div className="stat-icon stat-purple">🎮</div>
            <div>
              <p>Total Attempts</p>
              <h2>{totalAttempts}</h2>
              <span>Quizzes completed</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon stat-yellow">🏆</div>
            <div>
              <p>Best Score</p>
              <h2>{bestScore}</h2>
              <span>Correct answers</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon stat-blue">📈</div>
            <div>
              <p>Average Result</p>
              <h2>{averageScore}%</h2>
              <span>Across your attempts</span>
            </div>
          </article>
        </section>

        <section className="dashboard-categories" id="quiz-categories">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-eyebrow">SELECT YOUR MISSION</span>
              <h2>Choose Your Challenge</h2>
              <p>Pick a topic and put your knowledge to the test.</p>
            </div>

            <span className="category-count">
              {categories.length} Categories
            </span>
          </div>

          <div className="dashboard-category-grid">
            {categories.map((category, index) => (
              <QuizCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="dashboard-history">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-eyebrow">YOUR JOURNEY</span>
              <h2>Recent Quiz History</h2>
              <p>Keep track of your progress and celebrate improvement.</p>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="history-empty">
              <div className="history-empty-icon">📚</div>
              <h3>Your journey starts here!</h3>
              <p>
                You haven't completed any quizzes yet. Take your first
                challenge and your results will appear here.
              </p>
              <a href="#quiz-categories" className="history-empty-button">
                Start Your First Quiz
              </a>
            </div>
          ) : (
            <div className="history-table-wrapper">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Quiz Category</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {history.slice(0, 10).map((attempt) => (
                    <tr key={attempt.id}>
                      <td>{attempt.categoryName}</td>
                      <td>
                        {attempt.score}/{attempt.totalQuestions}
                      </td>
                      <td>
                        <span className="history-percentage">
                          {attempt.percentage}%
                        </span>
                      </td>
                      <td>
                        {new Date(attempt.date).toLocaleDateString()}
                      </td>
                      <td>
                        <Link
                          to={`/result/${attempt.id}`}
                          className="history-review-link"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

