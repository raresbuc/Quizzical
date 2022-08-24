import React from "react"

export default function Question(props) {
    const answers = props.possibleAnswers.map(answer => {
        let styles
        let click

        if(props.endGame) {
            if(props.selectedAnswer === props.correctAnswer) {
                styles = {backgroundColor: props.selectedAnswer === answer ? '#94D7A2' : '#F5F7FB'}
            }
            else {
                styles = {backgroundColor: props.selectedAnswer === answer ? '#F8BCBC' : answer === props.correctAnswer ? '#94D7A2' : '#F5F7FB' 
                }
            }
        }
        else {
            styles = {backgroundColor: props.selectedAnswer === answer ? "#D6DBF5" : "#F5F7FB"}
            click = () => props.setSelectedAnswer(props.id, answer)
        }

        return <div>
                    <button className="answers" key={answer} style={styles} onClick={click}>
                        {answer}
                    </button>
               </div>
    })


    return (
        <div className="question-block">
            <h3 className="question">{props.question}</h3>

            <div className="answer-block">
                {answers}
            </div>
        </div>
    )
}