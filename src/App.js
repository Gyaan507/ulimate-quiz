import { useState, useEffect } from "react"
import StartQuiz from "./components/StartQuiz"
import Question from "./components/Question"
import Results from "./components/Results"
import { fetchQuizData } from "./utils/api"
import { fallbackQuizData } from "./utils/fallbackData"
import "./App.css"

function App() {
  const [quizData, setQuizData] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData()
        setQuizData(data)
      } catch (err) {
        console.error("Error in loadQuizData:", err)
        setError(err.message || "An unknown error occurred")
        setQuizData(fallbackQuizData)
      } finally {
        setLoading(false)
      }
    }

    loadQuizData()
  }, [])

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
  }

  const handleAnswer = (selectedAnswer) => {
    if (quizData && currentQuestion < quizData.questions.length) {
      if (selectedAnswer === quizData.questions[currentQuestion].correctAnswer) {
        setScore(score + 1)
      }

      if (currentQuestion === quizData.questions.length - 1) {
        setShowResults(true)
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }
  }

  if (loading) {
    return <div className="loading">Preparing your quiz challenge...</div>
  }

  return (
    <div className="app">
      <h1>Ultimate Quiz Challenge</h1>
      {error && <div className="error">Error: {error}. Using backup questions.</div>}
      {!quizStarted && <StartQuiz onStart={startQuiz} />}
      {quizStarted && !showResults && quizData && (
        <>
          <div className="score-display">Current Score: {score}</div>
          <Question
            question={quizData.questions[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion + 1}
            totalQuestions={quizData.questions.length}
          />
        </>
      )}
      {showResults && (
        <Results score={score} totalQuestions={quizData ? quizData.questions.length : 0} onRestart={startQuiz} />
      )}
    </div>
  )
}

export default App

