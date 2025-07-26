import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './screens/Login';
import { Dashboard } from './screens/Dashboard';
import { Upload } from './screens/Upload';
import { useUser } from './contexts/user';
import { Navbar } from './components/navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

const GuestOnlyRoute = ({ children }) => {
  const { user } = useUser();
  return !user ? children : <Navigate to="/" />;
};
const publicRoutes = [
  {
    path: '/',
    component: <Dashboard />,
  },
  {
    path: '/upload',
    component: <Upload />,
  },
];

// const publicRoutes = [
//   {
//     path: '/login',
//     component: <Login />,
//   },
// ];

export const RenderRoutes = () => {
  const { user } = useUser();
  return (
    <Router>
      <Navbar />
      <Routes>
        {publicRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={<GuestOnlyRoute>{component}</GuestOnlyRoute>} />
        ))}
        {/* {secureRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={<PrivateRoute>{component}</PrivateRoute>} />
        ))} */}
      </Routes>
    </Router>
  );
};
