import { NavLink } from 'react-router'
import classes from './PostCard.module.css'

export default function({post}) {

  return (
    <NavLink
      to={`/post/${post.slug}`}
      className={classes.card}
    >
      <div className={classes.imgCont}>
        <img className={classes.img} src={post.image}/>
      </div>
      
      <div className={classes.textCont}>
        <h1 className={classes.postTitle}>{post.title}</h1>
        <p className={classes.postInfo}>written by: <span>@{post.user.username} ({post.user.name})</span></p>
        <p className={classes.postInfo}>category: <span>{post.category.name}</span></p>
        <p className={classes.postInfo}>viewed: <span>{post.views} times</span></p>
        <p className={classes.postInfo}>written on: <span>{new Date(post.createdAt).toLocaleDateString("tr")}</span></p>
      </div>
    </NavLink>
  )
}
