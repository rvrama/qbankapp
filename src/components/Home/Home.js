import React, { useState } from 'react';
import Groups from '../Groups/Groups';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Modal from './../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';

//class Home extends Component {                    
  const Home = (props) => {

  const [showerror,setShowerror] = useState(false); 
  let navigate = useNavigate();

  const CloseErrorModal = () => {
    setShowerror(false);
  }

  const OnGroupItemClicked = (grpId) => {
    console.log(grpId);
    console.log(props.isAuthenticated);
      if (props.isAuthenticated){
        props.OnSetSelectedGroupId(grpId);
        //set the group name selected in the store
        //for now pass in query param
        navigate('/question');
      }
      else{
        setShowerror(true);
        }
      }

    
      let output;

      if (showerror){
        output =  (<Modal show={showerror} modalClosed={CloseErrorModal}>
          Please Log in.
          </Modal>);
      }
      else{
        output = (<div>
                    <div>
                        <Groups isAuthenticated={props.isAuthenticated}
                                groupClicked={(grpId) => OnGroupItemClicked(grpId)}
                                  />
                    </div>
                </div>);
      }
    
    
    return (output);
    
}
const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
  
  
const mapDispatchToProps = dispatch => {
  return {
      OnSetSelectedGroupId : (grpId) => dispatch(actions.setSelectedGroupId(grpId))
  };
};

export default  (connect(mapStateToProps, mapDispatchToProps) (Home));
//export default useNavigate (connect(mapStateToProps, mapDispatchToProps) (Home));