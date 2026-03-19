import express from "express";
import * as DAO from "../../DAO/index";
import * as Models from "../../models/index";
import {
  handleCatch,
  handleCustomError,
  helpers,
  sendResponse,
} from "../../middlewares/index";
import adminServices from "./admin.services";
import * as emailServices from "../../middlewares/email_services";
import { login } from "./types";
import path from 'path';
const fs = require('fs');

import qs from "qs";


class adminController {

  static async login(req: any, res: express.Response) {
    try {
      let { email, password: input_password, language = "ENGLISH" }: login = req.body
      let response: any

      let query = { email: email.toLowerCase() }
      let projection = { __v: 0 }
      let options = { lean: true }
      let fetch_data: any = await DAO.getData(Models.Admin, query, projection, options)

      if (fetch_data.length) {
        let { _id, password } = fetch_data[0]

        let decrypt = await helpers.decrypt_password(input_password, password)

        if (decrypt !== true) {
          throw await handleCustomError("INCORRECT_PASSWORD", language)
        } else {
          let generate_token = await adminServices.generateAdminToken(_id)
          response = await adminServices.makeAdminResponse(generate_token, language)
          let message = "Login Successfully"

          let resp = {
            user_details: {
              _id: response._id,
              email: response.email,
              phone_no: response.phone_no,
              name: response.name,
              access_token: response.access_token,
            },
            message: message,

          }
          sendResponse(res, resp, "Success")
        }
      } else {
        throw await handleCustomError("EMAIL_NOT_REGISTERED", language)
      }

    } catch (err) {
      handleCatch(res, err)
    }
  }

  static async viewProfile(req: any, res: any) {
    try {
      let { _id: admin_id } = req.user_data
      let query = { _id: admin_id }
      let projection = { password: 0 }
      let options = { lean: true }
      let response = await DAO.getData(Models.Admin, query, projection, options)
      let message = "Success"
      sendResponse(res, response, message)
    } catch (err) {
      handleCatch(res, err)
    }
  }

  static async updateProfile(req: any, res: express.Response) {
    try {
      let _id = req.user_data._id;
      let data = await adminServices.updateAdmin(_id, req.body, req.files || null);
      sendResponse(res, null, "Profile updated successfully.")
    } catch (err) {
      handleCatch(res, err)
    }
  }

  static async forgetPassword(req: any, res: express.Response) {
    try {
      let { email, language = "ENGLISH" } = req.body
      let query = { email: email.toLowerCase() }
      console.log(email)
      let fetch_data: any = await adminServices.verifyAdmin(query)
      console.log(fetch_data)

      if (fetch_data.length) {
        let { _id } = fetch_data[0]
        // let security_code = await helpers.gen_unique_code(Models.Admin)
        let security_code = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(security_code)

        let query = { _id: _id }
        let update = { security_code: security_code }
        let options = { new: true }
        let Update_data = await DAO.findAndUpdate(Models.Admin, query, update, options)


        await emailServices.adminForgetPasswordMail(Update_data)
        let message = "Reset Password Link is sent on your email."

        sendResponse(res, message, "Success")
      } else {
        throw await handleCustomError("EMAIL_NOT_REGISTERED", language)
      }

    } catch (err) {
      handleCatch(res, err)
    }
  }

  static async setNewPassword(req: any, res: express.Response) {
    try {
      let { password, security_code, language } = req.body
      let query = { security_code: security_code }
      let projection = { __v: 0 }
      let options = { lean: true }
      let fetch_data: any = await DAO.getData(Models.Admin, query, projection, options)

      if (fetch_data.length) {
        let { _id } = fetch_data[0]
        let bcrypt_password = await helpers.bcrypt_password(password)

        let query = { _id: _id }
        let update = { password: bcrypt_password }
        let options = { new: true }
        await DAO.findAndUpdate(Models.Admin, query, update, options)

        let message = 'New Password Set Successfully'

        if (message) {
          let query = { _id: _id }
          let update = { security_code: null }
          let options = { new: true }
          await DAO.findAndUpdate(Models.Admin, query, update, options)
        }

        sendResponse(res, message, "Success")
      } else {
        throw await handleCustomError("LINK_EXPIRED", language)
      }

    } catch (err) {
      handleCatch(res, err)
    }
  }

