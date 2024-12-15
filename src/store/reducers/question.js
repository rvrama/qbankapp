
import * as actionTypes from '../actions/actionType';
import { updateObject } from '../../shared/utility';


const initialState = {
    questionId : 1,
    selected: "0",
    showResult : false,
    results : [],
    questionList : null,
    groupsList : null,
    error : null,
    isPrevButtonClicked : false,
    selectedGroupId : null,
    timeSpent:0
};

const updateQuestionId = (state, action) => {
    return updateObject( state, {questionId : action.currentQuestionId});
}

const setPrevButtonClickFlag = (state, action) => {
    return updateObject( state, {isPrevButtonClicked : action.isPrevButtonClicked});
}

const resetPrevButtonClickFlag = (state, action) => {
    return updateObject( state, {isPrevButtonClicked : action.isPrevButtonClicked});
}

const setShowResultFlag = (state, action) => {
    return updateObject( state, {showResult : action.showResult});
}


const resetShowResultFlag = (state, action) => {
    return updateObject( state, {showResult : action.showResult});
}

const updateResultsWithSelection = ( state, action ) => {
    return updateObject( state, { selected: action.selected } );
};

const loadQuestionsSuccess = (state, action) => {
    return updateObject( state, { 
        questionList: action.questionList
     } );
};

const loadQuestionsFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        results : action.results,
        questionList : action.questionList
    });
};

const loadGroupsSuccess = (state, action) => {
    return updateObject( state, { 
        groupsList: action.groupsList
     } );
};

const loadGroupsFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        groupsList : action.groupsList
    });
};


const addResults = (state, action) => {
    console.log(state.results);
    return updateObject(state, { results: action.results })
};

const updateResults = (state, action) => {
    return updateObject(state, { results: action.results })
}

const resetResults = (state, action) => {
    return updateObject(state, { results: action.results })
}

const setSelectedGroupId = (state, action) => {
    return updateObject(state, { selectedGroupId: action.selectedGroupId })
}

const setTimeSpent = (state, action) => {
    return updateObject(state, {timeSpent: action.timeSpent})
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_RESULTS_WITH_SELECTION: return updateResultsWithSelection(state, action);
        case actionTypes.LOAD_QUESTIONS_SUCCESS: return loadQuestionsSuccess(state, action);
        case actionTypes.LOAD_QUESTIONS_FAILED: return loadQuestionsFail(state, action);
        case actionTypes.LOAD_GROUPS_SUCCESS: return loadGroupsSuccess(state, action);
        case actionTypes.LOAD_GROUPS_FAILED: return loadGroupsFail(state, action);
        case actionTypes.ADD_RESULTS: return addResults(state, action);
        case actionTypes.UPDATE_RESULTS: return updateResults(state,action);
        case actionTypes.SET_SHOWRESULTS_FLAG : return setShowResultFlag(state, action);
        case actionTypes.RESET_SHOWRESULTS_FLAG : return resetShowResultFlag(state, action);
        case actionTypes.SET_PREV_BUTTON_CLICKED : return setPrevButtonClickFlag(state, action);
        case actionTypes.RESET_PREV_BUTTON_CLICKED : return resetPrevButtonClickFlag(state, action);
        case actionTypes.CURRENT_QUESTION_ID : return updateQuestionId(state, action);
        case actionTypes.RESET_RESULTS : return resetResults(state, action);
        case actionTypes.STORE_GROUP_SELECTED : return setSelectedGroupId(state, action);
        case actionTypes.SET_TIMESPENT : return setTimeSpent(state, action);
        default:
            return state;
    }
};

export default reducer;