import './App.css';
import AccountRegister from './AccountRegister';
import UserLogin from './Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CookiesProvider, useCookies } from "react-cookie";

function App() {

  const [cookies, setCookie] = useCookies(["user"]);

  // define 
  function handleLogin(user) {
    // use cookie to store user login credentials that expires after an hour (3600s)
    setCookie("user", user, { path: "/", maxAge: 3600});
  }

  return (
    <div className='ui container'>
      <CookiesProvider>
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
          </Routes>
        </Router>
    </CookiesProvider>
    </div>
  );
}

export default App;
