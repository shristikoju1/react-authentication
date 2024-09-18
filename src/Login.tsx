import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid()) {
      try {
        const res = await axios.get("http://localhost:8000/user");
        const users = res.data;

        const user = users.find(
          (u: { username: string; password: string }) =>
            u.username === formData.username
        );

        if (!user) {
          toast.error("Invalid username");
        } else if (user.password === formData.password) {
          toast.success("Login successful");
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("userrole", user.role);
          navigate("/");
          window.location.reload();
        } else {
          toast.error("Invalid password");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data");
      }
    }
  };

  const isValid = () => {
    let result = true;

    if (formData.username === "") {
      result = false;
      toast.warning("Please enter the username");
    }

    if (formData.password === "") {
      result = false;
      toast.warning("Please enter the password");
    }

    return result;
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
          <p className="mb-8">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={proceedLogin}>
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Username or email <span className="text-red-500">*</span>
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
              <p className="text-sm font-normal font-source-sans">Forgot your password? <span className="text-[#d21a17] cursor-pointer font-source-sans">Reset.</span></p>


            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="block w-full mt-1 mb-6 px-4 py-2 text-black bg-[#f9d313] rounded-md shadow-sm hover:bg-[#d21a17] hover:text-white focus:outline-none transition-all duration-200 ease-in-out"
            >
              Log In
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-3 text-xs text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="flex items-center justify-between w-full mt-6">
            <Link
              to={'https://www.google.com/'}
              target="_blank"
              className="w-full px-10 py-2 mt-1  flex items-center justify-center gap-2 bg-[#f2f2f3] rounded-md shadow-sm"
            >
              <FcGoogle />
              <span className="text-black">
                Google

              </span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1 mt-4 text-sm text-center ">
            <p className="font-source-sans">
              Don't have an account yet?
            </p>
            <Link to="/register" className="text-[#d21a17] hover:underline font-source-sans">Register</Link>


          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
