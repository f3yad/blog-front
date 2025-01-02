import { Outlet } from 'react-router';
import classes from './MainLayout.module.css'
import Header from '../components/Header';
import Container from '../components/Container';

export default function() {

  return (
    <div className={classes.layout}>
      <Header />
      <div>
        <Container className={classes.outletCont}>
          <Outlet/>
        </Container>
      </div>
    </div>
  );
}