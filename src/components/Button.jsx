import NavigationComponent from "./NavigationComponent";
import classes from './Button.module.css';

export default function({label, type, disabled, onClick}) {

  return (
    <button className={classes.button} data-type={type} onClick={onClick} disabled={disabled} type="button">
      {label}
    </button>
  );
}