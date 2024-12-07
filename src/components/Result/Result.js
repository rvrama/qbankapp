import React from 'react';
import classes from './Result.module.css';
import QuestionResult from './../../containers/QuesionResult/QuestionResult';
import Button from './../UI/Button/Button';

const result = (props) => {

    let resultOutput;

    if ((props.showResults && props.selectedGroupIdCombination === props.groupId+props.id)){
        resultOutput = <QuestionResult
                            key={Math.random()}
                            results={props.result}
                            questionList={props.questionList}
                            /> 
    }
    else{
            resultOutput='';
    }

    return (
    <div>
    <div className={classes.Result}>
        <div>Attempt Id : {props.attemptId}</div>
        <div>Score: {props.score}</div>
        <div>Time taken: {(((props.timeSpent)/1000)/60).toFixed(2)} minutes</div>
        <div>
          <Button 
          btnType={(props.showResults && props.selectedGroupIdCombination === props.groupId+props.id) ? 'Danger' : 'Success'}
          clicked={props.showClicked}>
              {(props.showResults && props.selectedGroupIdCombination === props.groupId+props.id) ? 'Hide Results' : 'Show Results'}</Button>
        </div>
    </div>
    <div>
        {resultOutput}
    </div>
    </div>
    );
}

export default result;