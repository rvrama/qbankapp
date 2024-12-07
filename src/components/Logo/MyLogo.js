import classes from './MyLogo.module.css';

const myLogo = () => {

    return (
        <div className={classes.Container}>
    <div className={classes.Top}></div>
    <div className={classes.Middle}>
    <div className={classes.Left}></div>
    <div className={classes.Right}></div>
    </div>
    <div className={classes.Base}>
    <div className={classes.Bottom}></div>
    <div className={classes.Tail}></div>
    </div>
    </div>
    );
}
export default myLogo;