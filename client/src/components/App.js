import './App.css';
import AccountRegister from './AccountRegister';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='ui container'>
      <Router>
        <Routes>
          <Route 
          path="/register" 
          element={<AccountRegister />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