  static async checkSecurityCode(req: any, res: express.Response) {
    try {
      let { security_code, language } = req.body

      if (!security_code) {
        throw await handleCustomError("SECURITY_CODE_REQUIRED", language)
      }

      let query = { security_code: security_code }
      let projection = { _id: 1, email: 1 }  // return only necessary fields
      let options = { lean: true }

      let fetch_data: any = await DAO.getData(Models.Admin, query, projection, options)

      if (fetch_data.length) {
        let message = "Security code is valid."
        sendResponse(res, fetch_data[0], "Success",)
      } else {
        throw await handleCustomError("INVALID_OR_EXPIRED_CODE", language)
      }

    } catch (err) {
      handleCatch(res, err)
    }
  }

  static async changePassword(req: any, res: express.Response) {
    try {
      let { old_password, new_password, language } = req.body
      let { _id: admin_id } = req.user_data,
        session_data = req.session_data

      //check old password
      let query = { _id: admin_id }
      let projection = { __v: 0 }
      let options = { lean: true }
      let fetch_data: any = await DAO.getData(Models.Admin, query, projection, options)

      if (fetch_data.length) {
        let password = fetch_data[0].password
        let decrypt = await helpers.decrypt_password(old_password, password)
        if (!decrypt == true) {
          throw await handleCustomError("OLD_PASSWORD_MISMATCH", language)
        } else {
          let bcrypt = await helpers.bcrypt_password(new_password)
          let query = { _id: admin_id }
          let update = { password: bcrypt }
          let options = { new: true }
          await DAO.findAndUpdate(Models.Admin, query, update, options)

          await adminServices.makeAdminResponse(session_data, language)
          sendResponse(res, null, "Password changed successfully.")
        }
      } else {
        throw await handleCustomError("UNAUTHORIZED", language);
      }
    } catch (err) {
      handleCatch(res, err)
    }
  }

  // static async uploadFile(req: any, res: express.Response) {
  //   try {
  //     const { language } = req.body;

  //     if (!req.files || !req.files.file) {
  //       return handleCustomError("No file was uploaded.", language);
  //     }

  //     const uploadedFile = req.files.file;
  //     const uploadDir = path.join(__dirname, '../../public/uploads/homeImage');

  //     if (!fs.existsSync(uploadDir)) {
  //       console.log('Upload directory does not exist, creating it...');
  //       fs.mkdirSync(uploadDir, { recursive: true });
  //     }
  //     const uniqueFileName = `${Date.now()}_${uploadedFile.name}`;
  //     const uploadPath = path.join(uploadDir, uniqueFileName);
  //     uploadedFile.mv(uploadPath, (err: any) => {
  //       if (err) {
  //         console.error('Error moving file:', err);
  //         return res.status(500).send(err);
  //       }

  //       const message = 'Image uploaded successfully!';
  //       const response = {
  //         image: '/uploads/homeImage/' + uniqueFileName,
  //         message
  //       };

  //       sendResponse(res, response, "Success");
  //     });
  //   } catch (err) {
  //     console.error('Error handling upload:', err);
  //     handleCatch(res, err);
  //   }
  // }

  static async editUser(req: any, res: express.Response) {
    try {

      let createUser = await adminServices.editUser(req.body._id, req.body, req.files || null);
      sendResponse(res, createUser, "User data updated successfully.")
    } catch (err) {
      handleCatch(res, err)
    }
  }

