import React from 'react';
import './App.css';
import ListPage from './pages/home/ListPage';
import Navigation from './pages/home/Navigation';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <ListPage />
    </div>
  );
}

export default App;
