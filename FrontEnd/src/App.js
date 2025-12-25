import { Routes, Route, Navigate } from 'react-router-dom';

import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import WithLoading from './_sharecomponents/loading/WithLoading';
import HomePage from './pages/home/HomePage';
import Dashboard from './pages/home/dashboard/Dashboard';
import UserInfo from './pages/home/userinfo/UserInfo';
import ListGroups from './pages/home/listgroups/ListGroups';
import PasswordChanging from './pages/home/password changing/PasswordChanging';
import './App.css';

const SignupWithLoading = WithLoading(Signup);
const SigninWithLoading = WithLoading(Signin);

const DashboardWithLoading = WithLoading(Dashboard)
const UserWithLoading = WithLoading(UserInfo)
const ListGroupsWithLoading = WithLoading(ListGroups)
const PasswordChangingWithLoading = WithLoading(PasswordChanging)

function App() {
    localStorage.setItem('login', true)

    const isLoggedIn = localStorage.getItem('login')

    if (isLoggedIn === 'false') {
        return (
            <div className='App'>
                {/* react router ver 6 */}
                <Routes>
                    <Route path="/sign-in" element={<SigninWithLoading />} />
                    <Route path="/sign-up" element={<SignupWithLoading />} />
                    <Route path="/" element={<Navigate to="/sign-in" />} />
                </Routes>
            </div>
        )
    }

    return (
        /* react router ver 6 */
        <Routes>
            <Route path="/sign-in" element={<SigninWithLoading />} />
            <Route path="/sign-up" element={<SignupWithLoading />} />

            <Route path="/" element={<HomePage />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardWithLoading />} />
                <Route path="user-info" element={<UserWithLoading />} />
                <Route path="list-groups" element={<ListGroupsWithLoading />} />
                <Route path="password-changing" element={<PasswordChangingWithLoading />} />
            </Route>
        </Routes>
    );
}

export default App;