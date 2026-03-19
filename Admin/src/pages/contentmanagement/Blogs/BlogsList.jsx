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
  GET_BLOGS,
  DELETE_BLOG,
} from "../../../API";

function BlogsList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL_USER}${GET_BLOGS}`);
      setBlogs(response.data?.data || []);
    } catch (error) {
      toast.error("Failed to load blogs!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete Blog
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL_ADMIN}${DELETE_BLOG(selectedData._id)}`, {
        headers: { Token: localStorage.getItem("token") },
      });
      setBlogs(blogs.filter((b) => b._id !== selectedData._id));
      toast.success("Blog deleted successfully!");
      setShow(false);
    } catch (error) {
      toast.error("Failed to delete blog!");
    } finally {
      setIsLoading(false);
    }
  };

  // Search filter
  const filteredList = blogs.filter((b) =>
    b.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
                {/* Header */}
                <div className="notifi-list d-flex justify-content-between align-items-center">
                  <h6>Blogs Management</h6>
                  <div className="dropdowns-inner-list d-flex">
                    <div className="icon-search-main">
                      <Form.Control
                        type="text"
                        placeholder="Search Blog..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      className="ms-2 add-notification-btn"
                      onClick={() => navigate("/create-blog")}
                    >
                      + Create New Blog
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
                        <th>Sub Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Short Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList.length > 0 ? (
                        filteredList.map((blog, index) => (
                          <tr key={blog._id}>
                            <td>{index + 1}</td>
                            <td>{blog.title}</td>
                            <td>{blog.subTitle}</td>
                            <td>{blog.author || "N/A"}</td>
                            <td>{blog.category || "N/A"}</td>
                            <td>
                              {blog.shortDescription
                                ? blog.shortDescription.substring(0, 50) + "..."
                                : ""}
                            </td>
                            <td>
                              <div className="d-flex table_action_btn_group">
                                <Button
                                  variant="info"
                                  size="sm"
                                  className="me-2"
                                  onClick={() => {
                                    setSelectedData(blog);
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
                                    navigate(`/blogs/edit/${blog._id}`)
                                  }
                                >
                                  Edit
                                </Button>

                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedData(blog);
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
                          <td colSpan="7" className="text-center">
                            No Blogs Found
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

        {/* Modal (View/Delete) */}
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
                Are you sure you want to delete this blog?
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
              <Modal.Body className="p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <h4 className="mb-2">{selectedData.title}</h4>
                <h6 className="text-muted mb-3">{selectedData.subTitle}</h6>

                {selectedData.image && (
                  <div className="mb-3">
                    <img
                      src={`${BASE_URL_USER}${selectedData.image}`}
                      alt={selectedData.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                  </div>
                )}

                <p>
                  <strong>Author:</strong> {selectedData.author || "N/A"}
                </p>
                <p>
                  <strong>Category:</strong> {selectedData.category || "N/A"}
                </p>
                <p>
                  <strong>Description:</strong>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedData.description,
                    }}
                  />
                </p>

                {selectedData.shortDescription && (
                  <p>
                    <strong>Short Description:</strong> {selectedData.shortDescription}
                  </p>
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

export default BlogsList;
