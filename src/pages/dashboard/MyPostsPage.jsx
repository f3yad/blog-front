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
 
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [title, setTitle] = useState(''); 
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [category, setCategory] = useState(''); 
  
  const [imageFile, setImageFile] = useState(null);
  const [updateId, setUpdateId] = useState('');
  const [actionError, setActionError] = useState([]);

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError([]);

      const response = await ctx.api.getAllPosts();
      if (response.error) {
        setError(response.errorMsgs);
      } else {
        setPosts(response.filter(p => p.user._id == ctx.user._id));
        const categoriesResponse = await ctx.api.getAllCategories();
        if (categoriesResponse.error) {
          setError(categoriesResponse.errorMsgs);
        } else {
          setCategories(categoriesResponse);
          setCategory(categoriesResponse[0]._id);
        }
      }
      setLoading(false);
    })();
  }, [refresh])

  useEffect(() => {
    if (imageFile) {
      const fr = new FileReader();
      fr.onload = function () {
        setImage(fr.result);
      }
      fr.readAsDataURL(imageFile);
      }
  }, [imageFile])

  async function deleteAction(id) {
    setActionLoading(true);
    const response = await ctx.api.deletePost(ctx.user.token, id);
    if (response.error) {
      setError(response.errorMsgs);
    } else {
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function createPost() {
    setActionLoading(true);
    const response = await ctx.api.createPost(ctx.user.token, title, text, imageFile, slug, isPublic, category);
    if (response.error) {
      setActionError(response.errorMsgs);
    } else {
      setOpenCreateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function updatePost() {
    setActionLoading(true);
    const response = await ctx.api.updatePost(ctx.user.token, updateId, title, text, imageFile, slug, isPublic, category);
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
    setTitle("");
    setText("");
    setImage("");
    setSlug("");
    setIsPublic(false);
    setCategory(categories[0]._id);
    
    setActionError([]);
    setUpdateId('');
  }

  function prepareUpdate(id, title, text, image, slug, isPublic, category) {
    setUpdateId(id);
    setTitle(title);
    setText(text);
    setImage(image);
    setSlug(slug);
    setIsPublic(isPublic);
    setCategory(category);
    
    setOpenUpdateOverlay(true);
  }

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="MY POSTS" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? error.map(e => <ErrorState key={e} msg={e} />)
            : <>
                <div>
                  <Button label="+ Create New Post" type="Action" disabled={actionLoading} onClick={() => setOpenCreateOverlay(true)} />
                </div>
                <table className={classes.table}>
                  <thead className={classes.tableHeadRow}>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Is Public</th>
                      <th>Author</th>
                      <th>Views</th>
                      <th className={classes.buttonColumn}>Update</th>
                      <th className={classes.buttonColumn}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      posts.map(item => <tr key={item._id} className={classes.tableDataRow}>
                        <td>{item.title}</td>
                        <td>{categories.filter(c => c._id == item.category)[0].name}</td>
                        <td>{item.isPublic ? "Yes" : "No"}</td>
                        <td>{item.user.name}</td>
                        <td>{item.views}</td>
                        <td><Button label="Update" type="Update" disabled={actionLoading} onClick={() => prepareUpdate(item._id, item.title, item.text, item.image, item.slug, item.isPublic, item.category)}/></td>
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

          <h1 className={classes.formTitle}>Create Post</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="image">
              <img className={classes.image} src={image || "https://placehold.co/600x400?text=BlogImage"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="image" name="image" onChange={(e) => e.target.files.length > 0 && setImageFile(e.target.files[0])} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="title">Title:</label>
            <input className={classes.formInput} id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="text">Text:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="slug">Slug:</label>
            <input className={classes.formInput} id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="category">Category:</label>
            <select className={classes.formInput} id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="isPublic">
              <input className={classes.formInput} type="checkbox" id="isPublic" name="isPublic" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
              Public
            </label>
          </div>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "Loading ..." : "Create"} type="Action" disabled={actionLoading} onClick={createPost}/>
            <Button label={actionLoading ? "Loading ..." : "Cancel"} type="Action" disabled={actionLoading} onClick={() => {setOpenCreateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>

      <div className={openUpdateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && actionError.map(e => <ErrorState key={e} msg={e} />)}

          <h1 className={classes.formTitle}>Update Post</h1>

          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="image">
              <img className={classes.image} src={image || "https://placehold.co/600x400?text=BlogImage"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="image" name="image" onChange={(e) => e.target.files.length > 0 && setImageFile(e.target.files[0])} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="title">Title:</label>
            <input className={classes.formInput} id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="text">Text:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="slug">Slug:</label>
            <input className={classes.formInput} id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="category">Category:</label>
            <select className={classes.formInput} id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="isPublic">
              <input className={classes.formInput} type="checkbox" id="isPublic" name="isPublic" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
              Public
            </label>
          </div>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "Loading ..." : "Update"} type="Action" disabled={actionLoading} onClick={updatePost}/>
            <Button label={actionLoading ? "Loading ..." : "Cancel"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}