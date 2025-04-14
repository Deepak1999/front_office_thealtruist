import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Pages/Home';
import CreateUsers from './components/Pages/CreateUsers';
import UploadArrivals from './components/Pages/UploadArrivals';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import MainLayout from './components/MainLayout/MainLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<MainLayout><Dashboard /></MainLayout>} />}
        />
        <Route
          path="/home"
          element={<PrivateRoute element={<MainLayout><Home /></MainLayout>} />}
        />
        <Route
          path="/upload-arrivals"
          element={<PrivateRoute element={<MainLayout><UploadArrivals /></MainLayout>} />}
        />
        <Route
          path="/create-user"
          element={<PrivateRoute element={<MainLayout><CreateUsers /></MainLayout>} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
