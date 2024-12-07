import axios from 'axios';
import * as actionTypes from './actionType';

export const loadResults = (userId) => {
    return dispatch => {
        const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
        axios.get("https://qbresults-479ad-default-rtdb.firebaseio.com/results.json"+ queryParams)
        .then(resp => {
            const fetchedResults = [];
            for ( let key in resp.data ) {
                fetchedResults.push( {
                    ...resp.data[key],
                    id: key
                } );
            }
            dispatch(loadResultsSuccess(fetchedResults));
            })
        .catch(err => {
            dispatch(loadResultsFailed(err));
        }); 
    }
}

export const loadResultsFailed = (err) => {
    return {
        type: actionTypes.LOAD_RESULTS_FAILED,
        resultData : null,
        error : err
    }
}

export const loadResultsSuccess = (data) => {
    return {
        type:actionTypes.LOAD_RESULTS_SUCCESS,
        resultData : data
    }
}

export const storeResultsFailed = (err) => {
    return {
        type: actionTypes.STORE_RESULTS_FAILED,
        resultData : null,
        error : err
    }
}

export const storeResultsSuccess = (data) => {
    return {
        type:actionTypes.STORE_RESULTS_SUCCESS
        //TODO : in future get the data which return the key id of the created results record in firebase
        //to inform user the id of the results created.
    }
}
 
export const storeResults = (userId, groupId, attemptResults, timeSpent, score) => {
    
    return dispatch => {
        const resultData = {
            userId: userId,
            groupId: groupId,
            results: attemptResults, // should be an array containing attemptId, score, resultsArray
            timeSpent : timeSpent,
            score:score
        };

        const url = "https://qbresults-479ad-default-rtdb.firebaseio.com/results.json";        
        axios.post(url, resultData)
            .then(response => {
                   dispatch(storeResultsSuccess(response));
            })
            .catch(err => {
                dispatch(storeResultsFailed(err));
            });
    };
};

