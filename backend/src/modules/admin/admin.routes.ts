import express from "express";
import adminController from "./admin.controller";
import authenticator from "../../middlewares/authenticator";
import userController from "../user/user.controller";

const router = express.Router();
// Profile apis
router.post("/login", adminController.login)
router.get("/view-profile", authenticator, adminController.viewProfile)
router.post("/update-profile", authenticator, adminController.updateProfile)
router.put("/forgot-password", adminController.forgetPassword)
router.post("/set-new-password", adminController.setNewPassword)
router.post("/check-security-code", adminController.checkSecurityCode)
router.put("/change-password", authenticator, adminController.changePassword)

//====================Projects Routes=======================
router.post("/project", authenticator, adminController.createProject);
router.get("/project-all", adminController.getAllProjects);
router.get("/project/:id", adminController.getProjectById);
router.get("/project/slug/:slug", adminController.getProjectBySlug);
router.put("/project/:id", authenticator, adminController.updateProject);
router.delete("/project/:id", authenticator, adminController.deleteProject);

// ------------------------- BLOG MANAGEMENT ROUTES -------------------------
router.post("/blog", authenticator, adminController.createBlogs);
router.get("/blogs-all", adminController.getAllBlogs);
router.get("/blog/:id", adminController.getBlogById);
router.get("/blog/slug/:slug", adminController.getBlogBySlug);
router.put("/blog/:id", authenticator, adminController.updateBlog);
router.delete("/blog/:id", authenticator, adminController.deleteBlog);

// ------------------------- Core Services MANAGEMENT ROUTES -------------------------
router.post("/service", authenticator, adminController.createServices);
router.get("/services-all", adminController.getAllServices);
router.get("/service/:id", adminController.getServiceById);
router.get("/service/slug/:slug", adminController.getServiceBySlug);
router.put("/service/:id", authenticator, adminController.updateService);
router.delete("/service/:id", authenticator, adminController.deleteService);

router.post("/create-extension", authenticator, adminController.createExtension);
router.get("/extension-all", adminController.getAllExtension);
router.get("/extension/:id", adminController.getExtensionById);
router.get("/extension/slug/:slug", adminController.getExtensionBySlug);
router.patch("/extension/:id", authenticator, adminController.updateExtension);
router.delete("/extension/:id", authenticator, adminController.deleteExtension);

router.post("/home", authenticator, adminController.createHome);
router.put("/home", authenticator, adminController.updateHome);
router.delete("/home/delete-image", adminController.deleteHomeImage);
router.get("/home", adminController.getHome);

/**
 * Admin static page CRUD
 * POST   /admin/static/:pageType
 * GET    /admin/static/:pageType
 * GET    /admin/static/:pageType/:id
 * PUT    /admin/static/:pageType/:id
 * DELETE /admin/static/:pageType/:id
 *
 * pageType = userGuide | overview | terms | privacy
 */

router.post("/static/:pageType", authenticator, adminController.createStaticPage);
router.get("/static/:pageType", adminController.getAllStaticPages);
router.get("/static/:pageType/:id", adminController.getStaticPageById);
router.patch("/static/:pageType/:id", authenticator, adminController.updateStaticPage);
router.delete("/static/:pageType/:id", authenticator, adminController.deleteStaticPage);

router.get("/terms-and-conditions", adminController.getTermsandConditions);
router.put("/terms-and-conditions", authenticator, authenticator, adminController.upsertTerms);


router.get("/privacy", adminController.getPagePrivacy);
router.put("/privacy", authenticator, adminController.upsertPrivacy);

router.post("/upload-editor-image", adminController.uploadEditorImage);

export default router;