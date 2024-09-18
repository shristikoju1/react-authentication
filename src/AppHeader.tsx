import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AppHeader = () => {
    const [displayUsername, setDisplayUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { pathname } = location;

    useEffect(() => {
        const username = sessionStorage.getItem('username');

        if (!username) {
            navigate('/login');
        } else {
            setDisplayUsername(username);
        }
    }, []);

    return (
        <>
            {pathname !== '/login' && pathname !== '/register' && (
                <header className="flex items-center justify-between px-6 py-4 text-white bg-gray-800 shadow-lg">
                    <nav className="space-x-8 text-lg">
                        <Link to="/" className="transition-colors hover:text-gray-400">Home</Link>
                        <Link to="/customer" className="transition-colors hover:text-gray-400">Customer</Link>
                    </nav>
                    <div className="flex items-center space-x-6">
                        <span className="text-base">
                            Welcome, <b className="font-semibold text-[#d21a17]">{displayUsername}</b>
                        </span>
                        <Link 
                            to="/login" 
                            className="text-base transition-colors hover:text-gray-400"
                        >
                            Logout
                        </Link>
                    </div>
                </header>
            )}
        </>
    );
};

export default AppHeader;
