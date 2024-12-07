import React from 'react';

import QBLogo from '../../assets/images/QBLogo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={QBLogo} alt="Question Bank" />
    </div>
);

export default logo;