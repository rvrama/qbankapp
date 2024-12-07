
import axios from 'axios';
import * as actionTypes from './actionType';

export const updateSelectedValue = (selectedValue) => {
    return {
        type: actionTypes.UPDATE_RESULTS_WITH_SELECTION,
        selected : selectedValue
    }
}
export const loadQuestionsFailed = (err) => {
    return {
        type: actionTypes.LOAD_QUESTIONS_FAILED,
        results : [],
        questionList : null,
        error : err
    }
}

export const loadQuestionsSuccess = (data, grpId) => {
    console.log("Load Question Success - "+ data);
    let filteredData = data; //data.filter(f => f.groupId === grpId);
    filteredData = (filteredData.length > 0) ? filteredData :null;
    return {
        type:actionTypes.LOAD_QUESTIONS_SUCCESS,
        questionList : filteredData
    }
}

export const loadGroupsFailed = (err) => {
    return {
        type: actionTypes.LOAD_GROUPS_FAILED,
        results : [],
        questionList : null,
        error : err,
        groupsList : null
    }
}

export const loadGroupsSuccess = (data) => {
    console.log(data);
    return {
        type:actionTypes.LOAD_GROUPS_SUCCESS,
        groupsList : data

    }
}

export const setSelectedGroupId = (groupId) => {
    return {
        type:actionTypes.STORE_GROUP_SELECTED,
        selectedGroupId : groupId

    }
}


export const loadQuestions = (grpId) => {
    return dispatch => {
        axios.get("http://localhost:5031/api/questionsList",
                    { 
                        // // headers: { 
                        // //             "Authorization": localStorage.getItem("token") 
                        // //         }
                        })
        .then(resp => {
            console.log("Load questions "+resp.data);
            dispatch(loadQuestionsSuccess(resp.data, grpId));  //until we pass this in URL to filter in API itself
            })
        .catch(err => {
            dispatch(loadQuestionsFailed(err));
        }); 
    }
}

export const loadGroups = () => {
    return dispatch => {
        axios.get("http://localhost:5031/api/Group")
        .then(resp => {
            console.log ("loading groups " +resp);
            dispatch(loadGroupsSuccess(resp.data));
            })
        .catch(err => {
            dispatch(loadGroupsFailed(err));
        }); 
    }
}

export const addResults = (results) => {
    return {
        type:actionTypes.ADD_RESULTS,
        results : results
    }
}

export const updateResults = (results) => {
    
    return {
        type:actionTypes.UPDATE_RESULTS,
        results : results
    }
}

export const showResults = () => {
    return {
        type: actionTypes.SET_SHOWRESULTS_FLAG,
        showResult : true
    }
}

export const cancelShowResults = () => {
    return {
        type: actionTypes.RESET_SHOWRESULTS_FLAG,
        showResult : false
    }
}


export const setPrevButtonClickFlag = () => {
    return {
        type: actionTypes.SET_PREV_BUTTON_CLICKED,
        isPrevButtonClicked : true
    }
}


export const resetPrevButtonClickFlag = () => {
    return {
        type: actionTypes.RESET_PREV_BUTTON_CLICKED,
        isPrevButtonClicked : false
    }
}


export const setQuestionId = (id) => {
    return {
        type: actionTypes.CURRENT_QUESTION_ID,
        currentQuestionId : id
    }
}

export const resetResultsOnLoad = () => {
    return {
        type: actionTypes.RESET_RESULTS,
        results : []
    }
}

export const setTimeSpent = (ms) => {
    return {
        type: actionTypes.SET_TIMESPENT,
        timeSpent : ms
    }
}


//No need to reload the results or questions from localstorage upon refresh of page.
//by design SPA will refresh the state on refresh of page.  Ideally I should store the results in database and retrieve it
// which I am not doing here for now..

// export const setDefaults = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             dispatch(loadQuestionsFailed("Question Reload failed. Login!!!"));
//         } else {
//             const expirationDate = new Date(localStorage.getItem('expirationDate'));
//             if (expirationDate <= new Date()) {
//                 dispatch(loadQuestionsFailed("Question Reload failed. Token Expired.  Login Again."));
//             } else {
//                 const results = localStorage.getItem('results');
//                 //const questionList = localStorage.getItem('questions');
//                 dispatch(loadQuestions());
//                 dispatch(updateResults(results));
//                 //dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
//             }   
//         }
//     };
// };
