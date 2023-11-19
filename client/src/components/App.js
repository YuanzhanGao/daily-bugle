import './App.css';
import AccountRegister from './AccountRegister';
import UserLogin from './Login';
import Profile from './Profile';
import DraftArticle from './draft';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useCookies} from "react-cookie";

function App() {

  const [cookies, setCookie] = useCookies(["user"]);

  // define 
  function handleLogin(user) {
    // use cookie to store user login credentials that expires after an hour (3600s)
    setCookie("user", user, { path: "/", maxAge: 3600});
  }

  return (
    <div className='ui container'>
        <Router>
          <Routes>
            <Route 
            path="/register" 
            element={<AccountRegister />} 
            />

            <Route 
            path="/login"
            element={<UserLogin onLogin={handleLogin}/>} 
            />

          <Route 
            path="/profile"
            element={<Profile curr_user = {cookies.user}/>} 
            />

          <Route 
            path="/draft"
            element={<DraftArticle curr_user = {cookies.user}/>} 
            />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
