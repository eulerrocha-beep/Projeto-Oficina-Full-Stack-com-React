import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Clientes from '../pages/Clientes';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Veiculos from '../pages/Veiculos';
import OrdemServico from '../pages/Ordem';

export default function AppRoutes({ setToken }) {
  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute >} />

      <Route
        path="/clientes"
        element={
          <PrivateRoute>
            <Clientes />
          </PrivateRoute>
        }
      />

      <Route 
      path='/clientes/:id/veiculos' 
      element={<Veiculos />} />

      <Route
      path='/ordens'
      element={<OrdemServico />}
      />

    </Routes>
  );
}