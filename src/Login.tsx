import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios

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
        const response = await axios.get(`http://localhost:8000/user/${formData.username}`);
        const data = response.data;

        if (Object.keys(data).length === 0) {
          toast.error("Please enter a valid username");
        } else if (data.password === formData.password) {
          toast.success('Success');
          sessionStorage.setItem('username', formData.username);
          navigate('/');
        } else {
          toast.error("Please enter valid credentials");
        }

        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data");
      }
    }
  };

  const proceedLoginAPI = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid()) {
      const inputObj = {
        username: formData.username,
        password: formData.password,
      };

      try {
        const response = await axios.post("http://localhost:8000/user", inputObj, {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = response.data;

        toast.success('Success');
        sessionStorage.setItem('username', formData.username);
        navigate('/');

        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data");
      }
    }
  };

  const isValid = () => {
    let result = true;

    if (formData.username === '') {
      result = false;
      toast.warning('Please enter the username');
    }

    if (formData.password === '') {
      result = false;
      toast.warning('Please enter the password');
    }

    return result;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={proceedLogin}>
          <div className="card">
            <div className="card-header">
              <h1>User Login</h1>
            </div>
            <div className="card-body">
              <div className="col">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>User Name <span className="errmsg">*</span>
                    <input
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password<span className="errmsg">*</span>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Login</button>
              <Link to={'/register'} className="btn btn-success">New User</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
