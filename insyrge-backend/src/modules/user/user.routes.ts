import express from "express";
import userController from "./user.controller";
import authenticator from "../../middlewares/authenticator";
import adminController from "../admin/admin.controller";

const router = express.Router();

// USER ROUTES
// router.post("/sign-up", userController.signUp);
// router.post("/login", userController.login);
// router.get("/view-profile", authenticator, userController.viewProfile);
// router.post("/change-password", authenticator, userController.changePassword);
// router.post("/forgot-password", userController.forgetPassword);
// router.post("/set-new-password", userController.setNewPassword);
// router.post("/edit", authenticator, userController.edit);

router.get("/project-all", adminController.getAllProjects);
router.get("/project/:id", adminController.getProjectById);
router.get("/project/slug/:slug", adminController.getProjectBySlug);

router.get("/blogs-all", adminController.getAllBlogs);
router.get("/blog/:id", adminController.getBlogById);
router.get("/blog/slug/:slug", adminController.getBlogBySlug);

router.get("/services-all", adminController.getAllServices);
router.get("/service/:id", adminController.getServiceById);
router.get("/service/slug/:slug", adminController.getServiceBySlug);

router.get("/extension-all", adminController.getAllExtension);
router.get("/extension/:id", adminController.getExtensionById);
router.get("/extension/slug/:slug", adminController.getExtensionBySlug);

router.get("/home", adminController.getHome);


router.get("/:slug/user-guide", adminController.getUserGuide);
router.get("/:slug/overview", adminController.getOverview);
router.get("/:slug/terms", adminController.getTerms);
router.get("/:slug/privacy-policy", adminController.getPrivacy);
router.get("/:slug/admin-guide", adminController.getAdminGuide);
router.get("/:slug/help", adminController.getHelpPage);
router.get("/:slug/case-study", adminController.getCaseStudy);

router.get("/privacy", adminController.getPagePrivacy);
router.get("/terms-and-conditions", adminController.getTermsandConditions);

export default router;
