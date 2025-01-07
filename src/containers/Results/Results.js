import React, { Component } from 'react';
import classes from './Results.module.css';
import * as actions from './../../store/actions/index';
import { connect } from 'react-redux';
import Result from './../../components/Result/Result';

class Results extends Component {
    state = {
        showResults:false,
        result:null,
        questionList:null,
        groupMixId:0
    }

    componentDidMount() {
        this.props.OnLoadResultsOnMount(this.props.userId);
    }

    ShowResults(groupId, id) {
        this.props.OnLoadQuestions(groupId);
        this.setState(prevState => { 
                        return {
                                showResults : !prevState.showResults
                                }; 
                            });
        const choosenResult = this.props.userResults; //.filter(f => (f.GroupId === groupId && f.id === id))
        console.log("Result state from Result in ShowResults button click " + choosenResult[0].results)
        this.setState({result:choosenResult[0].results});
        this.setState({groupMixId: groupId+id});
    }

    render() {
        let resultsToShow;
        let finalResults;
        let groupInfo;
        let filteredUserResults;


       if (this.props.userResults && this.props.groupsList){
                //go through the master lookup list of groups
                finalResults = this.props.groupsList.map(grpObj => {
                    //filter the group data from userResults to show the result by Group
                    // this.props.userResults.map((res,index) => {
                    //     console.log(" Group - " + res.groupId + " " + grpObj.GroupName + " Id " + res[index].id 
                    //         + " timespent "+res[index].timeSpent+ " score " + res[index].score
                    //         + " result " + this.state.result[index] + " showresults " +this.state.showResults[index]);
                    // })
                    
                   filteredUserResults = this.props.userResults.filter(f=> f.groupId === grpObj.id);            
                   
                   if (filteredUserResults && filteredUserResults.length > 0){
                        
                        groupInfo = (
                                    <div className={classes.GroupName}>
                                    <div>Group : {grpObj.groupName}</div>
                                    </div>)
                        
                        resultsToShow = filteredUserResults.map((res,index) => {
                     
                                return (
                                    <Result 
                                        key={res.id}
                                        showClicked={() => this.ShowResults(res.groupId, res.id)}
                                        groupId={res.groupId}
                                        id={res.id}
                                        attemptId={index+1}
                                        timeSpent = {res.timeSpent}
                                        score={res.score}
                                        showResults={this.state.showResults}
                                        result={this.state.result}
                                        questionList={this.props.questionList}
                                        selectedGroupIdCombination={this.state.groupMixId}/>
                                    )
                                });
                           }
                            else{
                                groupInfo='';
                                resultsToShow='';
                            }
                            return (
                                <div className={classes.GroupBlock}>
                                    {groupInfo} 
                                    {resultsToShow}
                                </div>
                            );
                        });
        }
        return (<div className={classes.Results}>
                    {finalResults}
                </div>);
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId,
        userResults : state.result.results,
        questionList : state.question.questionList,
        groupsList: state.question.groupsList    
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //this method is not used now.. still keeping it :)
        OnLoadResultsOnMount : (userId) => dispatch(actions.loadResults(userId)),
        OnLoadQuestions : (grpId) => dispatch(actions.loadQuestions(grpId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Results);