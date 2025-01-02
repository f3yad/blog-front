import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../../context/ReactContext";
import PageLabel from "../../components/PageLabel";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import classes from './PostViewPage.module.css'
import { NavLink, useParams } from "react-router";

export default function() {
  const ctx = useContext(ReactContext);
  const {postSlug} = useParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState([]); 

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError([]);
      const response = await ctx.api.getPostBySlug(postSlug);
      if (response.error) {
        setError(response.errorMsgs);
      } else {
  console.log(response);

        setPost(response);
      }
      setLoading(false);
    })()
  }, [])

  

  return (
    <div className={classes.layout}>
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? error.map(e => <ErrorState key={e} msg={e} />)
            : <div className={classes.postCont}>
                <div className={classes.imgCont}>
                  <img src={post.image} />
                </div>
                <h1 className={classes.postTitle}>{post.title}</h1>
                {
                  post && post.user && post.category && 
                  <div className={classes.textCont}>
                    <div className={classes.postInfoCont}>Date: <span className={classes.postInfo}>{new Date(post.createdAt).toLocaleDateString("tr")}</span> </div>
                    <div className={classes.postInfoCont}>in the category <NavLink to={`/category/${post.category.slug}`} className={`${classes.navLink} ${classes.postInfo}`}>{post.category.name}</NavLink> </div>
                    <div className={classes.postInfoCont}>by <NavLink to={`/author/${post.user.username}`} className={`${classes.navLink} ${classes.postInfo}`}>@{post.user.username} ({post.user.name})</NavLink> </div>
                  </div>
                }

                <pre className={classes.blogPost}>
                  {post.text}
                </pre>
              </div>
        }
      </div>
  );
}