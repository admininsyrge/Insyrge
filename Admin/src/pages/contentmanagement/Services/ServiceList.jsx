import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import Delt from "../../../Assets/Images/del.svg";
import Loader from "../../../components/Loader";
import {
  BASE_URL_ADMIN,
  BASE_URL_USER,
  GET_SERVICES,
  DELETE_SERVICE,
} from "../../../API";

function ServiceList() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch all services
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL_USER}${GET_SERVICES}`);
      setServices(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Delete service
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${BASE_URL_ADMIN}${DELETE_SERVICE(selectedData._id)}`,
        {
          headers: { Token: localStorage.getItem("token") },
        }
      );
      setServices(services.filter((s) => s._id !== selectedData._id));
      toast.success("Service deleted successfully!");
      setShow(false);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service!");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Search filter
  const filteredList = services.filter((service) =>
    service.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-9 main-dash-left">
            <section className="back-dashboard-sec comn-dashboard-page">
              <div className="main-notification-messege">
                {/* Page Header */}
                <div className="notifi-list d-flex justify-content-between align-items-center">
                  <h6>Services Management</h6>
                  <div className="dropdowns-inner-list d-flex">
                    <div className="icon-search-main">
                      <Form.Control
                        type="text"
                        placeholder="Search Service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      className="ms-2 add-notification-btn"
                      onClick={() => navigate("/create-services")}
                    >
                      + Create New Service
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="notification-table pt-0">
                  <Table responsive bordered hover>
                    <thead>
                      <tr className="head-class-td">
                        <th>Sr. No.</th>
                        <th>Title</th>
                        <th>Button</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList.length > 0 ? (
                        filteredList.map((service, index) => (
                          <tr key={service._id}>
                            <td>{index + 1}</td>
                            <td>{service.title}</td>
                            <td>{service.button}</td>
                            <td>
                              {service.points && service.points.length > 0
                                ? `${service.points.slice(0, 2).join(", ")}...`
                                : "—"}
                            </td>
                            <td>
                              <div className="d-flex table_action_btn_group">
                                <Button
                                  variant="info"
                                  size="sm"
                                  className="me-2"
                                  onClick={() => {
                                    setSelectedData(service);
                                    setIsDeleteModal(false);
                                    setShow(true);
                                  }}
                                >
                                  View
                                </Button>

                                <Button
                                  variant="warning"
                                  size="sm"
                                  className="me-2"
                                  onClick={() =>
                                    navigate(`/service/edit/${service._id}`)
                                  }
                                >
                                  Edit
                                </Button>

                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedData(service);
                                    setIsDeleteModal(true);
                                    setShow(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No Services Found
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

        {/* ✅ Modal (View / Delete) */}
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          size={isDeleteModal ? "md" : "lg"}
          className="comm_modal cst_inner_wid_modal"
        >
          {isDeleteModal ? (
            // Delete Modal
            <Modal.Body className="text-center p-4">
              <div className="img-modal mb-3">
                <img src={Delt} alt="Delete Icon" width="70" />
              </div>
              <h4 className="heading mb-3">
                Are you sure you want to delete this service?
              </h4>
              <div className="d-flex justify-content-center gap-2">
                <Button className="comn-modal-btns-blue" onClick={handleDelete}>
                  Yes, Delete
                </Button>
                <Button
                  className="comn-modal-btns-transparent"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>
              </div>
            </Modal.Body>
          ) : (
            // View Modal
            selectedData && (
              <Modal.Body
                className="p-4"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <h4 className="mb-3">{selectedData.title}</h4>

                {selectedData.image && (
                  <div className="mb-3">
                    <img
                      src={`${BASE_URL_USER}${selectedData.image}`}
                      alt={selectedData.title}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <p>
                  <strong>Description:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedData.description,
                    }}
                  />
                </p>

                {selectedData.points?.length > 0 && (
                  <>
                    <strong>Points:</strong>
                    <ul>
                      {selectedData.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </>
                )}

                <p>
                  <strong>Button:</strong> {selectedData.button}
                </p>

                <p className="mt-3">
                  <small>
                    <strong>Created At:</strong>{" "}
                    {new Date(selectedData.createdAt).toLocaleString()}
                  </small>
                </p>
              </Modal.Body>
            )
          )}

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ServiceList;
