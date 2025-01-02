import classes from './PageLabel.module.css';

export default function({label}) {
  return <h1 className={classes.pageTitle}>{label}</h1>
}