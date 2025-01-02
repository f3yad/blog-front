import classes from './Container.module.css';

export default function({children, className}) {  
  return (
    <div className={`${className} ${classes.cont}`}>
      {children}
    </div>
  );
}