import { NavLink, useLocation } from "react-router";
import classes from './NavigationComponent.module.css';
import { useContext } from "react";
import { ReactContext } from "../context/ReactContext";

export default function() {
  const ctx = useContext(ReactContext);
  const location = useLocation();

  const navLinks = [
    {link: "/dashboard/allBlogs", label:"All Blogs", admin: true},
    {link: "/dashboard/myBlogs", label:"My Blogs"},
    {link: "/dashboard/categories", label:"Categories"},
    {link: "/dashboard/users", label:"Users", admin: true},
  ];

  const navLinksElements = navLinks.map(
    item => 
      (!item.admin || ctx.user.isAdmin) &&
      <NavLink
        key={item.link}
        className={classes.navLink}
        to={item.link}
        data-active={location.pathname == item.link || undefined}
      >
          {item.label}
      </NavLink>
  );

  return (
    <nav className={classes.nav}>
      {navLinksElements}
    </nav>
  );
}