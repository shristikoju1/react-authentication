import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {

  const navigate = useNavigate();

  const [customerList, setCustomerList] = useState(null);

  useEffect(() => {


    const jwtToken = sessionStorage.getItem('jwtToken');
    console.log('jwt:',jwtToken);

    fetch("https://localhost:8000/user", {headers:{
      'Authorization': 'bearer '+ jwtToken
    }}).then ((res) => {

      return res.json();
    }).then((res) => {
      setCustomerList(res);
    }).catch((err) => {
      console.log(err.message)
    });

  }, [navigate]);

  return (
    <div>

      <h1 className="text-center">Welcome to the YIPL.</h1>

      {/* <table className="table table-bordered">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Credit Limit</th>
          </tr>
        </thead>
        <tbody>
          {customerList && 
            customerList.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.credenptials}</td>
              </tr>
            ))
          }
        </tbody>
      </table> */}
    </div>
  );
};

export default Home;
