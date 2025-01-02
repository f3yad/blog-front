import NavigationComponent from "./NavigationComponent";
import classes from './DashboardLeftPanel.module.css';
import { useContext } from "react";
import { ReactContext } from "../context/ReactContext";

export default function() {
  const ctx = useContext(ReactContext);

  return (
    <div className={classes.leftPanel}>
      <h1 className={classes.leftPanelLabel}>Blog Dashboard</h1>
      <div className={classes.leftPanelUsername}>
        <p>@{ctx.user.username} {ctx.user.isAdmin && "- admin"}</p>
        <p className={classes.logoutButton} onClick={() => ctx.logout()}>Logout</p>
      </div>
      <NavigationComponent />
    </div>
  );
}