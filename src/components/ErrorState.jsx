import classes from './ErrorState.module.css';

export default function({msg}) {
  return (
    <div className={classes.error}>
      {msg}
    </div>
  );
}