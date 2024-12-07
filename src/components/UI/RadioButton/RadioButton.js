import React from 'react';
import classes from './RadioButton.module.css';

const radioButton = (props) => {
    const selectedData = props.prevSelectedData;
    const choiceId = props.choiceid;

    let check = (<div className={classes.RadioButtonChoices}>
                    <input type="radio" 
                    key={'R' + props.choiceid} 
                    name={'R' + props.name}
                    value={props.choiceid} 
                    onClick={props.selected}
                    />
                    <span>{props.choiceid}. </span>
                    <span>{props.optionText}</span>
                    </div>);

    if (selectedData && (Number(selectedData) === Number(choiceId))) {
        check = (<div className={classes.RadioButtonChoices}>
            <input type="radio" 
            key={'R' + props.choiceid} 
            name={'R' + props.name}
            value={props.choiceid}
            checked 
            onClick={props.selected}
            />
            <span>{props.choiceid}. </span>
            <span>{props.optionText}</span>
            </div>);
    }
    return check;
}

export default radioButton;
