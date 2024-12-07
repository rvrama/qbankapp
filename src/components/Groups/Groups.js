import React, { useEffect } from 'react';
import classes from './Groups.module.css';
import Group from './Group/Group';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../../store/actions/index';

const MAX_ATTEMPTS = 2;

const Groups = (props) => {
    const { OnLoadGroups, OnLoadResultsOnMount, userId } = props;

    useEffect(() => {
        OnLoadResultsOnMount(userId);
        OnLoadGroups();
    },[OnLoadGroups, OnLoadResultsOnMount, userId]);

    let groupDetails;

    if (props.groupsList){

        groupDetails = props.groupsList.map((grp,index) => {
            
            const filterResults = (props.userResults && props.userResults.length > 0) ? props.userResults.filter((f,index) => f.groupId === grp.id) : null;
            const filterResultsLength = (filterResults) ? filterResults.length : 0;

            let groupsInfo; 
            //hack - change the below logic 'filterResultsLength >=0 to > 0 once results are working fine
           if (filterResultsLength >= 0 && filterResultsLength < MAX_ATTEMPTS)  //1 more attempt available
           {
            groupsInfo =  <Group 
                key={grp.id}
                groupName={grp.groupName} 
                countByGroup= {grp.countByGroup} //{props.isAuthenticated ? grp.QuestionsCount : null}
                groupSummary={grp.groupSummary}
                attempts="1"  //show groups in green
                click={(grpName) => props.groupClicked(grp.id)}/>    
            }
            else if (filterResultsLength >= MAX_ATTEMPTS) {  //all attempts exhausted
                groupsInfo =  <Group 
                key={grp.id}
                groupName={grp.groupName} 
                countByGroup= {grp.countByGroup}//{props.isAuthenticated ? grp.QuestionsCount  : null}
                groupSummary={grp.groupSummary}
                attempts="Max" //show groups in coral
                />    
            }
            else if (filterResultsLength === 0) {  //no attempts made
                console.log(grp.id);
                groupsInfo =  <Group 
                key={grp.id}
                groupName={grp.groupName} 
                countByGroup= {grp.countByGroup} //{props.isAuthenticated ?  grp.QuestionsCount  : null}
                groupSummary={grp.groupSummary}
                attempts={grp.QuestionsCount ? "0" : "NA"} //show groups in darkslategrey
                click={(opt) => props.groupClicked(grp.id)}/>        
            }
            return groupsInfo;
        });
    }
    else{
        groupDetails =<div><h5>{props.error ? props.error.message : ''}</h5><span>. Group details not available. Check after some time!!!</span></div>
    }

    return (
        <div className={classes.Groups}>
            {groupDetails}
        </div>
    );
   }

const mapStateToProps = state => {
    return {
        groupsList: state.question.groupsList,
        error : state.question.error,
        userId: state.auth.userId,
        userResults : state.result.results,
        //questionList : state.question.questionList,
        //groupId : state.question.selectedGroupId        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        OnLoadGroups: () => dispatch(actions.loadGroups()),
        OnSetSelectedGroupId : (grpId) => dispatch(actions.setSelectedGroupId(grpId)),
        OnLoadResultsOnMount : (userId) => dispatch(actions.loadResults(userId))
    };
};
export default (connect(mapStateToProps, mapDispatchToProps) (Groups));  
//export default (connect(mapStateToProps, mapDispatchToProps) (useNavigate(Groups)));  
//withRouter is not requird but kept it to show the way we can use connect and withRouter :)