import React from 'react';
import classes from './SummaryBar.module.css'

const summaryBar = (props) => {
 let summary = <div onClick={props.click}>{props.quesLink}</div>;

    if (props.click){
        summary =  (<div className={classes.Breadcrumb} onClick={props.click}>{props.quesLink}</div>);
    }

    return summary;
}

export default summaryBar;
