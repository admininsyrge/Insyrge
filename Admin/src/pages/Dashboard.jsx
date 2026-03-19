import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/Sidebar";
import card2 from "../Assets/Images/admin_card1.svg";
import HalfEye from "../Assets/Images/half_eye.svg";
import { BASE_URL_ADMIN, GET_DASHBOARD_DETAILS } from "../API";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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
      const response = await axios.get(BASE_URL_ADMIN + GET_DASHBOARD_DETAILS, {
        headers,
      });
      if (response.status === 200) {
        const userData = response.data.data;
        setDashboardDetails(userData);
        setUsers(userData.slice(0, 4));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error_description || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDelete = async () => {
  //   if (!selectedData) return;
  //   try {
  //     const headers = { token: token };
  //     const response = await axios.post(
  //       BASE_URL_ADMIN + DELETE_USER,
  //       { _id: selectedData._id },
  //       { headers }
  //     );
  //     if (response?.data?.code === 200) {
  //       toast.success(response?.data?.message);
  //       setShowDelete(false);
  //       getDashboardDetails();
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error?.response?.data?.error_description || "Error deleting user"
  //     );
  //   }
  // };


  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-9 main-dash-left">
            <Breadcrumb
              className="cstm_bredcrumb"
              listProps={{ className: "breadcrumb-custom-separator" }}
            >
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <section className="back-dashboard-sec comn-dashboard-page">
              {/* Cards */}
              <div className="cards-dashboard">
                <div className="row row-gap-3">
                  <div className="col-lg-3 col-md-6">
                    <div className="inner-dashboard-card">
                      <div className="ing-sec-acrd-dash d-flex">
                        <figure>
                          <img src={card2} alt="" />
                        </figure>
                        <div className="text-disc-card">
                          <p>Total Users</p>
                          <h4>{dashboardDetails?.length || 0}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Management Table */}
              <div className="main-notification-messege">
                <div className="notifi-list d-flex">
                  <h6>User Management</h6>
                  <div className="dropdowns-inner-list d-flex">
                    <Link
                      className="add-notification-btn"
                      to="/user-management"
                    >
                      View All
                    </Link>
                  </div>
                </div>

                <div className="notification-table pt-0">
                  <Table>
                    <thead>
                      <tr className="head-class-td">
                        <th>Sr. no.</th>
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
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>
                              <div className="d-flex table_action_btn_group">
                                <Link
                                  className="view-icon"
                                  onClick={() => {
                                    setShowViewUser(true);
                                    setSelectedData(user);
                                  }}
                                >
                                  <img src={HalfEye} alt="view" />
                                </Link>
                                {/* <Link
                                  className="view-icon delete"
                                  onClick={() => {
                                    setShowDelete(true);
                                    setSelectedData(user);
                                  }}
                                >
                                  <img src={Delete1} alt="delete" />
                                </Link> */}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* View User Modal */}
        <Modal
          show={showViewUser}
          onHide={() => setShowViewUser(false)}
          centered
          size="lg"
          className="comm_modal cst_inner_wid_modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-1">User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedData ? (
              <div>
                <h3 className="fw-bold">Basic Info</h3>
                <div className="p-3">
                  <p className="mb-2 fs-4">
                    <strong>Name:</strong> {selectedData?.name}
                  </p>
                  <p className="mb-2 fs-4">
                    <strong>Email:</strong> {selectedData?.email}
                  </p>
                  <p className="mb-2 fs-4">
                    <strong>Company:</strong> {selectedData?.company}
                  </p>
                  <p className="mb-2 fs-4">
                    <strong>Reason for Interest:</strong>{" "}
                    {selectedData?.reasonForInterest}
                  </p>
                  <p className="mb-2 fs-4">
                    <strong>Role:</strong> {selectedData?.role}
                  </p>
                  <p className="mb-2 fs-4">
                    <strong>Status:</strong>{" "}
                    {selectedData?.active ? "Active" : "Inactive"}
                  </p>
                  <p className="mb-2 fs-4">
                    <strong>Approved:</strong>{" "}
                    {selectedData?.approved ? "Yes" : "No"}
                  </p>
                </div>

                <hr />
                <h3 className="fw-bold">Interested Projects</h3>
                {selectedData?.interestedProjects?.length > 0 ? (
                  selectedData.interestedProjects.map((proj, idx) => (
                    <div key={proj._id} className="p-2">
                      <p className="mb-2 fs-4">
                        {idx + 1}. {proj.title}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No interested projects found.</p>
                )}
              </div>
            ) : (
              <p>No user selected</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowViewUser(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
}

export default Dashboard;
