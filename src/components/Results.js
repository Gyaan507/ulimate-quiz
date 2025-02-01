function Results({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getAchievement = () => {
    if (percentage >= 80) return "🏆 Quiz Master!"
    if (percentage >= 60) return "🎉 Knowledge Enthusiast!"
    if (percentage >= 40) return "📚 Eager Learner!"
    return "🌱 Knowledge Seeker!"
  }

  return (
    <div className="results">
      <h2>Quiz Completed!</h2>
      <p className="score-display">
        Your Score: {score} out of {totalQuestions}
      </p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="percentage">{percentage}%</p>
      <p className="achievement">{getAchievement()}</p>
      <button onClick={onRestart}>Try Again</button>
    </div>
  )
}

export default Results

