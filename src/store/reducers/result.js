import * as actionTypes from '../actions/actionType';
import { updateObject } from '../../shared/utility';

const initialState = {
    results : null,
    error : null
}

const loadResultsSuccess = (state, action) => {
    return updateObject(state, 
                { results: action.resultData });
}

const loadResultsFailed = (state, action) => {
    return updateObject(state, {error: action.err, results : action.resultData});
}

const storeResultsSuccess = (state, action) => {
    return updateObject(state, action);
}

const storeResultsFailed = (state, action) => {
    return updateObject(state, action)
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOAD_RESULTS_SUCCESS: return loadResultsSuccess(state, action);
        case actionTypes.LOAD_RESULTS_FAILED: return loadResultsFailed(state, action);
        case actionTypes.STORE_RESULTS_SUCCESS: return storeResultsSuccess(state, action);
        case actionTypes.STORE_RESULTS_FAILED: return storeResultsFailed(state, action);
        default:
            return state;
    }
};

export default reducer;