import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

interface RegisterForm {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  gender: string;
  role: string;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    gender: "",
    role: ""
  });

  const navigate = useNavigate();

  const isValid = () => {
    let isProceed = true;
    let errMsg = "Please enter the value in";

    if (formData.username === "") {
      isProceed = false;
      errMsg += " Username";
    }
    if (formData.password === "") {
      isProceed = false;
      errMsg += " Password";
    }

    if (formData.name === "") {
      isProceed = false;
      errMsg += " Full Name";
    }

    if (formData.email === "") {
      isProceed = false;
      errMsg += " Email";
    }

    if (formData.phone === "") {
      isProceed = false;
      errMsg += " Phone";
    }

    if (formData.country === "") {
      isProceed = false;
      errMsg += " Country";
    }

    if (formData.address === "") {
      isProceed = false;
      errMsg += " Address";
    }

    if (formData.gender === "") {
      isProceed = false;
      errMsg += " Gender";
    }

    // if (formData.role === "") {
    //   isProceed = false;
    //   errMsg += " Role";
    // }

    if (!isProceed) {
      toast.warning(errMsg);
    } else {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
        // do nothing
      } else {
        isProceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isProceed;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Registered Successfully!");
            navigate("/login");
          } else {
            return res.json().then((err) => {
              throw new Error(err.message);
            });
          }
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
          console.log(err);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 my-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-2 text-2xl font-semibold">Register</h1>
          <p className="mb-8">Create an account in YIPL</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex gap-4 form-group">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

             

            </div>

            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Phone No <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
                <option value="Nepal">Nepal</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#d21a17]"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#d21a17] border-gray-300 focus:ring-[#d21a17]"
                    required
                  />
                  <label htmlFor="male" className="ml-2 text-sm text-gray-700">
                    Male
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#d21a17] border-gray-300 focus:ring-[#d21a17]"
                    required
                  />
                  <label htmlFor="female" className="ml-2 text-sm text-gray-700">
                    Female
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="other"
                    name="gender"
                    type="radio"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#d21a17] border-gray-300 focus:ring-[#d21a17]"
                    required
                  />
                  <label htmlFor="other" className="ml-2 text-sm text-gray-700">
                    Other
                  </label>
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-start mt-4">
            <input
              type="checkbox"
              name="text"
              className="w-3 h-3 text-[#d21a17] border-gray-300 rounded focus:ring-[#d21a17]"
            />
            <p className="ml-2 text-xs text-gray-700">
              I certify that I agree to the 
              <a href="#" className="text-[#d21a17] hover:underline mx-1">Terms and Conditions</a>
              and
              <a href="#" className="text-[#d21a17] hover:underline mx-1"> Privacy Policy</a>.
            </p>
          </div>


          <button
            type="submit"
            className="block w-3/4 px-4 py-2 mt-4 mb-6 font-semibold text-black bg-[#f9d313] rounded-lg hover:bg-[#aa1413] focus:outline-none  hover:text-white mx-auto transition-all 0.3s ease-in-out"
          >
            Register
          </button>

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

          <div className="mt-4 text-sm text-center font-source-sans">
            <span>Already have an account? </span>
            <Link to="/login" className="text-[#d21a17] hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
