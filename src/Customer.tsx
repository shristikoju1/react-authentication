import { useEffect, useState } from "react"

const Customer = () => {

    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        loadCustomer();
    }, [])

    const loadCustomer = () => {
        fetch("http://localhost:8000/customer").then(res => {
            if (!res.ok) {
                return false
            }
            return res.json();
        }).then(res => {
            setCustomerList(res)
        });
    }



    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Customer Listing</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            <button className="btn btn-success">Add (+)</button>
                            {customerList && 
                            customerList.map(item => (
                                <tr key = {item.code}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Customer