import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  FolderKanban, PenLine, Briefcase, Home,
  Puzzle, Shield, FileText, Settings, LogOut, ChevronDown,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const [collapseExtensions, setCollapseExtensions] = useState(
    location.pathname.startsWith("/extensions") ||
    location.pathname.startsWith("/pages/") ||
    location.pathname.startsWith("/create-extension") ||
    location.pathname.startsWith("/edit/extension")
  );

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
    setShow(false);
  };

  const staticPages = [
    { label: "Overview", route: "/pages/overview" },
    { label: "User Guide", route: "/pages/userGuide" },
    { label: "Admin Guide", route: "/pages/adminGuide" },
    { label: "Help Page", route: "/pages/help" },
    { label: "Case Study", route: "/pages/caseStudy" },
    { label: "Terms & Conditions", route: "/pages/terms" },
    { label: "Privacy Policy", route: "/pages/privacy" },
  ];

  const MenuItem = ({ icon, label, route }) => {
    const isActive = activeMenu === route;
    return (
      <li
        onClick={() => { setActiveMenu(route); navigate(route); }}
        className={`flex items-center gap-3 px-4 py-2.5 mx-3 rounded-lg cursor-pointer transition-all duration-200 text-sm
          ${isActive
            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
            : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
          }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </li>
    );
  };

  return (
    <>
      <aside className="fixed top-0 left-0 w-sidebar h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-40 flex flex-col overflow-y-auto scrollbar-thin">
        {/* Logo */}
        <div
          className="h-[72px] flex items-center justify-center border-b border-slate-700/50 shrink-0 cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          <img src="/logo.png" className="h-10 object-contain brightness-110" alt="Insyrge" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-5 space-y-1">
          {/* Content Section */}
          <p className="px-6 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Content</p>
          <ul className="space-y-0.5">
            <MenuItem icon={<FolderKanban size={18} />} label="Projects" route="/projects" />
            <MenuItem icon={<PenLine size={18} />} label="Blogs" route="/blogs" />
            <MenuItem icon={<Briefcase size={18} />} label="Services" route="/services" />
            <MenuItem icon={<Home size={18} />} label="Update Home" route="/update-home" />
          </ul>

          {/* Extensions Section */}
          <p className="px-6 pt-6 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Extensions</p>
          <ul className="space-y-0.5">
            <li
              onClick={() => setCollapseExtensions(!collapseExtensions)}
              className="flex items-center justify-between px-4 py-2.5 mx-3 rounded-lg cursor-pointer text-slate-300 hover:bg-slate-700/60 hover:text-white transition-all text-sm"
            >
              <div className="flex items-center gap-3">
                <Puzzle size={18} />
                <span className="font-medium">Extensions</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${collapseExtensions ? "rotate-180" : ""}`}
              />
            </li>

            {collapseExtensions && (
              <ul className="ml-8 space-y-0.5 border-l border-slate-600/50 pl-3">
                <li
                  onClick={() => { setActiveMenu("/extensions"); navigate("/extensions"); }}
                  className={`py-2 px-3 rounded-md cursor-pointer text-sm transition-colors
                    ${activeMenu === "/extensions" ? "text-emerald-400 font-semibold bg-slate-700/40" : "text-slate-400 hover:text-white"}`}
                >
                  All Extensions
                </li>
                {staticPages.map((item) => (
                  <li
                    key={item.route}
                    onClick={() => { setActiveMenu(item.route); navigate(item.route); }}
                    className={`py-2 px-3 rounded-md cursor-pointer text-sm transition-colors
                      ${activeMenu === item.route ? "text-emerald-400 font-semibold bg-slate-700/40" : "text-slate-400 hover:text-white"}`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </ul>

          {/* Legal Section */}
          <p className="px-6 pt-6 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal</p>
          <ul className="space-y-0.5">
            <MenuItem icon={<Shield size={18} />} label="Privacy Policy" route="/update-privacy" />
            <MenuItem icon={<FileText size={18} />} label="Terms & Conditions" route="/update-terms" />
          </ul>

          {/* Account Section */}
          <p className="px-6 pt-6 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Account</p>
          <ul className="space-y-0.5">
            <MenuItem icon={<Settings size={18} />} label="Settings" route="/profile" />
            <li
              onClick={() => setShow(true)}
              className="flex items-center gap-3 px-4 py-2.5 mx-3 rounded-lg cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Logout Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body className="text-center p-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={28} className="text-red-500" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Logout</h4>
          <p className="text-gray-500 text-sm mb-6">Are you sure you want to logout?</p>
          <div className="flex justify-center gap-3">
            <button className="btn-primary" onClick={logoutHandler}>Yes, Logout</button>
            <button className="btn-secondary" onClick={() => setShow(false)}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Sidebar;
