import React from 'react';
import classes from './QuestionContentRender.module.css';

const questionContentRender = (props) => {

    return (
            <div className={classes.Displaybar}>
            <div className={classes.Navbar}>{props.summary}</div>
            <div className={classes.Screenbar}>
            {props.errorMsg}
            {props.question}
            <div style={{padding:'10px 10px 10px 10px', color:'white'}}> Choices are :</div>
            <div>
            {props.options}
            </div>
            <div>
            {props.showButtons}
            </div>
            </div>   
            </div>
    );
}

export default questionContentRender;