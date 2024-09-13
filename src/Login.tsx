import { useState, FormEvent } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginForm {
  id: string;
  password: string;
}

const Login = () => {

  const [formData, setFormData] = useState<LoginForm>({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container">
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="col">

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>User Name <span className="errmsg">*</span> </label>
                    <input
                      className="form-control"
                      name="id"
                      value={formData.id}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password<span className="errmsg">*</span> </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={formData.password}
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="card-footer gap-4">
              <button type="submit" className="btn btn-primary ">Login</button>
              <a href="#" className="btn btn-success">New User</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
