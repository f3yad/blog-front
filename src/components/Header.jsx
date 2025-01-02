import { useContext, useEffect, useState } from 'react';
import Container from './Container';
import classes from './Header.module.css';
import { ReactContext } from '../context/ReactContext';
import LoadingState from './LoadingState';
import { NavLink } from 'react-router';

export default function() {
  const ctx = useContext(ReactContext);
  
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState([]); 

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError([]);

      const response = await ctx.api.getAllAuthors();
      if (response.error) {
        setError(response.errorMsgs);
      } else {
        setAuthors(response);

        const categoriesResponse = await ctx.api.getAllCategories();
        if (categoriesResponse.error) {
          setError(categoriesResponse.errorMsgs);
        } else {
          setCategories(categoriesResponse);
        }
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className={classes.header}>
      <Container>
        <div className={classes.headerCont}>
          <NavLink className={classes.headerTitle} to="/">BlogSystem</NavLink>
          <div className={classes.nav}>
            {
              loading
              ? <LoadingState />
              : <>
                  <div className={classes.navMenuCont}>
                    <p className={classes.navMenuTitle}>Authors</p>
                    <div className={classes.navMenu}>
                      {authors.map(a => 
                        <NavLink
                          key={a._id}
                          to={`/author/${a.username}`}
                          className={classes.navItem}
                        >
                          {a.name}
                        </NavLink>
                      )}
                    </div>
                  </div>
                  <div className={classes.navMenuCont}>
                    <p className={classes.navMenuTitle}>Categories</p>
                    <div className={classes.navMenu}>
                      {categories.map(c => 
                        <NavLink
                          key={c._id}
                          to={`/category/${c.slug}`}
                          className={classes.navItem}
                        >
                          {c.name}
                        </NavLink>
                      )}
                    </div>
                  </div>
                </>
            }
          </div>
        </div>
      </Container>
    </div>
  );
}