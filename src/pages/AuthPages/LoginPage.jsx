import { Outlet } from 'react-router';
import classes from './Page.module.css'
import Button from '../../components/Button';
import { useContext, useState } from 'react';
import { ReactContext } from '../../context/ReactContext';
import ErrorState from '../../components/ErrorState';

export default function() {
  const ctx = useContext(ReactContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  async function login() {
    setLoading(true);
    setError([]);
    const response = await ctx.api.login(username, password);
    if (response.error) {
      setError(response.errorMsgs);
    } else {
      ctx.saveUser(response)
    }
    setLoading(false);
  }

  return (
    <form className={classes.form}>
      {error.length > 0 && error.map(e => <ErrorState key={e} msg={e} />)}

      <h1 className={classes.formTitle}>Blog System</h1>
      <h1 className={classes.formTitle}>Login</h1>

      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="username">Username:</label>
        <input className={classes.formInput} id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="password">Password:</label>
        <input className={classes.formInput} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <Button label={loading ? "Loading ..." : "Login"} type="Action" disabled={loading} onClick={login}/>
      </div>
    </form>
  );
}