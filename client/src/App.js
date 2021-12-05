import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import RegisterPage from './pages/registerpage/RegisterPage';
import UrlsPage from './pages/urlspage/UrlsPage'
import ProfilePage from './pages/profilepage/ProfilePage';
import Error404 from './pages/errorpage/Error404'
import PrivateRoute from './components/privateroute/PrivateRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
        />
        <Route
        path="/urls"
        element={
          <PrivateRoute>
            <UrlsPage/>
          </PrivateRoute>
        }
        />
        <Route
        path="/profile/:id"
        element={
          <PrivateRoute>
            <ProfilePage/>
          </PrivateRoute>
        }
        />
        <Route path='*' element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
