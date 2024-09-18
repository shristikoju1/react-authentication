// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; 

// interface CustomerItem {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     credentials: string;
// }

const Home: React.FC = () => {
    // const navigate = useNavigate();
    // const [customerList, setCustomerList] = useState<CustomerItem[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Example of fetching with a JWT token if needed
    //             // const jwtToken = sessionStorage.getItem('jwtToken');
    //             // const response = await axios.get("https://localhost:8000/user", {
    //             //     headers: { 'Authorization': `Bearer ${jwtToken}` },
    //             // });

    //             const response = await axios.get("https://localhost:8000/user"); // Adjust URL as needed
    //              setCustomerList(response.data);
    //         } catch (err: any) {
    //             setError(err.message || "An error occurred");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [navigate]);

    return (
        <div className="container p-6 mx-auto h-[100vh] flex justify-center items-center">
            <h1 className="mb-6 text-3xl font-bold text-center">Welcome to YIPL.</h1>

            {/* {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Credentials</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customerList.map(item => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{item.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.credentials}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )} */}
        </div>
    );
};

export default Home;
