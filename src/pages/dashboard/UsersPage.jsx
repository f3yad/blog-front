import { useContext, useEffect, useState } from 'react';
import classes from './Page.module.css'
import { ReactContext } from '../../context/ReactContext';
import PageLabel from '../../components/PageLabel';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import Button from '../../components/Button';

export default function() {
  const ctx = useContext(ReactContext);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState([]); 
  
  const [openCreateOverlay, setOpenCreateOverlay] = useState(false); 
  const [openUpdateOverlay, setOpenUpdateOverlay] = useState(false); 
  const [actionLoading, setActionLoading] = useState(false); 
  const [refresh, setRefresh] = useState(0); 

  const [users, setUsers] = useState([]);

  const [name, setName] = useState(''); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [actionError, setActionError] = useState([]); 
  
  

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError([]);
      const response = await ctx.api.getAllUsers(ctx.user.token);
      if (response.error) {
        setError(response.errorMsgs);
      } else {
        setUsers(response);
      }
      setLoading(false);
    })();
  }, [refresh])

  async function deleteAction(id) {
    setActionLoading(true);
    const response = await ctx.api.deleteUser(ctx.user.token, id);
    if (response.error) {
      setError(response.errorMsgs);
    } else {
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function createUser() {
    setActionLoading(true);
    const response = await ctx.api.createUser(ctx.user.token, name, username, password, isAdmin);
    if (response.error) {
      setActionError(response.errorMsgs);
    } else {
      setOpenCreateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function updateUser() {
    setActionLoading(true);
    const response = await ctx.api.updateUser(ctx.user.token, updateId, name, password, isAdmin);
    if (response.error) {
      setActionError(response.errorMsgs);
    } else {
      setOpenUpdateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  function clearActionForm() {
    setName('');
    setUsername('');
    setPassword('');
    setIsAdmin(false);
    setActionError([]);
    setUpdateId('');
  }

  function prepareUpdate(id, name, isAdmin) {
    setName(name);
    setPassword('');
    setIsAdmin(isAdmin);
    setUpdateId(id);
    setOpenUpdateOverlay(true);
  }

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="USERS" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? error.map(e => <ErrorState key={e} msg={e} />)
            : <>
                <div>
                  <Button label="+ Create New User" type="Action" disabled={actionLoading} onClick={() => setOpenCreateOverlay(true)} />
                </div>
                <table className={classes.table}>
                  <thead className={classes.tableHeadRow}>
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Is Admin</th>
                      <th className={classes.buttonColumn}>Update</th>
                      <th className={classes.buttonColumn}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map(item => <tr key={item._id} className={classes.tableDataRow}>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.isAdmin ? "Yes" : "No"}</td>
                        <td><Button label="Update" type="Update" disabled={actionLoading} onClick={() => prepareUpdate(item._id, item.name, item.isAdmin)}/></td>
                        <td><Button label="Delete" type="Delete" disabled={actionLoading} onClick={() => deleteAction(item._id)}/></td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </>
        }
      </div>

      <div className={openCreateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && actionError.map(e => <ErrorState key={e} msg={e} />)}

          <h1 className={classes.formTitle}>Create User</h1>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="name">Name:</label>
            <input className={classes.formInput} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="username">Username:</label>
            <input className={classes.formInput} id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="password">Password:</label>
            <input className={classes.formInput} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="isAdmin">
              <input className={classes.formInput} type="checkbox" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
              Admin
            </label>
          </div>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "Loading ..." : "Create"} type="Action" disabled={actionLoading} onClick={createUser}/>
            <Button label={actionLoading ? "Loading ..." : "Cancel"} type="Action" disabled={actionLoading} onClick={() => {setOpenCreateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>

      <div className={openUpdateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && actionError.map(e => <ErrorState key={e} msg={e} />)}

          <h1 className={classes.formTitle}>Update User</h1>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="name">Name:</label>
            <input className={classes.formInput} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="password">Password:</label>
            <input className={classes.formInput} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <label className={classes.formLabel} htmlFor="isAdmin">
            <input className={classes.formInput} type="checkbox" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            Admin
          </label>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "Loading ..." : "Update"} type="Action" disabled={actionLoading} onClick={updateUser}/>
            <Button label={actionLoading ? "Loading ..." : "Cancel"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}