import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../../context/ReactContext";
import PageLabel from "../../components/PageLabel";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import classes from './Page.module.css'
import PostCard from "../../components/PostCard";
import { useParams } from "react-router";

export default function() {
  const ctx = useContext(ReactContext);
  const {username} = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState([]); 

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError([]);

      const response = await ctx.api.getAllPublicPostsByUsername(username);
      if (response.error) {
        setError(response.errorMsgs);
      } else {
        setPosts(response);
      }
      setLoading(false);
    })()
  }, [username])

  return (
    <div className={classes.layout}>
        <PageLabel label="USER POSTS" />
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