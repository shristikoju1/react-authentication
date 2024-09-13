import { useState, FormEvent } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterForm {
  id: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  gender: string;
}

const Register = () => {

  const [formData, setFormData] = useState<RegisterForm>({
    id: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    gender: "",
  });

  const navigate = useNavigate();

  const isValid = () => {
    let isProceed = true;
    let errMsg = 'Please enter the value in';

    if(formData.password === ''){
      isProceed = false;
      errMsg += ' Password';
    }

    if(formData.name === ''){
      isProceed = false;
      errMsg += ' Full Name';
    }

    if(formData.email === ''){
      isProceed = false;
      errMsg += ' Email';
    }

    if(formData.phone === ''){
      isProceed = false;
      errMsg += ' Phone';
    }

    if(formData.country === ''){
      isProceed = false;
      errMsg += ' Country';
    }

    if(formData.address === ''){
      isProceed = false;
      errMsg += ' Address';
    }

    if(formData.gender === ''){
      isProceed = false;
      errMsg += ' Gender';
    }

   
    if(!isProceed){
      toast.warning(errMsg);
    }else{
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)){

      }else{
        isProceed = false;
        toast.warning("Please enter the valid email");

      }
    }
    return isProceed;

  }

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(isValid()){
   
      // console.log(formData);
  
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {'content-type':'application/json'},
        body:JSON.stringify(formData)
      }).then((res) => {
        if (res.ok) {
          toast.success('Registered Successfully !')
          navigate('/login');
        } else {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
      }).catch((err) => {
        toast.error('Failed : '+err.message);
      });
    };
    
  }

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>User Name <span className="errmsg">*</span> </label>
                    <input
                      className="form-control"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      // required
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
                      onChange={handleChange}
                      // required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name<span className="errmsg">*</span> </label>
                    <input
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      // required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email<span className="errmsg">*</span> </label>
                    <input
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      // required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone No<span className="errmsg">*</span> </label>
                    <input
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      // required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Country<span className="errmsg">*</span> </label>
                    <select
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      // required
                    >
                      <option value="">Select Country</option>
                      <option value="nepal">Nepal</option>
                      <option value="usa">USA</option>
                      <option value="india">India</option>
                      <option value="japan">Japan</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address <span className="errmsg">*</span> </label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      // required
                    ></textarea>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br />
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                    /> Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    /> Female
                  </div>
                </div>

              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Register</button>
              <a href="#" className="btn btn-danger">Back</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
