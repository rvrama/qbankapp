import { useState } from 'react';
import classes from './Timer.module.css';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';

const Timer = props => {
    const [HH, setHour] = useState(0); 
    const [MM, setMin] = useState(0); 
    const [SS, setSeconds] = useState(0); 
    const [MS, setMilliSeconds] = useState(0);

       setTimeout(() => {
            if (MM >=59){
                setMin(0);
                setHour(HH + 1);
            }
            if (SS >=59){
                setSeconds(0);
                setMin(MM + 1);
            }
            else{
                setSeconds(SS + 1);
                setMilliSeconds(MS + 1000);
            }
        },1000);

        props.OnSetTimeSpent(MS);

    const convertedTime = (props.availableTime) ? ((props.availableTime/1000)/60) : 'NA';
    if (props.availableTime < MS) {
        props.onTimeOut();
    }

    return (
        <div className={classes.Timer}>
            <div className={classes.Info}>Time available to complete the test is {convertedTime} minutes</div>
           <div className={classes.Time}>Time : {HH < 10 ? '0'+ HH : HH}:{MM < 10 ? '0' + MM : MM}:{SS < 10 ? '0' + SS : SS}</div>
        </div>
    );
}

// const mapStateToProps = state => {
//     return {
//         closeTimer : state.question.closeTimer,
//         timeSpent : state.question.timeSpent
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        OnSetTimeSpent : (ms) => dispatch(actions.setTimeSpent(ms))
    }
}

export default connect(null, mapDispatchToProps) (Timer);