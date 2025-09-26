import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';

// You need to create these new files
import ProblemDetails from './Pages/ProblemDetails/ProblemDetails';
const Dashboard = () => <h1>Dashboard</h1>; // A protected page placeholder
const NotFoundPage = () => <h1>404 | Page Not Found</h1>; // A catch-all page

function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/problems/:problemId' element={<ProblemDetails />} />

            {/* Protected Routes (user must be logged in) */}
            <Route element={<PrivateRoute/>}>
                {/* Pages you only want logged-in users to see */}
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>

            {/* Catch-all for non-matching URLs */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
  )
}

export default App