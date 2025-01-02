import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../../context/ReactContext";
import PageLabel from "../../components/PageLabel";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import classes from './Page.module.css'
import PostCard from "../../components/PostCard";

export default function() {
  const ctx = useContext(ReactContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState([]); 

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError([]);

      const response = await ctx.api.getAllPublicPosts();
      if (response.error) {
        setError(response.errorMsgs);
      } else {
        setPosts(response);
      }
      setLoading(false);
    })()
  }, [])

  return (
    <div className={classes.layout}>
        <PageLabel label="ALL POSTS" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? error.map(e => <ErrorState key={e} msg={e} />)
            : <>
                {posts.map(p => 
                  <PostCard key={p._id} post={p} />
                )}
              </>
        }
      </div>
  );
}