  static async adminCreateProject(req: any, res: any) {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and description are required",
        });
      }

      // ✅ Base upload paths
      const mediaBase = path.join(process.cwd(), "public/uploads/media");
      const docBase = path.join(process.cwd(), "public/uploads/documents");

      // Ensure folders exist
      fs.mkdirSync(mediaBase, { recursive: true });
      fs.mkdirSync(docBase, { recursive: true });

      let document: string | undefined;
      let media: string[] = [];

      // ✅ Handle single document
      if (req.files?.document) {
        const docFile = Array.isArray(req.files.document)
          ? req.files.document[0]
          : req.files.document;

        const docName = Date.now() + "_" + docFile.name;
        const uploadPath = path.join(docBase, docName);

        await docFile.mv(uploadPath);

        // Save relative path for DB
        document = path.join("uploads/documents", docName);
      }

      // ✅ Handle multiple media files
      if (req.files?.media) {
        const mediaFiles = Array.isArray(req.files.media)
          ? req.files.media
          : [req.files.media];

        for (const file of mediaFiles) {
          const fileName = Date.now() + "_" + file.name;
          const uploadPath = path.join(mediaBase, fileName);

          await file.mv(uploadPath);

          media.push(path.join("uploads/media", fileName));
        }
      }

      // ✅ Save project (always insert a new one)
      const project = await adminServices.createProject({
        title,
        description,
        document,
        media,
      });

      sendResponse(res, project, "Project created successfully");
    } catch (error: any) {
      handleCatch(res, error);
    }
  }

  // static async adminUpdateProject(req: any, res: any) {
  //   try {
  //     const { id } = req.params;
  //     const { title, description } = req.body;

  //     if (!id) {
  //       return res.status(400).json({ success: false, message: "Project ID is required" });
  //     }

  //     // Validate ObjectId
  //     const { ObjectId } = require('mongoose').Types;
  //     if (!ObjectId.isValid(id)) {
  //       return res.status(400).json({ success: false, message: "Invalid Project ID" });
  //     }

  //     // Ensure upload directory exists
  //     const uploadBase = path.join(process.cwd(), "public/uploads/media");
  //     if (!fs.existsSync(uploadBase)) {
  //       fs.mkdirSync(uploadBase, { recursive: true });
  //     }

  //     // Files from express-fileupload
  //     const documentFile = req.files?.document;
  //     const mediaFiles = req.files?.mediaFiles || req.files?.['media[]'] || req.files?.media; // Handle mediaFiles

  //     console.log(documentFile)

  //     let document: string | undefined;
  //     let media: string[] = [];

  //     // Handle document (single file)
  //     if (documentFile) {
  //       const docName = Date.now() + "_" + documentFile.name;
  //       const uploadPath = path.join(uploadBase, docName);
  //       await documentFile.mv(uploadPath);
  //       document = path.join("uploads/media", docName);
  //     }


  //     // Handle media (single or multiple files)
  //     if (mediaFiles) {
  //       const filesArray = Array.isArray(mediaFiles) ? mediaFiles : [mediaFiles];
  //       for (const file of filesArray) {
  //         if (!file.mimetype.startsWith('image/')) {
  //           return res.status(400).json({ success: false, message: "Only image files are allowed" });
  //         }
  //         const fileName = Date.now() + "_" + file.name;
  //         const uploadPath = path.join(uploadBase, fileName);
  //         await file.mv(uploadPath);
  //         media.push(path.join("uploads/media", fileName));
  //       }
  //     }

  //     // Fetch existing project to preserve media if needed
  //     const existingProject = await Models.Project.findById(id);
  //     if (!existingProject) {
  //       return res.status(404).json({ success: false, message: "Project not found" });
  //     }

  //     // Prepare update payload
  //     const updateData: any = {};
  //     if (title) updateData.title = title;
  //     if (description) updateData.description = description;
  //     if (document) updateData.document = document;
  //     if (media.length > 0) {
  //       updateData.media = [...(existingProject.media || []), ...media]; // Append new media
  //     }
  //     const updatedProject = await adminServices.updateProject(id, updateData);

  //     sendResponse(res, updatedProject, "Project updated successfully");
  //   } catch (error: any) {
  //     console.error("Error in adminUpdateProject:", error);
  //     handleCatch(res, error);
  //   }
  // }

  static async createProject(req: any, res: any) {
    try {
      const file = req.files || null;
      const data = await adminServices.createProject(req.body, file);
      sendResponse(res, data, "Project created successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async getAllProjects(req: any, res: any) {
    try {
      const data = await adminServices.getAllProjects();
      sendResponse(res, data, "Projects fetched successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async getProjectById(req: any, res: any) {
    try {
      const { id } = req.params;
      const data = await adminServices.getProjectById(id);
      sendResponse(res, data, "Project fetched successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async getProjectBySlug(req: any, res: any) {
    try {
      const { slug } = req.params;
      console.log(slug)
      const data = await adminServices.getProjectBySlug(slug);
      sendResponse(res, data, "Project fetched successfully by slug.");
    } catch (err: any) {
      console.error(err);
      handleCatch(res, err);
    }
  }

  static async updateProject(req: any, res: any) {
    try {
      const { id } = req.params;
      const file = req.files || null;
      const data = await adminServices.updateProject(id, req.body, file);
      sendResponse(res, data, "Project updated successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async deleteProject(req: any, res: any) {
    try {
      const { id } = req.params;
      const data = await adminServices.deleteProject(id);
      sendResponse(res, data, "Project deleted successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async createBlogs(req: any, res: any) {
    try {
      const file = req.files || null;
      const data = await adminServices.createBlog(req.body, file);
      sendResponse(res, data, "Blog created successfully.");
    } catch (err: any) {
      console.log(err)
      handleCatch(res, err);
    }
  }

  static async getAllBlogs(req: any, res: any) {
    try {
      const data = await adminServices.getAllBlogs();
      sendResponse(res, data, "Blogs fetched successfully.");
    } catch (err: any) {
      console.log(err)
      handleCatch(res, err);
    }
  }

  static async getBlogById(req: any, res: any) {
    try {
      const { id } = req.params;
      const data = await adminServices.getBlogById(id);
      sendResponse(res, data, "Blog fetched successfully.");
    } catch (err: any) {
      console.log(err)
      handleCatch(res, err);
    }
  }

  static async getBlogBySlug(req: any, res: any) {
    try {
      const { slug } = req.params;
      console.log(slug)
      const data = await adminServices.getBlogBySlug(slug);
      sendResponse(res, data, "Blog fetched successfully by slug.");
    } catch (err: any) {
      console.error(err);
      handleCatch(res, err);
    }
  }


  static async updateBlog(req: any, res: any) {
    try {
      const { id } = req.params;
      const file = req.files || null;
      const data = await adminServices.updateBlog(id, req.body, file);
      sendResponse(res, data, "Blog updated successfully.");
    } catch (err: any) {
      console.log(err)
      handleCatch(res, err);
    }
  }

  static async deleteBlog(req: any, res: any) {
    try {
      const { id } = req.params;
      const data = await adminServices.deleteBlog(id);
      sendResponse(res, data, "Blog deleted successfully.");
    } catch (err: any) {
      console.log(err)
      handleCatch(res, err);
    }
  }

  static async createServices(req: any, res: any) {
    try {
      console.log(req.body)
      const file = req.files || null;
      const data = await adminServices.createCoreService(req.body, file);
      sendResponse(res, data, "Core Service created successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async getAllServices(req: any, res: any) {
    try {
      const data = await adminServices.getAllCoreServices();
      sendResponse(res, data, "Core Services fetched successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async getServiceById(req: any, res: any) {
    try {
      const { id } = req.params;
      const data = await adminServices.getCoreServiceById(id);
      sendResponse(res, data, "Core Service fetched successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async getServiceBySlug(req: any, res: any) {
    try {
      const { slug } = req.params;
      console.log(slug)
      const data = await adminServices.getServicesBySlug(slug);
      sendResponse(res, data, "Service fetched successfully by slug.");
    } catch (err: any) {
      console.error(err);
      handleCatch(res, err);
    }
  }

  static async updateService(req: any, res: any) {
    try {
      const { id } = req.params;
      const file = req.files || null;
      const data = await adminServices.updateCoreService(id, req.body, file);
      sendResponse(res, data, "Core Service updated successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async deleteService(req: any, res: any) {
    try {
      const { id } = req.params;
      const data = await adminServices.deleteCoreService(id);
      sendResponse(res, data, "Core Service deleted successfully.");
    } catch (err: any) {
      handleCatch(res, err);
    }
  }

  static async createExtension(req: any, res: any) {
    try {
      console.log(req.files)
      const result = await adminServices.createExtension(req.body, req.files);
      sendResponse(res, result, "Extension Created")
    } catch (error) {
      console.error(error);
      handleCatch(res, error)
    }
  }

  static async getAllExtension(req: any, res: any) {
    try {
      const result = await adminServices.getAllExtensions();
      sendResponse(res, result, "Extensions Fetched")
    } catch (error) {
      handleCatch(res, error)
    }
  }

  static async getExtensionById(req: any, res: any) {
    try {
      const result = await adminServices.getExtensionById(req.params.id);
      if (!result) return res.status(404).json({ success: false, message: "Extension not found" });
      sendResponse(res, result, "Extension Fetchted")
    } catch (error) {
      handleCatch(res, error)
    }
  }
  static async getExtensionBySlug(req: any, res: any) {
    try {
      const { slug } = req.params;
      console.log(slug)
      const data = await adminServices.getExtensionBySlug(slug);
      sendResponse(res, data, "Extension fetched successfully by slug.");
    } catch (err: any) {
      console.error(err);
      handleCatch(res, err);
    }
  }

  static async updateExtension(req: any, res: any) {
    try {
      const result = await adminServices.updateExtension(req.params.id, req.body, req.files);
      sendResponse(res, result, "Extension Updated!")
    } catch (error) {
      handleCatch(res, error)
    }
  }

  static async deleteExtension(req: any, res: any) {
    try {
      await adminServices.deleteExtension(req.params.id);
      sendResponse(res, "", "Extension Deleted")
    } catch (error) {
      handleCatch(res, error)
    }
  }

  static async createHome(req: any, res: any) {
    try {
      // ✅ 1. Parse nested FormData keys into proper objects
      const body: any = qs.parse(req.body);

      // ✅ 2. Parse contentHighlights JSON if stringified
      if (typeof body.contentHighlights === "string") {
        body.contentHighlights = JSON.parse(body.contentHighlights);
      }

      // ✅ 3. Build hero object (ensure all fields exist)
      const hero = {
        title: body.hero?.title?.trim() || "",
        subtitle: body.hero?.subtitle?.trim() || "",
        buttonText: body.hero?.buttonText?.trim() || "",
        sliderImages: [],
      };

      // 🖼 Handle multiple hero images
      if (req.files?.heroSlider) {
        const uploadedPaths = await adminServices.uploadFile(req.files.heroSlider, "home/hero");
        hero.sliderImages = (Array.isArray(uploadedPaths)
          ? uploadedPaths
          : [uploadedPaths]
        ).map((img) => ({ image: img }));
      }

      // 🤝 Handle partners
      let partners: any[] = [];
      if (req.files?.partnerLogo) {
        const uploadedPartners = await adminServices.uploadFile(req.files.partnerLogo, "home/partners");
        partners = (Array.isArray(uploadedPartners)
          ? uploadedPartners
          : [uploadedPartners]
        ).map((img) => ({ image: img }));
      }

      // 📄 Handle case studies
      let caseStudies: any[] = [];
      if (req.files?.caseStudies) {
        const uploadedCase = await adminServices.uploadFile(req.files.caseStudies, "home/case-studies");
        caseStudies = (Array.isArray(uploadedCase)
          ? uploadedCase
          : [uploadedCase]
        ).map((img) => ({ title: "Case Study", category: "Default", image: img }));
      }

      // ☎️ Contact
      const contact = {
        title: body.contact?.title?.trim() || "",
        highlights: Array.isArray(body.contact?.highlights)
          ? body.contact.highlights
          : body.contact?.highlights
            ? [body.contact.highlights]
            : [],
      };

      // ✅ 4. Construct home data
      const homeData = {
        hero,
        partners,
        contentHighlights: body.contentHighlights || [],
        caseStudies,
        contact,
      };

      // ✅ 5. Validate required fields manually before saving
      if (!hero.title || !hero.subtitle || !hero.buttonText || !contact.title) {
        return res.status(400).json({
          success: false,
          message: "Hero title, subtitle, button text, and contact title are required.",
        });
      }

      // ✅ 6. Save to DB
      const created = await Models.Home.create(homeData);
      return res.status(201).json({ success: true, data: created });
    } catch (err: any) {
      console.error("❌ Create Home Error:", err);
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // 🟡 Update Home Page
  static async updateHome(req: any, res: any) {
    try {
      // 1️⃣ Parse nested FormData structure (hero[title], contact[title], etc.)
      const body: any = qs.parse(req.body);

      // 2️⃣ Parse JSON stringified arrays (like contentHighlights)
      if (typeof body.contentHighlights === "string") {
        body.contentHighlights = JSON.parse(body.contentHighlights);
      }

      // 3️⃣ Fetch existing Home document
      const existingHome = await Models.Home.findOne();
      if (!existingHome) {
        return res.status(404).json({
          success: false,
          message: "Home data not found. Please create first.",
        });
      }

      // 4️⃣ Hero Section
      const hero = {
        title: body.hero?.title?.trim() || existingHome.hero.title,
        subtitle: body.hero?.subtitle?.trim() || existingHome.hero.subtitle,
        buttonText: body.hero?.buttonText?.trim() || existingHome.hero.buttonText,
        sliderImages: existingHome.hero.sliderImages || [],
      };

      // 🖼 Handle uploaded hero slider images (multiple)
      if (req.files?.heroSlider) {
        const uploadedPaths = await adminServices.uploadFile(req.files.heroSlider, "home/hero");
        const newImages = (Array.isArray(uploadedPaths)
          ? uploadedPaths
          : [uploadedPaths]
        ).map((img) => ({ image: img }));

        // Merge existing + new images
        hero.sliderImages = [...hero.sliderImages, ...newImages];
      }

      // 🤝 Partner Logos
      let partners = existingHome.partners || [];
      if (req.files?.partnerLogo) {
        const uploadedPartners = await adminServices.uploadFile(req.files.partnerLogo, "home/partners");
        const newPartners = (Array.isArray(uploadedPartners)
          ? uploadedPartners
          : [uploadedPartners]
        ).map((img) => ({ image: img }));
        partners = [...partners, ...newPartners];
      }

      // 🧩 Content Highlights
      const contentHighlights =
        body.contentHighlights && Array.isArray(body.contentHighlights)
          ? body.contentHighlights
          : existingHome.contentHighlights;

      // ☎️ Contact
      const contact = {
        title: body.contact?.title?.trim() || existingHome.contact.title,
        highlights: Array.isArray(body.contact?.highlights)
          ? body.contact.highlights
          : existingHome.contact.highlights,
      };

      // ✅ Final Home Data
      const homeData = {
        hero,
        partners,
        contentHighlights,
        contact,
      };

      // ✅ Update existing record
      const updated = await Models.Home.findByIdAndUpdate(existingHome._id, homeData, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Home Page updated successfully!",
        data: updated,
      });
    } catch (err: any) {
      console.error("❌ Update Home Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to update Home Page",
      });
    }
  }

  static async deleteHomeImage(req: any, res: any) {
    try {
      const { section, imagePath } = req.body;

      if (!section || !imagePath) {
        return res.status(400).json({
          success: false,
          message: "Section and imagePath are required.",
        });
      }

      // 1️⃣ Fetch home record
      const home = await Models.Home.findOne();
      if (!home) {
        return res
          .status(404)
          .json({ success: false, message: "Home data not found" });
      }

      // 2️⃣ Remove image entry from the right section
      switch (section) {
        case "hero":
          home.hero.sliderImages = home.hero.sliderImages.filter(
            (item) => item.image !== imagePath
          );
          break;

        case "partners":
          home.partners = home.partners.filter(
            (item) => item.image !== imagePath
          );
          break;

        case "caseStudies":
          home.caseStudies = home.caseStudies.filter(
            (item) => item.image !== imagePath
          );
          break;

        default:
          return res.status(400).json({
            success: false,
            message:
              "Invalid section. Use one of: hero, partners, caseStudies",
          });
      }

      // 3️⃣ Save updated document
      await home.save();

      // 4️⃣ Remove file from /uploads
      const filePath = path.join(__dirname, "../../", imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(200).json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (err: any) {
      console.error("❌ Delete Image Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to delete image",
      });
    }
  }

  static async getHome(req: any, res: any) {
    try {
      const result = await adminServices.getHome();
      sendResponse(res, result, "Home Fetched")
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // ------------------ STATIC PAGE ADMIN CONTROLLERS ------------------

  static async createStaticPage(req: any, res: any) {
    try {
      const { pageType } = req.params; // expected: userGuide | overview | terms | privacy
      const payload = req.body;
      const data = await adminServices.createStaticPage(pageType, payload);
      sendResponse(res, data, "Static page created successfully.");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getAllStaticPages(req: any, res: any) {
    try {
      const { pageType } = req.params;
      const extensionId = req.query.extensionId as string | undefined;
      const data = await adminServices.getAllStaticPages(pageType, extensionId);
      sendResponse(res, data, "Static pages fetched successfully.");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getStaticPageById(req: any, res: any) {
    try {
      const { pageType, id } = req.params;
      const data = await adminServices.getStaticPageById(pageType, id);
      sendResponse(res, data, "Static page fetched successfully.");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async updateStaticPage(req: any, res: any) {
    try {
      const { pageType, id } = req.params;
      const data = await adminServices.updateStaticPage(pageType, id, req.body);
      sendResponse(res, data, "Static page updated successfully.");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async deleteStaticPage(req: any, res: any) {
    try {
      const { pageType, id } = req.params;
      await adminServices.deleteStaticPage(pageType, id);
      sendResponse(res, null, "Static page deleted successfully.");
    } catch (err) {
      handleCatch(res, err);
    }
  }


  // static async getExtensionBySlug(req: any, res: any) {
  //   try {
  //     const { slug } = req.params;
  //     const data = await adminServices.getExtensionBySlug(slug);
  //     sendResponse(res, data, "Extension fetched successfully");
  //   } catch (err) {
  //     handleCatch(res, err);
  //   }
  // }

  static async getUserGuide(req: any, res: any) {
    try {
      const { slug } = req.params;
      const data = await adminServices.getStaticPageByExtensionSlug("userGuide", slug);
      sendResponse(res, data, "User guide fetched successfully");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getOverview(req: any, res: any) {
    try {
      const { slug } = req.params;
      const data = await adminServices.getStaticPageByExtensionSlug("overview", slug);
      sendResponse(res, data, "Overview fetched successfully");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getTerms(req: any, res: any) {
    try {
      const { slug } = req.params;
      const data = await adminServices.getStaticPageByExtensionSlug("terms", slug);
      sendResponse(res, data, "Terms & Conditions fetched successfully");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getAdminGuide(req: any, res: any) {
    try {
      const { slug } = req.params;
      const data = await adminServices.getStaticPageByExtensionSlug("adminGuide", slug);
      sendResponse(res, data, "Admin Guide fetched successfully");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getHelpPage(req: any, res: any) {
    try {
      const { slug } = req.params;
      const data = await adminServices.getStaticPageByExtensionSlug("help", slug);
      sendResponse(res, data, "Help Page fetched successfully");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getCaseStudy(req: any, res: any) {
    try {
      const { slug } = req.params;
      const data = await adminServices.getStaticPageByExtensionSlug("caseStudy", slug);
      sendResponse(res, data, "Case Study fetched successfully");
    } catch (err) {
      handleCatch(res, err);
    }
  }


  static async getPrivacy(req: any, res: any) {
    try {
      const { slug } = req.params;
      const data = await adminServices.getStaticPageByExtensionSlug("privacy", slug);
      sendResponse(res, data, "Privacy Policy fetched successfully");
    } catch (err) {
      handleCatch(res, err);
    }
  }

  static async getTermsandConditions(req: any, res: any) {
    try {
      const terms = await adminServices.getTerms();

      return sendResponse(res, terms, "Terms and Conditions Success")
    } catch (error) {
      return handleCatch(res, error)
    }
  }

  static async upsertTerms(req: any, res: any) {
    try {
      const { content } = req.body;

      if (!content)
        return res
          .status(400)
          .json({ success: false, message: "Content required" });

      const updated = await adminServices.upsertTerms(content);

      return sendResponse(res, updated, "Terms updated successfully")
    } catch (error) {
      return handleCatch(res, error)
    }
  }

  static async getPagePrivacy(req: any, res: any) {
    try {
      const policy = await adminServices.getPrivacy();

      return sendResponse(res, policy, "Fetched")
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  static async upsertPrivacy(req: any, res: any) {
    try {
      const { content } = req.body;

      if (!content)
        return res
          .status(400)
          .json({ success: false, message: "Content required" });

      const updated = await adminServices.upsertPrivacy(content);
      return sendResponse(res, updated, "Privacy Policy updated successfully")
    } catch (error) {
      return handleCatch(res, error)
    }
  }

  static async uploadEditorImage(req: any, res: any) {
    try {
      const file = req.files?.image || req.files?.file;

      if (!file) {
        return handleCustomError("FILE_NOT_UPLOAD", "No image uploaded");
      }

      // 🔥 Upload using your function
      const uploadedPath = await adminServices.uploadFile(file, "editor");

      const fullUrl = `http://api.insyrge.com/uploads/${uploadedPath}`;

      return sendResponse(res, { url: fullUrl }, "Image uploaded successfully");
    } catch (err) {
      return handleCatch(res, err);
    }
  }


};

export default adminController;
