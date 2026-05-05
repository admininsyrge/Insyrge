import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { toast } from "react-toastify";
import Delt from "../../../Assets/Images/del.svg";
import Loader from "../../../components/Loader";
import axios from "axios";
import {
  BASE_URL_ADMIN,
  BASE_URL_USER,
  DELETE_PROJECT,
  GET_PROJECTS,
} from "../../../API";
import { getImageUrl, handleImageError } from "../../../utils/imageUtils";

function ProjectsList() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL_USER}${GET_PROJECTS}`);
      setProjects(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load projects!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete Project
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${BASE_URL_ADMIN}${DELETE_PROJECT}/${selectedData._id}`,
        {
          headers: { Token: localStorage.getItem("token") },
        },
      );
      setProjects(projects.filter((p) => p._id !== selectedData._id));
      toast.success("Project deleted successfully!");
      setShow(false);
    } catch (err) {
      toast.error("Failed to delete project!");
    } finally {
      setIsLoading(false);
    }
  };

  // Memoized filter
  const filteredList = useMemo(
    () =>
      projects.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [projects, searchQuery],
  );

  return (
    <>
      <Loader isLoading={isLoading} />
      <section className="">
        <div className="">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <h6>Projects Management</h6>
            <div className="flex items-center gap-3">
              <div className="">
                <Form.Control
                  type="text"
                  placeholder="Search Project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="ms-2 add-notification-btn"
                onClick={() => navigate("/projects/create")}
              >
                + Create New Project
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto mt-6">
            <Table responsive bordered hover>
              <thead>
                <tr className="bg-gray-50">
                  <th>Sr. No.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Client</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length > 0 ? (
                  filteredList.map((project, index) => (
                    <tr key={project._id}>
                      <td>{index + 1}</td>
                      <td>{project.title}</td>
                      <td>{project.category}</td>
                      <td>{project.client}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html:
                            project.description
                              ?.replace(/<[^>]+>/g, "")
                              .substring(0, 50) + "...",
                        }}
                      />
                      <td>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="info"
                            size="sm"
                            className="me-2"
                            onClick={() => {
                              setSelectedData(project);
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
                              navigate(`/projects/edit/${project._id}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setSelectedData(project);
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
                      No Projects Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </section>

      {/* Modal (View or Delete) */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size={isDeleteModal ? "md" : "lg"}
        className=""
      >
        {isDeleteModal ? (
          <Modal.Body className="text-center p-4">
            <div className="flex justify-center mb-4">
              <img src={Delt} alt="Delete Icon" width="70" />
            </div>
            <h4 className="heading mb-3">
              Are you sure you want to delete this project?
            </h4>
            <div className="d-flex justify-content-center gap-2">
              <Button className="btn-primary" onClick={handleDelete}>
                Yes, Delete
              </Button>
              <Button
                className="btn-secondary"
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
                  src={getImageUrl(selectedData.image)}
                  alt={selectedData.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                  onError={handleImageError}
                />
              </div>

              <p>
                <strong>Category:</strong> {selectedData.category}
              </p>
              <p>
                <strong>Client:</strong> {selectedData.client}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: selectedData.description,
                  }}
                />
              </p>

              {selectedData.features?.length > 0 && (
                <>
                  <strong>Features:</strong>
                  <ul>
                    {selectedData.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              )}

              {selectedData.gallery?.length > 0 && (
                <>
                  <strong>Gallery:</strong>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {selectedData.gallery.map((img, i) => (
                      <img
                        key={i}
                        src={getImageUrl(img)}
                        alt={`Gallery ${i}`}
                        width={100}
                        height={80}
                        className="rounded border"
                        onError={handleImageError}
                      />
                    ))}
                  </div>
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
    </>
  );
}

export default ProjectsList;
