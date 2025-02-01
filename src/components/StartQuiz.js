function StartQuiz({ onStart }) {
  return (
    <div className="start-quiz">
      <h2>Welcome to the Ultimate Quiz Challenge!</h2>
      <p>Test your knowledge and compete for the top score. Are you ready?</p>
      <button onClick={onStart}>Start the Challenge</button>
    </div>
  )
}

export default StartQuiz

