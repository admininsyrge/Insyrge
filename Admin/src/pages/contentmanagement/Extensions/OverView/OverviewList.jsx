import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../../../components/Loader";
import Delt from "../../../../Assets/Images/del.svg";
import axios from "axios";
import { toast } from "react-toastify";

import {
  BASE_URL_ADMIN,
  BASE_URL_USER,
  GET_EXTENSION,
  GET_STATIC_PAGES, // dynamic GET:  (pageType) => `/admin/static/${pageType}`
  DELETE_STATIC_PAGE, // dynamic DELETE: (pageType, id) => `/admin/static/${pageType}/${id}`
} from "../../../../API";

function OverviewList() {
  const navigate = useNavigate();
  const { pageType } = useParams(); // <-- dynamic page type

  const [pageList, setPageList] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [show, setShow] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ----------------- Dynamic Page Name Mapping -----------------
  const pageLabelMap = {
    overview: "Overview",
    userGuide: "User Guide",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    faq: "FAQs",
    adminGuide: "Admin Guide", // NEW
    help: "Help Page", // NEW
    caseStudy: "Case Study", // NEW
  };

  const pageLabel = pageLabelMap[pageType] || "Static Page";

  // ----------------- Fetch All Static Pages -----------------
  const fetchPages = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${BASE_URL_ADMIN}${GET_STATIC_PAGES(pageType)}`,
        { headers: { Token: localStorage.getItem("token") } }
      );
      setPageList(res.data.data || []);
    } catch (err) {
      toast.error(`Failed to load ${pageLabel}!`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- Fetch All Extensions -----------------
  const fetchExtensions = async () => {
    try {
      const res = await axios.get(`${BASE_URL_USER}${GET_EXTENSION}`);
      setExtensions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching extensions:", err);
    }
  };

  useEffect(() => {
    fetchExtensions();
    fetchPages();
  }, [pageType]); // re-fetch when pageType changes

  // ----------------- Find Extension Name -----------------
  const getExtensionName = (id) => {
    return extensions.find((e) => e._id === id)?.title || "Unknown Extension";
  };

  // ----------------- Delete Handler -----------------
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${BASE_URL_ADMIN}${DELETE_STATIC_PAGE(pageType, selectedData._id)}`,
        { headers: { Token: localStorage.getItem("token") } }
      );

      setPageList(pageList.filter((o) => o._id !== selectedData._id));
      toast.success(`${pageLabel} deleted successfully!`);
      setShow(false);
    } catch (err) {
      toast.error(`Failed to delete ${pageLabel}!`);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- Search Filter -----------------
  const filteredList = pageList.filter((o) =>
    o.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                  <h6>{pageLabel} Pages</h6>

                  <div className="dropdowns-inner-list d-flex">
                    <div className="icon-search-main">
                      <Form.Control
                        type="text"
                        placeholder={`Search ${pageLabel}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <button
                      className="ms-2 add-notification-btn"
                      onClick={() => navigate(`/create-page/${pageType}`)}
                    >
                      + Create {pageLabel}
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="notification-table pt-0">
                  <Table bordered hover responsive>
                    <thead>
                      <tr className="head-class-td">
                        <th>Sr. No.</th>
                        <th>Title</th>
                        <th>Extension</th>
                        {/* <th>Content Preview</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredList.length > 0 ? (
                        filteredList.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{getExtensionName(item.extensionId)}</td>

                            {/* <td
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.content
                                    .replace(/<[^>]+>/g, "")
                                    .substring(0, 50) + "...",
                              }}
                            /> */}

                            <td>
                              <div className="d-flex table_action_btn_group">
                                {/* VIEW */}
                                <Button
                                  size="md"
                                  variant="info"
                                  className="me-2"
                                  onClick={() => {
                                    setSelectedData(item);
                                    setIsDeleteModal(false);
                                    setShow(true);
                                  }}
                                >
                                  View
                                </Button>

                                {/* EDIT */}
                                <Button
                                  size="md"
                                  variant="warning"
                                  className="me-2"
                                  onClick={() =>
                                    navigate(
                                      `/edit-page/${pageType}/${item._id}`
                                    )
                                  }
                                >
                                  Edit
                                </Button>

                                {/* DELETE */}
                                <Button
                                  size="md"
                                  variant="danger"
                                  onClick={() => {
                                    setSelectedData(item);
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
                          <td className="text-center" colSpan="5">
                            No {pageLabel} Found
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

        {/* View / Delete Modal */}
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
                Are you sure you want to delete this {pageLabel}?
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
                <h4 className="mb-2">{selectedData.title}</h4>

                <p>
                  <strong>Extension: </strong>
                  {getExtensionName(selectedData.extensionId)}
                </p>

                <div
                  className="mt-3"
                  dangerouslySetInnerHTML={{ __html: selectedData.content }}
                />

                <p className="mt-3">
                  <small>
                    <strong>Created At: </strong>
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

export default OverviewList;
