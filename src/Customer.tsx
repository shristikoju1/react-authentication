import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CustomerItem {
  code: string;
  name: string;
  email: string;
}

interface RoleAccess {
  haveedit: boolean;
  haveadd: boolean;
  havedelete: boolean;
}

const Customer = () => {
  const [customerList, setCustomerList] = useState<CustomerItem[]>([]);
  const [access, setAccess] = useState<RoleAccess>({
    haveedit: false,
    haveadd: false,
    havedelete: false,
  });
  const [view, setView] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserAccess();
    loadCustomer();
  }, []);

  const loadCustomer = () => {
    fetch("http://localhost:8000/customer")
      .then((res) => {
        if (!res.ok) {
          return false;
        }
        return res.json();
      })
      .then((res) => {
        setCustomerList(res);
      });
  };

  const getUserAccess = () => {
    const userrole = sessionStorage.getItem("userrole") || "";
    fetch(`http://localhost:8000/roleaccess?role=${userrole}&menu=customer`)
      .then((res) => {
        if (!res.ok) {
          toast.warning("You are not authorized to access this menu.");
          navigate("/");
          return false;
        }
        return res.json();
      })
      .then((res) => {
        if (res.length > 0) {
          setView(true);
          let userobj = res[0];
          setAccess({
            haveedit: userobj.haveedit === "true",
            haveadd: userobj.haveadd === "true",
            havedelete: userobj.havedelete === "true",
          });
        } else {
          navigate("/");
          toast.warning("You are not authorized to access this menu.");
        }
      });
  };

  const handleAdd = () => {
    if (access.haveadd) {
      toast.success("Added successfully!");
    } else {
      toast.warning("You don't have access to add.");
    }
  };

  const handleEdit = () => {
    if (access.haveedit) {
      toast.success("Updated successfully!");
    } else {
      toast.warning("You don't have access to edit.");
    }
  };

  const handleRemove = () => {
    if (access.havedelete) {
      toast.success("Removed successfully!");
    } else {
      toast.warning("You don't have access to delete.");
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-5 text-center text-black border-b border-gray-200">
          <h3 className="text-2xl font-bold">Customer Listing</h3>
        </div>
        <div className="px-6 py-4">
          <button
            className={`px-4 py-2 mb-2 rounded-md text-white ${
              access.haveadd
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            onClick={handleAdd}
            // disabled={!access.haveadd}
          >
            Add (+)
          </button>
          <table className="w-full mt-4 border border-gray-300 rounded-md table-auto">
            <thead>
              <tr className="text-left text-white bg-gray-700">
                <th className="px-4 py-3 border-b">Code</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((item) => (
                <tr
                  key={item.code}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-3">{item.code}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="flex px-4 py-3 space-x-2">
                    <button
                      className={`px-3 py-1 rounded-md text-white ${
                        access.haveedit
                          ? "bg-gray-700 hover:bg-gray-400 transition-all 0.3s ease-in"
                          : "hidden"
                      }`}
                      onClick={handleEdit}
                    //   disabled={!access.haveedit}
                    >
                      Edit
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md text-white ${
                        access.havedelete
                          ? "bg-[#d21a17] hover:bg-red-400 transition-all 0.3s ease-in"
                          : "bg-red-400 cursor-not-allowed"
                      }`}
                      onClick={handleRemove}
                    //   disabled={!access.havedelete}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
