import React, { useEffect, useState } from 'react'
import classes from './Question.module.css';
import Choices from './../../components/Choices/Choices';
import PrevNextButton from '../../components/UI/PrevNextButton/PrevNextButton';
import SubmitButton from '../../components/UI/SubmitButton/SubmitButton';
import SummaryBar from '../../components/UI/SummaryBar/SummaryBar';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import Spinner from './../../components/UI/Spinner/Spinner';
import QuestionRender from './../../components/RenderSupport/QuestionRender';
import QuestionContentRender from '../../components/RenderSupport/QuestionContentRender';
import Bound from './../../hoc/Bound';
import Timer from './../../components/Timer/Timer';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions/index';

//class Question extends Component {
const Question = (props) => {

    const [message, setMessage] = useState('');
    const [timelapse, setTimelapse] = useState(false);
    //const [timeSpent, setTimeSpent] = useState(0); received in props
    
    const navigate = useNavigate();

    const QuestionPreviousHandler = () => {
        if (props.isAuthenticated) {
            props.OnSetPrevButtonClicked();
            let ctr = props.questionId - 1;
            setMessage("");
            props.OnSetQuestionId(ctr);
        }
        else {
            navigate("/");
        }
    }

    const QuestionNextHandler = () => {

        if (props.isAuthenticated) {

            if (!props.results.find(f => { return (f.id === props.questionId)}) )  //selection is not made already.  so no need to update the result array.
            {
                UpdateResults("0");
            }

            if (props.results[props.questionId]) {
                props.OnSetPrevButtonClicked();
            }
            else {
            //hack to clear the buttons
                document.getElementsByName( 'R' + props.questionId).forEach(f=> {f.checked = false});
                props.OnResetPrevButtonClicked();
            }

            let ctr = props.questionId + 1;
            setMessage("");
            props.OnSetQuestionId(ctr);
          
        }
        else {
          props.history.replace("/");
        }

    }


    const CheckSelectedUtil = (selectedValues, currentSelection) => {
        let concatenatedSelection;
        let selectedArray = selectedValues.split(',');

        const isExistingSelectionIndex = selectedArray.findIndex((val) => val === currentSelection);

        if (isExistingSelectionIndex >= 0) {
            selectedArray = selectedArray.slice(0, isExistingSelectionIndex)
                          .concat(selectedArray.slice(isExistingSelectionIndex+1));
        }
        else {
            selectedArray.push(currentSelection);
        }
 
        concatenatedSelection = selectedArray.join(',');

        return concatenatedSelection;
        //used to check two arrays
        // const array2Sorted = selectedArray.slice().sort();
        // const isArrayEqual = answerArray.length === selectedArray.length && answerArray.slice().sort().every((value, index) => {
        // return (value === array2Sorted[index]);
        // });

        // return isArrayEqual;
    }
 
    const OptionSelected = (event) => {
      UpdateResults(event.target.value);
      props.OnUpdateSelectedValue(event.target.value);
        
    }
        
    const UpdateResults = (selectedValue) => {
        const selectedChoiceIndex = selectedValue;
        const choiceButtonType = props.questionList[props.questionId - 1].choiceType;

        let arr = [];

        if (props.results.length > 0){
            arr = [...props.results];
           const updateResultArrObj = arr.find(f => (f.id === props.questionId));
            if (updateResultArrObj){
                (choiceButtonType === "1") 
                    ? updateResultArrObj.selected = selectedChoiceIndex 
                    : (updateResultArrObj.selected === "" || !updateResultArrObj.selected) ?
                            updateResultArrObj.selected = selectedChoiceIndex
                            : updateResultArrObj.selected = CheckSelectedUtil(updateResultArrObj.selected,
                                                            selectedChoiceIndex);

                arr.splice(props.questionId - 1, 1, updateResultArrObj);
              props.OnUpdateResults(arr);
            }
            else{
                arr.push({id:props.questionId, 
                        answer:props.questionList[props.questionId - 1].answerChoiceId, 
                        selected : selectedChoiceIndex});
                props.OnAddResults(arr);
            }
        }
        else{
            arr.push({id:props.questionId, 
                answer:props.questionList[props.questionId - 1].answerChoiceId, 
                selected : selectedChoiceIndex});
            props.OnAddResults(arr);
        }

    }
  
    const NavButtonClickHandler = (id) => {
        if (props.isAuthenticated) {
            props.OnSetPrevButtonClicked();
            props.OnSetQuestionId(id);
        }
        else {
            props.history.replace("/");
        }
    }


    const SubmitButtonClickHandler = () => {
               
        const [, score] = setResultMessage(props.results, props.questionList.length);

        //store the results in the backend
        props.OnStoreResultsOnSubmit(props.userId, 
                                        props.selectedGroupId, 
                                        props.results,
                                        props.timeSpent,
                                        score);
        props.OnShowResults();
    }
    
    useEffect (()=> {
        setTimelapse(false); 
        props.OnResetResultsOnLoad();
        props.OnSetQuestionId(1); //to reset the ctr to 1 so that the Questions will appear from begining if user choose Question Nav from Results page or anywhere.
        props.OnLoadQuestions(props.selectedGroupId);        
    },[]);

    const setResultMessage = (result, questionsCount) => {
        const res = result;
        const objIsCorrect = res.filter(f => (f.answer === f.selected));
        const score = ((objIsCorrect.length/questionsCount)*100).toFixed(1);

        return [objIsCorrect, Number(score)]; 
    }

    const cancelShowResultHandler = () => {
        props.OnCancelShowResults();
    }

    const cancelTimerHandler= () => {
        setTimelapse(false);
        navigate("/");
    }
  
    const ShowResultViewHandler = () => {
        props.OnCancelShowResults();
        navigate("/result");
    }

    const TimerRanOver = (props) => {
        setTimelapse(true);
    }

        let errorMsg;

        if (props.isAuthenticated) { //loggedIn
          if (!timelapse) {
                let showButtons;
                if (props.showResult){
                    const res = [...props.results];

                    const [objIsCorrect, score] = setResultMessage(res, (props.questionList) ? props.questionList.length : 0);

                    const message = "You have " + objIsCorrect.length + " correct answer(s).  You have "
                                    + "scored " + score + "% ";

                    return (
                        <Modal show={props.showResult} modalClosed={cancelShowResultHandler}>
                            <h1 style={{backgroundColor:'coral'}}>Results</h1>
                            <h3>{message}</h3>
                            <h4>Do you want to see the details?</h4>
                            <Button btnType="Success" clicked={ShowResultViewHandler}>Show Result</Button>
                        </Modal>
                    );
                }
                else
                {
                    let options = '';
                    let question = <Spinner />;
                    let summary = "";

                    if (props.results.length >0){
                        
                        summary = props.results.map(o => {
                            const q = "Q" + o.id;
                            return (
                            <SummaryBar 
                            key={o.id} 
                            quesLink={q} 
                            click={() => NavButtonClickHandler(o.id)}/>
                            );
                        })
                    }   
                    else{
                        summary = <SummaryBar  
                            quesLink="Quick Links"/>;
                    }

                    if (props.questionList){        
                        const currentQuestion = props.questionList[props.questionId - 1];
                        question = 
                        (
                            <QuestionRender
                                key={props.questionId} 
                                message={message} 
                                questionId={props.questionId} 
                                questionTxt={currentQuestion.questionTxt} />
                        );

                        let pSelected = null;
            
                        if (props.isPrevButtonClicked && props.results[props.questionId - 1]) {
                            pSelected = props.results[props.questionId - 1].selected;
                        }

                        options = (<div className={classes.Choices}>
                                    <Choices
                                        key={props.questionId}
                                        answerChoiceId={currentQuestion.answerChoiceId}
                                        OptionSelected= {(event) => OptionSelected(event)}
                                        optionsList = {currentQuestion.choices.split(',')}
                                        choiceType = {currentQuestion.choiceType}
                                        prevSelectedData = {pSelected}
                                        questionId = {props.questionId}
                                    />
                                    </div>); 
                    

                        showButtons = (<PrevNextButton shouldShowPrevBtn = {props.questionId > 1} prevButtonClick={QuestionPreviousHandler} 
                            nextButtonClick={() => QuestionNextHandler()}
                            />);
                
                        if (props.questionId >= props.questionList.length){
                            showButtons = <SubmitButton 
                                            click={() => SubmitButtonClickHandler()}>Submit</SubmitButton>
                        }
                    }
                    return (
                        <Bound>
                            {/* Let us test the timer component after fixing other issues  */}
                        <Timer availableTime={(props.questionList) ? props.questionList.length*60000 : 60000} 
                                onTimeOut={TimerRanOver}
                                />
                        <QuestionContentRender 
                            summary={summary}
                            errorMsg={errorMsg}
                            question={question}
                            options={options}
                            showButtons={showButtons}/>
                        </Bound>
                    );
                }   
            }
            else {
                return (<Modal show={timelapse} modalClosed={cancelTimerHandler}>
                    <h2> Exhausted your time limit!!!.  Your test is not submitted.</h2>
                </Modal>);
            }
        }
      
    }
 
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        userId: state.auth.userId,
        authRedirectPath: state.auth.authRedirectPath,

        questionError : state.question.error,       
        questionId :state.question.questionId,
        selected: state.question.selected,// Not used
        showResult : state.question.showResult,
        results : state.question.results,//
        questionList : state.question.questionList,//
        isPrevButtonClicked : state.question.isPrevButtonClicked,
        selectedGroupId : state.question.selectedGroupId,

        attempts : state.result.attempts,   
        
        timeSpent : state.question.timeSpent
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // method is not used now.. still keeping it :)
        OnUpdateSelectedValue : (selectedValue) => dispatch(actions.updateSelectedValue(selectedValue)),

        OnUpdateResults : (result) => dispatch(actions.updateResults(result)),
        OnAddResults : (result) => dispatch(actions.addResults(result)),
        OnLoadQuestions : (grpId) => dispatch(actions.loadQuestions(grpId)),
        OnShowResults : () => dispatch(actions.showResults()),
        OnCancelShowResults : () => dispatch(actions.cancelShowResults()),
        OnSetQuestionId : (id) => dispatch(actions.setQuestionId(id)),
        OnSetPrevButtonClicked : () => dispatch(actions.setPrevButtonClickFlag()),
        OnResetPrevButtonClicked : () => dispatch(actions.resetPrevButtonClickFlag()),
        OnResetResultsOnLoad : () => dispatch(actions.resetResultsOnLoad()),
        OnStoreResultsOnSubmit : (userId, groupId, attempts, timeSpent, score) => dispatch(actions.storeResults(userId, groupId, attempts, timeSpent, score)),
        // OnSubmissionSetCloseTimer : () => dispatch(actions.setCloseTimer()),
        // OnSubmissionResetCloseTimer : () => dispatch(actions.resetCloseTimer())

    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Question);

/* TODO
2. set key error in questionresult.
2. Add mustSelectCount to validate the number of selection by user & selected should be an array
4. Add grouping/change the API & do cleanup
5. simplify the question.js code by moving code to component
8. Show result page -- store it in db and return it.
*/