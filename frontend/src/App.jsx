import './App.css'
import { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Route } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return <AppRoutes setToken={setToken} />;
}


export default App;
