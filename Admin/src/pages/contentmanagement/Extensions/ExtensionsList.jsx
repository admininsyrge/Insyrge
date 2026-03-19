import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Delt from "../../../Assets/Images/del.svg";
import Loader from "../../../components/Loader";
import axios from "axios";
import {
  BASE_URL_ADMIN,
  BASE_URL_USER,
  GET_EXTENSION,
  DELETE_EXTENSION,
} from "../../../API";

function ExtensionsList() {
  const navigate = useNavigate();
  const [extensions, setExtensions] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // ✅ Fetch all extensions
  const fetchExtensions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL_USER}${GET_EXTENSION}`);
      setExtensions(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching extensions:", err);
      toast.error("Failed to load extensions!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExtensions();
  }, []);

  // ✅ Delete Extension
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${BASE_URL_ADMIN}${DELETE_EXTENSION(selectedData._id)}`,
        {
          headers: { Token: localStorage.getItem("token") },
        }
      );
      setExtensions(extensions.filter((e) => e._id !== selectedData._id));
      toast.success("Extension deleted successfully!");
      setShow(false);
    } catch (err) {
      toast.error("Failed to delete extension!");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Filter extensions
  const filteredList = extensions.filter((e) =>
    e.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
                {/* Header Section */}
                <div className="notifi-list d-flex justify-content-between align-items-center">
                  <h6>Extensions Management</h6>
                  <div className="dropdowns-inner-list d-flex">
                    <div className="icon-search-main">
                      <Form.Control
                        type="text"
                        placeholder="Search Extension..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      className="ms-2 add-notification-btn"
                      onClick={() => navigate("/create-extension")}
                    >
                      + Create New Extension
                    </button>
                  </div>
                </div>

                {/* Table Section */}
                <div className="notification-table pt-0">
                  <Table responsive bordered hover>
                    <thead>
                      <tr className="head-class-td">
                        <th>Sr. No.</th>
                        <th>Title</th>
                        {/* <th>Slug</th> */}
                        <th>Link</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList.length > 0 ? (
                        filteredList.map((extension, index) => (
                          <tr key={extension._id}>
                            <td>{index + 1}</td>
                            <td>{extension.title}</td>
                            {/* <td>{extension.slug}</td> */}
                            <td>
                              <a
                                href={
                                  extension.link.startsWith("http")
                                    ? extension.link
                                    : `https://${extension.link}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Visit
                              </a>
                            </td>

                            <td
                              dangerouslySetInnerHTML={{
                                __html:
                                  extension.description
                                    ?.replace(/<[^>]+>/g, "")
                                    .substring(0, 50) + "...",
                              }}
                            />
                            <td>
                              <div className="d-flex table_action_btn_group">
                                <Button
                                  variant="info"
                                  size="sm"
                                  className="me-2"
                                  onClick={() => {
                                    setSelectedData(extension);
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
                                    navigate(`/edit/extension/${extension._id}`)
                                  }
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedData(extension);
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
                          <td colSpan="6" className="text-center">
                            No Extensions Found
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

        {/* Modal (View or Delete) */}
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          size={isDeleteModal ? "md" : "lg"}
          className="comm_modal cst_inner_wid_modal"
        >
          {isDeleteModal ? (
            <Modal.Body className="text-center p-4">
              <div className="img-modal mb-3">
                <img src={Delt} alt="Delete Icon" width="70" />
              </div>
              <h4 className="heading mb-3">
                Are you sure you want to delete this extension?
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
            selectedData && (
              <Modal.Body
                className="p-4"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <h4 className="mb-3">{selectedData.title}</h4>
                <div className="mb-3">
                  <img
                    src={`${BASE_URL_USER}${selectedData.image}`}
                    alt={selectedData.title}
                    className="img-fluid rounded"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                </div>

                <p>
                  <strong>Slug:</strong> {selectedData.slug}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={
                      selectedData.link.startsWith("http")
                        ? selectedData.link
                        : `https://${selectedData.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedData.link}
                  </a>
                </p>

                <p>
                  <strong>Short Description:</strong> {selectedData.description}
                </p>

                <div className="mt-3">
                  <strong>Long Description:</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedData.longDescription,
                    }}
                  />
                </div>

                {selectedData.features?.length > 0 && (
                  <>
                    <strong>Features:</strong>
                    <ul>
                      {selectedData.features.map((f, i) => (
                        <li key={i}>
                          <strong>{f.title}</strong>: {f.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedData.benefits?.length > 0 && (
                  <>
                    <strong>Benefits:</strong>
                    <ul>
                      {selectedData.benefits.map((b, i) => (
                        <li key={i}>
                          <strong>{b.title}</strong>: {b.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

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

export default ExtensionsList;
