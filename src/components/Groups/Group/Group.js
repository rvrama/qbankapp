import React from 'react';
import classes from './Group.module.css';


const group = (props) => {

    let cssClassName;
    let labelAttempts;

    switch(props.attempts)
    {
        case "0" : 
                cssClassName = classes.NotAttempted;
                labelAttempts=<span className={classes.NoLabelAttempts}>0 TRIES</span> 
                break;
        case "1" : 
                cssClassName = classes.AttemptedOnce; 
                labelAttempts=<span className={classes.OnceLabelAttempts}>1 TRY</span>
                break;
        case "Max" : 
                cssClassName = classes.MaxAttempted; 
                labelAttempts=<span className={classes.MaxLabelAttempts}>MAX TRIED</span>
                break;
        case "NA" : 
                cssClassName = classes.NoQuestions;
                labelAttempts=<span className={classes.NoQuestionsLabel}>NOT open</span>
        break;

        default : cssClassName = '';  //should not reach here
    }

    let grp;

    grp = (<div>
                <div onClick={(props.attempts === "NA" || props.attempts === "MAX") ? null : props.click} className={classes.GroupName}>
                    {props.groupName} {props.countByGroup ? '('+ props.countByGroup + ')' : ''}
                </div>
                <div className={classes.GroupSummary}>{props.groupSummary}</div>
            </div>);
    return (
        <div className={cssClassName}>
            {labelAttempts}
            {grp}
        </div>
    );
}

export default group;