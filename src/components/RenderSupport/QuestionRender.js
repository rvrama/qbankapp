import React from 'react';
import classes from './QuestionRender.module.css';

const questionRender = (props) => {

    return(
        <div>
        <h1 className={classes.Msg}>{props.message}</h1>
        <div className={classes.Qtnscreen}>
        <div>
        <span className={classes.QtnTxt}> {props.questionId}. {props.questionTxt}</span>
        </div>
        </div>
        </div>
    );
}

export default questionRender;