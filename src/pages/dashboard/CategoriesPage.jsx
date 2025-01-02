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

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState(''); 
  const [slug, setSlug] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [actionError, setActionError] = useState([]); 
  
  

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError([]);
      const response = await ctx.api.getAllCategories();
      if (response.error) {
        setError(response.errorMsgs);
      } else {
        setCategories(response);
      }
      setLoading(false);
    })();
  }, [refresh])

  async function deleteAction(id) {
    setActionLoading(true);
    const response = await ctx.api.deleteCategory(ctx.user.token, id);
    if (response.error) {
      setError(response.errorMsgs);
    } else {
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function createCategory() {
    setActionLoading(true);
    const response = await ctx.api.createCategory(ctx.user.token, name, slug);
    if (response.error) {
      setActionError(response.errorMsgs);
    } else {
      setOpenCreateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function updateCategory() {
    setActionLoading(true);
    const response = await ctx.api.updateCategory(ctx.user.token, updateId, name, slug);
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
    setSlug('');
    setActionError([]);
    setUpdateId('');
  }

  function prepareUpdate(id, name, slug) {
    setName(name);
    setSlug(slug);
    setUpdateId(id);
    setOpenUpdateOverlay(true);
  }

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="CATEGORIES" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? error.map(e => <ErrorState key={e} msg={e} />)
            : <>
                <div>
                  <Button label="+ Create New Category" type="Action" disabled={actionLoading} onClick={() => setOpenCreateOverlay(true)} />
                </div>
                <table className={classes.table}>
                  <thead className={classes.tableHeadRow}>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th className={classes.buttonColumn}>Update</th>
                      <th className={classes.buttonColumn}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map(item => <tr key={item._id} className={classes.tableDataRow}>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td><Button label="Update" type="Update" disabled={actionLoading} onClick={() => prepareUpdate(item._id, item.name, item.slug)}/></td>
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

          <h1 className={classes.formTitle}>Create Category</h1>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="name">Name:</label>
            <input className={classes.formInput} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="slug">Slug:</label>
            <input className={classes.formInput} id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "Loading ..." : "Create"} type="Action" disabled={actionLoading} onClick={createCategory}/>
            <Button label={actionLoading ? "Loading ..." : "Cancel"} type="Action" disabled={actionLoading} onClick={() => {setOpenCreateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>

      <div className={openUpdateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && actionError.map(e => <ErrorState key={e} msg={e} />)}

          <h1 className={classes.formTitle}>Update Category</h1>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="name">Name:</label>
            <input className={classes.formInput} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="slug">Slug:</label>
            <input className={classes.formInput} id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "Loading ..." : "Update"} type="Action" disabled={actionLoading} onClick={updateCategory}/>
            <Button label={actionLoading ? "Loading ..." : "Cancel"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}