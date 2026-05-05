import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import deleteimg from "../Assets/Images/logImage.svg";
import Modal from "react-bootstrap/esm/Modal";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  FolderKanban,
  PenLine,
  Briefcase,
  Home,
  Puzzle,
  Shield,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  // ACTIVE MENU — sync with route on every navigation
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  // COLLAPSE STATE
  const [collapseExtensions, setCollapseExtensions] = useState(
    location.pathname.startsWith("/extensions") ||
      location.pathname.startsWith("/pages/") ||
      location.pathname.startsWith("/create-extension") ||
      location.pathname.startsWith("/edit/extension"),
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
    setShow(false);
  };

  // Static pages inside extensions
  const staticPages = [
    { label: "Overview", route: "/pages/overview" },
    { label: "User Guide", route: "/pages/userGuide" },
    { label: "Admin Guide", route: "/pages/adminGuide" },
    { label: "Help Page", route: "/pages/help" },
    { label: "Case Study", route: "/pages/caseStudy" },
    { label: "Terms & Conditions", route: "/pages/terms" },
    { label: "Privacy Policy", route: "/pages/privacy" },
  ];

  const menuItem = (icon, label, route) => (
    <li
      key={route}
      className={`inner-slide-li subitem ${
        activeMenu === route ? "active" : ""
      }`}
      onClick={() => {
        setActiveMenu(route);
        navigate(route);
      }}
    >
      {icon}
      <span>{label}</span>
    </li>
  );

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
                style={{ cursor: "pointer" }}
              >
                <img src="/logo.png" className="img-fluid" alt="Logo" />
              </figure>
            </div>

            <ul className="slide-navli">
              {/* CONTENT SECTION */}
              <li className="sidebar-section-heading">Content</li>

              {menuItem(<FolderKanban size={18} />, "Projects", "/projects")}
              {menuItem(<PenLine size={18} />, "Blogs", "/blogs")}
              {menuItem(<Briefcase size={18} />, "Services", "/services")}
              {menuItem(<Home size={18} />, "Update Home", "/update-home")}

              {/* EXTENSION SECTION */}
              <li className="sidebar-section-heading">Manage Extensions</li>

              {/* PARENT COLLAPSE BUTTON */}
              <li
                className={`inner-slide-li subitem parent-menu ${
                  collapseExtensions ? "opened" : ""
                }`}
                onClick={() => setCollapseExtensions(!collapseExtensions)}
              >
                <Puzzle size={18} />
                <span>Extensions</span>
                <ChevronDown
                  size={16}
                  className={`collapse-arrow ${
                    collapseExtensions ? "rotate" : ""
                  }`}
                />
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

              {menuItem(
                <Shield size={18} />,
                "Privacy Policy",
                "/update-privacy",
              )}
              {menuItem(
                <FileText size={18} />,
                "Terms and Conditions",
                "/update-terms",
              )}

              {/* ACCOUNT SECTION */}
              <li className="sidebar-section-heading">Account</li>

              {menuItem(<Settings size={18} />, "Settings", "/profile")}

              <li
                className="inner-slide-li logout subitem"
                onClick={() => setShow(true)}
              >
                <LogOut size={18} />
                <span>Logout</span>
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
