import axios from 'axios';
import * as actionTypes from './actionType';
import  * as URLS from './../../urls';

export const loadResults = (userId) => {
    return dispatch => {
        const queryParams = '?userId=' + userId;
        axios.get(URLS.GET_RESULT_API + queryParams)
        .then(resp => {
            //const fetchedResults = resp.data;
           const fetchedResults = [];
            for ( let key in resp.data ) {
                fetchedResults.push( {
                    ...resp.data[key],
                    id: key
                } );
            }
                // fetchedResults.push( 
                //      resp.data
                // )
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
            score:Number(score)
        };
        console.log("before calling post results " + resultData.results);

        const url = URLS.POST_RESULT_API;        
        axios.post(url, resultData)
            .then(response => {
                   dispatch(storeResultsSuccess(response));
            })
            .catch(err => {
                dispatch(storeResultsFailed(err));
            });
    };
};

