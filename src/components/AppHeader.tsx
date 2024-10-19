import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const AppHeader = () => {
  const { user, handleLogout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    
    if (!user) {
        navigate('/login');
    } 
    else {
        navigate('/')
    }
    
  },[user, navigate])

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && (
        <header className="flex items-center justify-between px-6 py-4 text-white bg-gray-800 shadow-lg">
          <nav className="space-x-8 text-lg">
            <Link to="/" className="transition-colors hover:text-gray-400">
              Home
            </Link>
            <Link
              to="/customer"
              className="transition-colors hover:text-gray-400"
            >
              Customer
            </Link>
          </nav>
          <div className="flex items-center space-x-6">
            <span className="text-base">
              Welcome,{" "}
              <b className="font-semibold text-[#d21a17]">{user?.username}</b>
            </span>
            <button
              onClick={logout}
              className="text-base transition-colors hover:text-gray-400"
            >
              Logout
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default AppHeader;
