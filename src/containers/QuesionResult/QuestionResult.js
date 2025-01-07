import React, { Component } from 'react';
import classes from './QuestionResult.module.css'
import { connect } from 'react-redux';
import QuestionResultRender from '../../components/RenderSupport/QuestionResultRender';

class QuestionResult extends Component {

    setResultMessage = (result, questionsCount) => {
        const res = result;
        const objisCorrect = res.filter(f => (f.answer === f.selected));
        const message = "You have " + objisCorrect.length
            + " correct answer(s).  You have "
            + "scored " + ((objisCorrect.length / questionsCount) * 100).toFixed(1) + "% ";
        return message;
    }

    //(choiceType, index, f.answerChoiceId, qIndex, result[qIndex], result[qIndex].selected);
    setChoices = (choiceType, 
                    index, 
                    answerChoiceId, 
                    qIndex, 
                    currentQtnResultObj, 
                    currentResultSelection,
                    choiceObj) => {
        let choices;

        if (choiceType === 1) {
            if ((index + 1) === Number(answerChoiceId)) {
                if (currentQtnResultObj && ((index + 1) === Number(currentResultSelection))) {
                    choices = (
                        <div className={classes.Answer}>
                            <input type="radio"
                                key={'R' + qIndex + index}
                                defaultChecked />
                            {choiceObj}
                        </div>
                    );
                }
                else {
                    choices = (
                        <div className={classes.Answer}>
                            <input type="radio"
                                key={'R' + qIndex + index}
                            />
                            {choiceObj}
                        </div>
                    );
                }

            }
            else {
                if (currentQtnResultObj && ((index + 1) === Number(currentResultSelection))) {
                    choices = (
                        <div className={classes.WrongAnswer}>
                            <input type="radio" key={'R' + qIndex + index} defaultChecked />{choiceObj}
                        </div>
                    );
                }
                else {
                    choices = (
                        <div className={classes.Choices}>
                            <input type="radio" key={'R' + qIndex + index} />{choiceObj}
                        </div>
                    );
                }

            }
        }
        else if (choiceType === 2) {

            const rowId = Number(index) + 1;

            //if (answerChoiceId.includes(rowId)) {
                if (answerChoiceId === rowId) {
                if (currentQtnResultObj && currentResultSelection.includes(rowId)) {
                    choices = (
                        <div className={classes.Answer}>
                            <input type="checkbox" key={'C' + qIndex + index} defaultChecked />{choiceObj}
                        </div>
                    );
                }
                else {
                    choices = (
                        <div className={classes.Answer}>
                            <input type="checkbox" key={'C' + qIndex + index} />{choiceObj}
                        </div>
                    );
                }
            }
            else {
                if (currentQtnResultObj && currentResultSelection.includes(rowId)) {
                    choices = (
                        <div className={classes.WrongAnswer}>
                            <input type="checkbox" key={'C' + qIndex + index} defaultChecked />{choiceObj}</div>
                    );
                }
                else {
                    choices = (
                        <div className={classes.Choices}>
                            <input type="checkbox" key={'C' + qIndex + index} />{choiceObj}</div>
                    );

                }
            }
        }
        return choices;
    }



    render() {
        
        if (this.props.isAuthenticated) {
            let ctr = 0;
            let questionList = '';
            let options = '';
            let questions = this.props.questionList;
            let result = this.props.results;
            console.log(questions);
            if (questions) {
                questionList = questions.map((f, qIndex) => {

                    const choiceType = f.choiceType;
                    const optionsList = f.choices.split(',');

                    options = optionsList.map((choiceObj, index) => {

                        let choices = '';

                        choices = this.setChoices(choiceType, 
                                                    index, 
                                                    f.answerChoiceId, 
                                                    qIndex, 
                                                    result[qIndex], 
                                                    result[qIndex].selected,
                                                    choiceObj);
                        return choices;
                    });

                    ctr = ctr + 1;

                    return (<QuestionResultRender 
                                key={ctr}
                                questionId={ctr}
                                questionTxt={f.questionTxt}
                                optionsTxt={options}/>);

                })
            }

            const message = this.setResultMessage(result, (questions) ? questions.length : 0);

            return (
                <div className={classes.Displaybar}>
                    <h1 className={classes.Msg}>{message}</h1>
                    {questionList}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
     //   results: state.question.results,//
     //   questionList: state.question.questionList,//
    };
};


export default connect(mapStateToProps, null)(QuestionResult);