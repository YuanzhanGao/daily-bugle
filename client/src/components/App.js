import './App.css';
import AccountRegister from './AccountRegister';
import UserLogin from './Login';
import Profile from './Profile';
import DraftArticle from './draft';
import ArticleList from './articleList';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useCookies} from "react-cookie";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {

  const [cookies, setCookie] = useCookies(["user"]);

  // define 
  function handleLogin(user) {
    // use cookie to store user login credentials that expires after an hour (3600s)
    setCookie("user", user, { path: "/", maxAge: 3600});
  }

  return (
    <div className='ui container'>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand>Daily Bugle</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
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

          <Route 
            path="/profile/articles"
            element={<ArticleList curr_user = {cookies.user}/>} 
            />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
