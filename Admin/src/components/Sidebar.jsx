import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import deleteimg from "../Assets/Images/logImage.svg";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  // ACTIVE MENU
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  // COLLAPSE STATE
  const [collapseExtensions, setCollapseExtensions] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
    setShow(false);
  };

  // Static pages inside extensions
  // Static pages inside extensions
  const staticPages = [
    { label: "Overview", route: "/pages/overview" },
    { label: "User Guide", route: "/pages/userGuide" },
    { label: "Admin Guide", route: "/pages/adminGuide" }, // NEW
    { label: "Help Page", route: "/pages/help" }, // NEW
    { label: "Case Study", route: "/pages/caseStudy" }, // NEW
    { label: "Terms & Conditions", route: "/pages/terms" },
    { label: "Privacy Policy", route: "/pages/privacy" },
  ];

  return (
    <>
      <div className={`sidebar col-3 ${isToggled ? "active-sidebar" : ""}`}>
        <div className="toggl-main" onClick={() => setIsToggled(!isToggled)}>
          <i className="fa-solid fa-bars"></i>
        </div>

        <div className="sidebar-wrapper d-flex">
          <div className="sidebar-content">
            {/* LOGO */}
            <div className="sidebar-logo">
              <figure
                className="text-center"
                onClick={() => navigate("/projects")}
              >
                <img src="/logo.png" className="img-fluid" alt="Logo" />
              </figure>
            </div>

            <ul className="slide-navli">
              {/* CONTENT SECTION */}
              <li className="sidebar-section-heading">Content</li>

              <li
                className={`inner-slide-li subitem ${
                  activeMenu === "/projects" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("/projects");
                  navigate("/projects");
                }}
              >
                Projects
              </li>

              <li
                className={`inner-slide-li subitem ${
                  activeMenu === "/blogs" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("/blogs");
                  navigate("/blogs");
                }}
              >
                Blogs
              </li>

              <li
                className={`inner-slide-li subitem ${
                  activeMenu === "/services" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("/services");
                  navigate("/services");
                }}
              >
                Services
              </li>

              <li
                className={`inner-slide-li subitem ${
                  activeMenu === "/update-home" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("/update-home");
                  navigate("/update-home");
                }}
              >
                Update Home
              </li>

              {/* EXTENSION SECTION */}
              <li className="sidebar-section-heading">Manage Extensions</li>

              {/* PARENT COLLAPSE BUTTON */}
              <li
                className={`inner-slide-li subitem parent-menu ${
                  collapseExtensions ? "opened" : ""
                }`}
                onClick={() => setCollapseExtensions(!collapseExtensions)}
              >
                <span>Extensions</span>
                <i
                  className={`fa-solid fa-chevron-down collapse-arrow ${
                    collapseExtensions ? "rotate" : ""
                  }`}
                ></i>
              </li>

              {/* CHILD MENUS */}
              {collapseExtensions && (
                <ul className="submenu-list">
                  {/* Main Extensions List */}
                  <li
                    className={`inner-slide-li subitem child-menu ${
                      activeMenu === "/extensions" ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveMenu("/extensions");
                      navigate("/extensions");
                    }}
                  >
                    All Extensions
                  </li>

                  {staticPages.map((item) => (
                    <li
                      key={item.route}
                      className={`inner-slide-li subitem child-menu ${
                        activeMenu === item.route ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveMenu(item.route);
                        navigate(item.route);
                      }}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
              <li className="sidebar-section-heading">Legal</li>

              <li
                className={`inner-slide-li subitem ${
                  activeMenu === "/update-privacy" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("/update-privacy");
                  navigate("/update-privacy");
                }}
              >
                Privacy Policy
              </li>

              <li
                className={`inner-slide-li subitem ${
                  activeMenu === "/update-terms" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("/update-terms");
                  navigate("/update-terms");
                }}
              >
                Terms and Condition's
              </li>

              {/* ACCOUNT SECTION */}
              <li className="sidebar-section-heading">Account</li>

              <li
                className={`inner-slide-li subitem ${
                  activeMenu === "/profile" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("/profile");
                  navigate("/profile");
                }}
              >
                Settings
              </li>

              <li
                className="inner-slide-li logout subitem"
                onClick={() => setShow(true)}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        className="modal-delete-logout"
      >
        <Modal.Body className="p-0">
          <div className="inner-body-delete-logout">
            <div className="img-modal">
              <figure>
                <img src={deleteimg} alt="Logout Confirm" />
              </figure>
            </div>
            <h4>Are you sure you want to logout?</h4>
            <div className="upper-btns-modal-pair">
              <Button className="comn-modal-btns-blue" onClick={logoutHandler}>
                Yes, Logout
              </Button>
              <Button
                className="comn-modal-btns-transparent"
                onClick={() => setShow(false)}
              >
                No, Stay Here
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Sidebar;
