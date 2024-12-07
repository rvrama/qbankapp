import React from 'react';
import classes from './QuestionResultRender.module.css';

const questionResultRender = (props) => {

    return(
        <div className={classes.Qtnscreen}>
            <div>
                <span className={classes.QtnTxt}>{props.questionId}. {props.questionTxt}</span>
            </div>
            &nbsp;
            <div style={{ color: 'black' }}>Choices are :</div>
            <div>
                {props.optionsTxt}
            </div>
        </div>
    );
}

export default questionResultRender;