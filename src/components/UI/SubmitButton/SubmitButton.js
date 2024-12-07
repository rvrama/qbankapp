import React from 'react';
import classes from './SubmitButton.module.css';

const submitButton = (props) => {
    return (
        <div className={classes.Placeholder}>
            <button className={classes.Btn} onClick={props.click}>{props.children}</button>
        </div>);    
}

export default submitButton;
