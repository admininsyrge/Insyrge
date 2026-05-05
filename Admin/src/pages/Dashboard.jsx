import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BASE_URL_ADMIN, GET_DASHBOARD_DETAILS } from "../API";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import { Users, Eye } from "lucide-react";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    getDashboardDetails();
  }, []);

  const getDashboardDetails = async () => {
    setIsLoading(true);
    try {
      const headers = { Token: token };
      const response = await axios.get(BASE_URL_ADMIN + GET_DASHBOARD_DETAILS, { headers });
      if (response.status === 200) {
        const userData = response.data.data;
        setDashboardDetails(userData);
        setUsers(userData.slice(0, 4));
      }
    } catch (error) {
      toast.error(error?.response?.data?.error_description || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <span className="active">Dashboard</span>
      </nav>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card-hover flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Users className="text-blue-500" size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Total Users</p>
            <h4 className="text-2xl font-bold text-gray-900">{dashboardDetails?.length || 0}</h4>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
          <Link to="/user-management" className="btn-primary text-sm">View All</Link>
        </div>

        <div className="overflow-x-auto">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td className="font-medium">{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                      <button
                        className="btn-info"
                        onClick={() => { setShowViewUser(true); setSelectedData(user); }}
                      >
                        <Eye size={14} className="mr-1" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-8">No data found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* View User Modal */}
      <Modal show={showViewUser} onHide={() => setShowViewUser(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-lg font-semibold">User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Basic Info</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Name", selectedData?.name],
                    ["Email", selectedData?.email],
                    ["Company", selectedData?.company],
                    ["Role", selectedData?.role],
                    ["Status", selectedData?.active ? "Active" : "Inactive"],
                    ["Approved", selectedData?.approved ? "Yes" : "No"],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                      <p className="font-medium text-gray-800">{value || "—"}</p>
                    </div>
                  ))}
                </div>
                {selectedData?.reasonForInterest && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-xs text-gray-500 mb-0.5">Reason for Interest</p>
                    <p className="font-medium text-gray-800">{selectedData.reasonForInterest}</p>
                  </div>
                )}
              </div>

              <hr className="border-gray-200" />

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Interested Projects</h4>
                {selectedData?.interestedProjects?.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedData.interestedProjects.map((proj, idx) => (
                      <li key={proj._id} className="flex items-center gap-2 text-gray-700">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">{idx + 1}</span>
                        {proj.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No interested projects found.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No user selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-secondary" onClick={() => setShowViewUser(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dashboard;
