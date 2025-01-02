import { ReactContext } from './context/ReactContext'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router'

import './App.css'

import DashboardLayout from './pages/DashboardLayout';
import MainLayout from './pages/MainLayout';

import AllPostsPage from './pages/dashboard/AllPostsPage';
import MyPostsPage from './pages/dashboard/MyPostsPage';
import CategoriesPage from './pages/dashboard/CategoriesPage';
import UsersPage from './pages/dashboard/UsersPage';
import LoginPage from './pages/AuthPages/LoginPage';
import MainPage from './pages/ViewPages/MainPage';
import CategoryPostsPage from './pages/ViewPages/CategoryPostsPage';
import UserPostsPage from './pages/ViewPages/UserPostsPage';
import PostViewPage from './pages/ViewPages/PostViewPage';


function AuthenticatedRoutes() {
  const ctx = useContext(ReactContext);
  return (
    ctx.user
    ? <Outlet />
    : <Navigate to="/dashboard/login" />
  );
}

function UnauthenticatedRoutes() {
  const ctx = useContext(ReactContext);
  return (
    !ctx.user
    ? <Outlet />
    : <Navigate to="/dashboard" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticatedRoutes />}>
          <Route path='/dashboard' element={<DashboardLayout />} >
            <Route path='allBlogs' element={<AllPostsPage />} />
            <Route path='myBlogs' element={<MyPostsPage />} />
            <Route path='categories' element={<CategoriesPage />} />
            <Route path='users' element={<UsersPage />} />
          </Route>
        </Route>

        <Route element={<UnauthenticatedRoutes />}>
          <Route path='/dashboard/login' element={<LoginPage />} />
        </Route>

        <Route path='/' element={<MainLayout />} >
          <Route path='' element={<MainPage />} />
          <Route path='category/:categorySlug' element={<CategoryPostsPage />} />
          <Route path='author/:username' element={<UserPostsPage />} />
          <Route path='post/:postSlug' element={<PostViewPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
