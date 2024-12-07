import React from 'react';
import RadioOption from '../UI/RadioButton/RadioButton';
import CheckBoxOption from '../UI/CheckBox/CheckBox';

const choices = (props) => {

    const options = props.optionsList.map((o,index) => {
        
            let choices = null;
            switch (props.choiceType){
                case 1:
                    choices = (<RadioOption 
                        choiceid = {index+1}
                        name={props.questionId}
                        key = {index}
                        optionText = {o}
                        selected = {props.OptionSelected}
                        answer = {props.answerChoiceId}
                        prevSelectedData = {props.prevSelectedData}
                    />);
                    break;
                case 2:
                    choices = (<CheckBoxOption 
                        choiceid = {index+1}
                        key = {index}
                        optionText = {o}
                        selected = {props.OptionSelected}
                        answer = {props.answerChoiceId}
                        prevSelectedData = {props.prevSelectedData}
                        />);
                    break;
                default : choices = null;
                }
                return choices;
             }
            );     
            return options;
        }
        


export default choices;