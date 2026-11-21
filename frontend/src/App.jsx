import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Homepage

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-page">

      <h1>COMPETITIVE EXAM PORTAL</h1>

      <p>
        Welcome to the Competitive Exam Aptitude Preparation Portal.
      </p>

      <p>
        Prepare for SSC and TNPSC examinations through aptitude practice.
      </p>

      <button onClick={() => navigate("/dashboard")}>
        CLICK HERE
      </button>

    </div>
  );
}


// Main Dashboard

function Dashboard() {

  const navigate = useNavigate();

  return (

    <div className="dashboard">

      <header className="header">

        <h2>COMPETITIVE EXAM PORTAL</h2>

        <span>Aptitude Preparation</span>

      </header>


      <div className="main-layout">

        {/* Sidebar */}

        <aside className="sidebar">

          <h3>MENU</h3>

          <button onClick={() => navigate("/dashboard")}>
            Home
          </button>

          <button onClick={() => navigate("/quiz/ssc")}>
            SSC
          </button>

          <button onClick={() => navigate("/quiz/tnpsc")}>
            TNPSC
          </button>

          <button onClick={() => navigate("/")}>
            Logout
          </button>

        </aside>


        {/* Centre Content */}

        <main className="centre-content">

          <h1>Welcome to Aptitude Preparation</h1>

          <p>Select your competitive examination.</p>

          <div className="exam-container">

            <div className="exam-card">

              <h2>SSC</h2>

              <p>Staff Selection Commission</p>

              <button onClick={() => navigate("/quiz/ssc")}>
                Start Practice
              </button>

            </div>


            <div className="exam-card">

              <h2>TNPSC</h2>

              <p>Tamil Nadu Public Service Commission</p>

              <button onClick={() => navigate("/quiz/tnpsc")}>
                Start Practice
              </button>

            </div>

          </div>

        </main>

      </div>


      <footer className="footer">

        <p>© 2026 Competitive Exam Portal | All Rights Reserved</p>

      </footer>

    </div>
  );
}


// Quiz Component

function Quiz({ exam }) {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`http://localhost:5000/api/questions/${exam}`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.log("Error fetching questions:", error);
      });

  }, [exam]);


  function selectAnswer(questionId, option) {

    setAnswers({
      ...answers,
      [questionId]: option
    });

  }


  function submitQuiz() {

    let total = 0;

    questions.forEach(question => {

      if (answers[question._id] === question.answer) {
        total++;
      }

    });

    setScore(total);

  }


  return (

    <div className="quiz-page">

      <header className="header">

        <h2>{exam.toUpperCase()} APTITUDE QUIZ</h2>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

      </header>


      <main className="quiz-content">

        <h1>{exam.toUpperCase()} Practice Questions</h1>

        {questions.length === 0 && (
          <p>Loading questions...</p>
        )}


        {questions.map((question, index) => (

          <div className="question-card" key={question._id}>

            <h3>
              {index + 1}. {question.question}
            </h3>

            {question.options.map((option, i) => (

              <label key={i} className="option">

                <input
                  type="radio"
                  name={question._id}
                  value={option}
                  checked={answers[question._id] === option}
                  onChange={() => selectAnswer(question._id, option)}
                  disabled={score !== null}
                />

                {option}

              </label>

            ))}

          </div>

        ))}


        {questions.length > 0 && score === null && (

          <button className="submit-btn" onClick={submitQuiz}>
            Submit Quiz
          </button>

        )}


        {score !== null && (

          <div className="result-box">

            <h2>Your Result</h2>

            <h3>
              Score: {score} / {questions.length}
            </h3>

            <button onClick={() => window.location.reload()}>
              Retry Quiz
            </button>

          </div>

        )}

      </main>

      <footer className="footer">
        <p>Competitive Exam Portal</p>
      </footer>

    </div>

  );

}


// Application Routing

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/quiz/ssc"
          element={<Quiz exam="ssc" />}
        />

        <Route
          path="/quiz/tnpsc"
          element={<Quiz exam="tnpsc" />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;