import React from "react"
import Question from "./components/Question"

export default function App() {
  const [startQuiz, setStartQuiz ] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [newPage, setNewPage] = React.useState(false)
  const [endGame, setEndGame] = React.useState(false)

  // FETCH API + SETTING THE QUESTIONS DATA
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results.map(result => {
          return {
            question: result.question.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#039;/g, "'"),
            possibleAnswers: shuffleArray([...result.incorrect_answers, result.correct_answer]),
            correctAnswer: result.correct_answer,
            selectedAnswer: ""
          }
        }))
      })
  }, [newPage])


  React.useEffect (() => {
    if(endGame) {
      const reducedToCorrect = questions.reduce((prev, current) => {
        return current.correctAnswer === current.selectedAnswer ? prev + 1 : prev
      }, 0)
      setCorrectAnswers(reducedToCorrect)
    }
  })

  
  // START QUIZ BUTTON
  function startBtn() {
    setStartQuiz(prevState => !prevState)
  }

 // SHUFFLE FUNCTION
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
  }



  function setSelectedAnswer(id, answer) {
    setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        return question.question === id ? {...question, selectedAnswer: answer} : question
      })
    })
  }


  // CHECK ANSWERS + PLAY AGAIN BUTTONS
  function checkAnswers() {
    setEndGame(!endGame)
  }


  function playAgain() {
    setEndGame(false)
    setNewPage(!newPage)
  }


  // RENDER QUESTION DATA TO COMPONENT
  const questionElements = questions.map(question => {
    return <Question 
      {...question} 
      key = {question.question}
      id = {question.question}
      setSelectedAnswer = {setSelectedAnswer}
      endGame = {endGame}
      />
  })


  return (
    <main>
      {
        startQuiz 
        ?

        <section className="second-page">
          {questionElements}
          {
            endGame
            ?

            <div className="score-container">
              <h2 className="score">You scored {correctAnswers}/5 correct answers!</h2>
              <button className="check-answers" onClick={playAgain}>Play Again</button>
            </div>

            :

            <button className="check-answers" onClick={checkAnswers}>Check answers</button>
          }
        </section>
        
        :

        <section className="first-page">
          <h2>Quizzical</h2>
          <p>Do you have what it takes for the ultimate quiz test ?</p>

          <button className="start-quiz" onClick={startBtn}>
            Start quiz
          </button>
        </section>
      }
    </main>
  )
}