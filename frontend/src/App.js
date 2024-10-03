import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecuritiesList from './components/SecuritiesList';
import SecurityDetail from './components/SecurityDetail';

function App() {
  return (
    <Router>
      <switch>
        <div className="App">
          <Routes>
            <Route path="/securities" Component={SecuritiesList} />
            <Route path="/securities/:id" Component={SecurityDetail} />
          </Routes>
        </div>
      </switch>
    </Router>
  );
}

export default App;
