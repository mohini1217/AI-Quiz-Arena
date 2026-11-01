
import { Link } from "react-router-dom";
import categories from "../data/categories";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="status-dot"></span>
              YOUR KNOWLEDGE. YOUR ARENA.
            </div>

            <h1>
              Challenge Your
              <br />
              Mind. <span>Level Up.</span>
            </h1>

            <p className="hero-description">
              Enter the world of AI, Machine Learning, Python and Data
              Science. Test your skills, beat the clock and become a
              knowledge champion.
            </p>

            <div className="hero-buttons">
              <Link to="/signup" className="primary-button">
                Start Your Journey <span>→</span>
              </Link>

              <a href="#categories" className="secondary-button">
                Explore Quizzes
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>4</strong>
                <span>Quiz Categories</span>
              </div>

              <div>
                <strong>20</strong>
                <span>Starter Questions</span>
              </div>

              <div>
                <strong>30s</strong>
                <span>Per Question</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="hero-glow"></div>

            <div className="floating-card floating-card-top">
              <span>🧠</span>
              <div>
                <strong>Brain Power</strong>
                <small>Unlock your potential</small>
              </div>
            </div>

            <div className="hero-center-card">
              <div className="hero-center-icon">⚡</div>
              <h2>QUIZ ARENA</h2>
              <p>READY TO PLAY?</p>

              <div className="hero-center-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span>🏆</span>
              <div>
                <strong>New Challenge</strong>
                <small>Your next victory awaits</small>
              </div>
            </div>

            <div className="floating-symbol symbol-one">✦</div>
            <div className="floating-symbol symbol-two">+</div>
            <div className="floating-symbol symbol-three">✧</div>
          </div>
        </section>

        <section className="categories-section" id="categories">
          <div className="section-heading">
            <span className="section-eyebrow">PICK YOUR CHALLENGE</span>

            <h2>
              Choose Your <span>Battlefield</span>
            </h2>

            <p>
              Four exciting categories. Countless opportunities to learn.
            </p>
          </div>

          <div className="home-category-grid">
            {categories.map((category, index) => (
              <article
                key={category.id}
                className={`home-category-card category-${category.color}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="home-category-icon">{category.icon}</div>

                <span className="category-level">
                  {category.difficulty}
                </span>

                <h3>{category.name}</h3>
                <p>{category.description}</p>

                <Link
                  to="/signup"
                  className="category-explore-link"
                >
                  Explore Category <span>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <span className="section-eyebrow">WHY QUIZ ARENA?</span>
            <h2>
              Learning Made <span>Exciting</span>
            </h2>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <span>⏱️</span>
              <h3>Beat the Clock</h3>
              <p>
                Answer questions within 30 seconds and challenge your
                speed along with your knowledge.
              </p>
            </article>

            <article className="feature-card">
              <span>🎯</span>
              <h3>Learn from Mistakes</h3>
              <p>
                Discover the correct answers and read explanations
                after completing your quiz.
              </p>
            </article>

            <article className="feature-card">
              <span>🏆</span>
              <h3>Track Your Progress</h3>
              <p>
                Review previous attempts, monitor your scores and
                aim for a new personal best.
              </p>
            </article>
          </div>
        </section>

        <section className="home-cta">
          <div>
            <span className="section-eyebrow">YOUR NEXT CHALLENGE</span>
            <h2>Ready to prove yourself?</h2>
            <p>Your next high score starts with one click.</p>
          </div>

          <Link to="/signup" className="primary-button">
            Enter the Arena <span>→</span>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Home;

