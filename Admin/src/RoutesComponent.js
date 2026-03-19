import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import Support from "./pages/Support";
import BlogsList from "./pages/contentmanagement/Blogs/BlogsList";
import CreateBlog from "./pages/contentmanagement/Blogs/CreateBlog";
import EditBlog from "./pages/contentmanagement/Blogs/EditBlog";
import ExtensionsList from "./pages/contentmanagement/Extensions/ExtensionsList";
import CreateExtension from "./pages/contentmanagement/Extensions/CreateExtension";
import EditExtension from "./pages/contentmanagement/Extensions/EditExtension";
import CreateService from "./pages/contentmanagement/Services/CreateService";
import ServiceList from "./pages/contentmanagement/Services/ServiceList";
import EditService from "./pages/contentmanagement/Services/EditService";
import ProjectsList from "./pages/contentmanagement/Projects/ProjectsList";
import CreateProject from "./pages/contentmanagement/Projects/CreateProject";
import EditProject from "./pages/contentmanagement/Projects/EditProject";
import CreateHome from "./pages/contentmanagement/Home/CreateHome";
import UpdateHome from "./pages/contentmanagement/Home/UpdateHome";
import CreateOverview from "./pages/contentmanagement/Extensions/OverView/CreateStaticPage";
import OverviewList from "./pages/contentmanagement/Extensions/OverView/OverviewList";
import EditOverview from "./pages/contentmanagement/Extensions/OverView/EditOverview";
import CreateStaticPage from "./pages/contentmanagement/Extensions/OverView/CreateStaticPage";
import EditStaticPage from "./pages/contentmanagement/Extensions/OverView/EditOverview";
import PrivacyPolicy from "./pages/contentmanagement/Content/PrivacyPolicy";
import TermsConditions from "./pages/contentmanagement/Content/TermsConditions";

function RoutesComponent() {
  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/support" element={<Support />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* <Route path="/view-user" element={<ViewUser />} /> */}

          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />

          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />

          <Route path="/extensions" element={<ExtensionsList />} />
          <Route path="/create-extension" element={<CreateExtension />} />
          <Route path="/edit/extension/:id" element={<EditExtension />} />

          <Route path="/create-services" element={<CreateService />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/service/edit/:id" element={<EditService />} />

          {/* LIST pageType: overview, userGuide, terms, privacy, faq */}
          <Route path="/pages/:pageType" element={<OverviewList />} />

          {/* CREATE static page */}
          <Route path="/create-page/:pageType" element={<CreateStaticPage />} />

          {/* EDIT static page */}
          <Route path="/edit-page/:pageType/:id" element={<EditStaticPage />} />

          <Route path="/create-home" element={<CreateHome />} />
          <Route path="/update-home" element={<UpdateHome />} />

          <Route path="/update-privacy" element={<PrivacyPolicy />} />
          <Route path="/update-terms" element={<TermsConditions />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default RoutesComponent;
