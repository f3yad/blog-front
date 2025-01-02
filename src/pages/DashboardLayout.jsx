import { Outlet } from 'react-router';
import classes from './DashboardLayout.module.css'
import DashboardLeftPanel from '../components/DashboardLeftPanel';

export default function() {

  return (
    <div className={classes.layout}>
      <DashboardLeftPanel />
      <div className={classes.outletCont}>
        <Outlet/>
      </div>
    </div>
  );
}