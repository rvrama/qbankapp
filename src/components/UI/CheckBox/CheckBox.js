import React from 'react';
import classes from './CheckBox.module.css';

const checkBoxOption = (props) => {
    const selectedData = props.prevSelectedData;
    const choiceId = props.choiceid;

    let checkBoxOptions = (
        <div className={classes.CheckBoxChoices}>
            <input type="checkbox" 
            key={'C' + props.choiceid} 
            id={props.choiceid}
            value={props.choiceid} 
            onClick={props.selected}/>
            <span>{props.choiceid}. </span>
            <span>{props.optionText}</span>
        </div>);
    
    if (selectedData && selectedData.includes(choiceId)) {
        checkBoxOptions = (
            <div className={classes.CheckBoxChoices}>
                <input type="checkbox" 
                key={'C' + props.choiceid} 
                id={props.choiceid}
                value={props.choiceid} 
                checked
                onClick={props.selected}/>

                <span>{props.choiceid}. </span>
                <span>{props.optionText}</span>
            </div>);
        }

    return ( 
           checkBoxOptions
        );
}

export default checkBoxOption;