import './App.css';
import AccountRegister from './AccountRegister';
import UserLogin from './Login';
import Profile from './Profile';
import DraftArticle from './Draft';
import ArticleList from './AList';
import CommentList from './CList';
import Article from './Article';
import Main from './Main';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useCookies} from "react-cookie";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // define 
  function handleLogin(user) {
    // use cookie to store user login credentials that expires after an hour (3600s)
    setCookie("user", user, { path: "/", maxAge: 3600});
  }

  // log out
  function logout() {
    removeCookie('user',{path:'/'});
    // open a new tab to Spiderman's main page
    window.open(
      '/'
  );
  }

  const profileORlogin = () => {
    if (cookies.user) {
      return (
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{fontSize: '20px'}} href="/Profile">Profile</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link style={{fontSize: '20px', color: 'gray'}} onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      )
    } else {
      return (
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link style={{fontSize: '20px'}} href="/Login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      )
    }
  }


  return (
    <div className='ui container'>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href='/'>Daily Bugle</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {profileORlogin()}
            </Container>
          </Navbar>
        <Router>

          <Routes>
            <Route 
            path="/" 
            element={<Main/>} 
            />

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

          <Route 
            path="/profile/articles"
            element={<ArticleList curr_user = {cookies.user}/>} 
            />

          <Route 
            path="/profile/comments"
            element={<CommentList curr_user = {cookies.user}/>} 
            />

          <Route 
            path="/article/:articleID"
            element={<Article curr_user = {cookies.user}/>}
            />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
