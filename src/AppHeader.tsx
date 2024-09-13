import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"


const AppHeader = () => {

    const [displayUsername, setDisplayUsername] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        if (location.pathname === '/login' || location.pathname === '/register') {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }

        const username = sessionStorage.getItem('username');

        if (!username) {
            navigate('/login');
        } else {
            setDisplayUsername(username);
        }
    }, [navigate, location]);

    return (
        <div>
            {showMenu && (
                <div className="header">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/customer"}>Customer</Link>
                    <span style={{ marginLeft: '80%' }}>Welcome <b>{displayUsername}</b> </span>
                    <Link style={{ float: 'right' }} to="/login">Logout</Link>
                </div>
            )}

        </div>

    )
}

export default AppHeader 