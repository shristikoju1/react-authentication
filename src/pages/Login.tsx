import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider"; 

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { loginAction } = useAuth(); 
  const [formData, setFormData] = useState<LoginForm>({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid()) {
      try {
        await loginAction(formData); 
        toast.success("Login successful");
        navigate("/"); 

      } catch (error) {
        toast.error("Invalid username or password"); 
      }
    }
  };

  const isValid = () => {
    if (!formData.username) {
      toast.warning("Please enter the username");
      return false;
    }

    if (!formData.password) {
      toast.warning("Please enter the password");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-2 text-2xl font-semibold">Login</h1>
          <p className="mb-8">Welcome back!</p>
        </div>

        <form onSubmit={proceedLogin}>
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Username<span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <MdEmail className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                <input
                  className="block w-full px-10 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <FaLock className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                <input
                  className="block w-full px-10 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <p className="mt-1 text-sm font-normal">
                Forgot your password? <span className="text-[#d21a17] cursor-pointer">Reset.</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="block w-full px-4 py-2 bg-[#ce201d] rounded-md shadow-sm hover:bg-[#d21a17] text-white focus:outline-none transition-all duration-200 ease-in-out"
            >
              Log In
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 mt-4 text-sm text-center">
            <p>Don't have an account yet?</p>
            <Link to="/register" className="text-[#d21a17] hover:underline">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
