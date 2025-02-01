import { useState, useEffect } from "react"

function Question({ question, onAnswer, currentQuestion, totalQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft])

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true)
      setTimeout(() => {
        onAnswer(selectedAnswer)
        setSelectedAnswer(null)
        setShowFeedback(false)
        setTimeLeft(30)
      }, 1500)
    }
  }

  return (
    <div className="question">
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}></div>
        </div>
        <div className="timer">Time left: {timeLeft}s</div>
      </div>
      <h2>
        Question {currentQuestion} of {totalQuestions}
      </h2>
      <p>{question.question}</p>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option ${selectedAnswer === index ? "selected" : ""}`}
            onClick={() => setSelectedAnswer(index)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={selectedAnswer === null || showFeedback}>
        Submit Answer
      </button>
      {showFeedback && (
        <div className={`feedback ${selectedAnswer === question.correctAnswer ? "correct show" : "incorrect show"}`}>
          {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect!"}
        </div>
      )}
    </div>
  )
}

export default Question

