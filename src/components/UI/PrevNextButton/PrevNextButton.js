import React from 'react';
import classes from './PrevNextButton.module.css';

const prevNextButton = (props) => {
    let output;
    if (props.shouldShowPrevBtn) {
        output = <div className={classes.Placeholder}>
            <button className={classes.Btn} onClick={props.prevButtonClick}>Previous</button>
            <button className={classes.Btn} onClick={props.nextButtonClick}>Next</button>
        </div>;

    }
    else {
        output = <div className={classes.Placeholder}>
            <button className={classes.Btn} onClick={props.nextButtonClick}>Next</button>
        </div>;
    }
    return output;
}

export default prevNextButton;
