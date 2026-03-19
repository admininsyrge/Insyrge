import * as DAO from '../../DAO/index';
import * as Models from '../../models';
import { app_constant } from '../../config/index';
const admin_scope = app_constant.scope.admin;
import { generate_token, handleCustomError, helpers } from '../../middlewares/index';
import path from 'path';
import fs from "fs";
import { IHome } from '../../models/home';



class adminServices {

    static async saveSessionData(access_token: any, token_data: any) {
        try {
            let { _id: admin_id, token_gen_at, expire_time } = token_data
            let set_data = {
                type: "ADMIN",
                admin_id: admin_id,
                access_token: access_token,
                token_gen_at: token_gen_at,
                created_at: +new Date(),
                expire_time: expire_time
            }
            let response = await DAO.saveData(Models.Sessions, set_data)
            return response

        } catch (err) {
            throw err;
        }
    }

    static async fetchAdminToken(token_data: any) {
        try {
            let access_token = await generate_token(token_data)
            let response = await this.saveSessionData(access_token, token_data)
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async fetchTotalCount(collection: any, query: any) {
        try {
            let response = await DAO.countData(collection, query);
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async generateAdminToken(_id: string) {
        try {
            let token_data = {
                _id: _id,
                scope: admin_scope,
                collection: Models.Admin,
                token_gen_at: +new Date()
            }
            let response = await this.fetchAdminToken(token_data)
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async makeAdminResponse(data: any, language: string) {
        try {
            let { admin_id, token_gen_at, access_token } = data


            let query = { _id: admin_id }
            let projection = { password: 0 }
            let options = { lean: true }
            let fetch_data: any = await DAO.getData(Models.Admin, query, projection, options)

            if (fetch_data.length) {
                fetch_data[0].access_token = access_token
                fetch_data[0].token_gen_at = token_gen_at

                return fetch_data[0]
            } else {
                throw await handleCustomError('UNAUTHORIZED', language)
            }

        } catch (err) {
            throw err;
        }
    }

    static async verifyAdmin(query: any) {
        try {
            let projection = { __v: 0 }
            let options = { lean: true }
            let response = await DAO.getData(Models.Admin, query, projection, options)
            return response
        } catch (err) {
            throw err;
        }
    }

    // static async uploadFile(file: any, uploadPath: string) {
    //     try {
    //         if (!file || !file.file) {
    //             handleCustomError("FILE_NOT_UPLOAD", 'ENGLISH');
    //         }

    //         const uploadedFile = file.file;
    //         const uploadDir = path.join(__dirname, '../../public/' + uploadPath);

    //         if (!fs.existsSync(uploadDir)) {
    //             fs.mkdirSync(uploadDir, { recursive: true });
    //         }

    //         const uniqueFileName = `${Date.now()}_${uploadedFile.name}`;
    //         const finalPath = path.join(uploadDir, uniqueFileName);

    //         await new Promise<void>((resolve, reject) => {
    //             uploadedFile.mv(finalPath, (err) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             });
    //         });

    //         const imagePath = path.join(uploadPath, uniqueFileName);
    //         return imagePath;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // static async uploadFile(file: any, uploadPath: string) {
    //     try {
    //         const uploadedFile = file.image || file.file;
    //         if (!uploadedFile) throw await handleCustomError("FILE_NOT_UPLOAD", "ENGLISH");

    //         const uploadDir = path.join(__dirname, "../../uploads", uploadPath);
    //         if (!fs.existsSync(uploadDir)) {
    //             fs.mkdirSync(uploadDir, { recursive: true });
    //         }

    //         const uniqueFileName = `${Date.now()}_${uploadedFile.name}`;
    //         const finalPath = path.join(uploadDir, uniqueFileName);

    //         await uploadedFile.mv(finalPath);

    //         const relativePath = path.join(uploadPath, uniqueFileName).replace(/\\/g, "/");
    //         return relativePath;
    //     }
    //     catch (err) {
    //         throw err;
    //     }
    // }

    static async uploadFile(file: any, uploadPath: any) {
        try {
            // Check if files exist
            const uploadedFiles = file?.image || file?.file || file;
            if (!uploadedFiles)
                throw await handleCustomError("FILE_NOT_UPLOAD", "ENGLISH");

            const uploadDir = path.join(__dirname, "../../uploads", uploadPath);
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Helper to upload a single file
            const moveFile = async (fileItem: any): Promise<any> => {
                const uniqueFileName = `${Date.now()}_${fileItem.name.replace(/\s+/g, "_")}`;
                const finalPath = path.join(uploadDir, uniqueFileName);
                await fileItem.mv(finalPath);
                return path.join(uploadPath, uniqueFileName).replace(/\\/g, "/");
            };

            // If multiple files (array)
            if (Array.isArray(uploadedFiles)) {
                const uploadedPaths: any[] = [];
                for (const fileItem of uploadedFiles) {
                    const relativePath = await moveFile(fileItem);
                    uploadedPaths.push(relativePath);
                }
                return uploadedPaths; // return array
            }

            // If single file
            const relativePath = await moveFile(uploadedFiles);
            return relativePath; // return string
        } catch (err) {
            throw err;
        }
    }

    static async editUser(id: any, req_data: any, file: any) {
        try {

            const { first_name, last_name, email, contact_no, business_name, country, state, city, description, language } = req_data
            const projection = { __v: 0 }
            const options = { lean: true }
            const check: any = await DAO.getData(Models.User, { _id: id }, projection, options);
            if (!check.length) {
                throw await handleCustomError("NO_DATA_FOUND", language)
            }

            const data: any = {
                first_name: first_name,
                last_name: last_name,
                contact_no: contact_no,
                business_name: business_name,
                country: country,
                state: state,
                city: city,
                description: description,
            }
            if (file) {
                let image = await this.uploadFile(file, 'uploads/user/image');
                data.image = image
            }
            const response = await DAO.findAndUpdate(Models.User, { _id: id }, data, options)
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async updateAdmin(id: any, req_data: any, file: any) {
        try {
            const { name, language = 'ENGLISH' } = req_data;
            const projection = { __v: 0 };
            const options = { lean: true };
            const check: any = await DAO.getData(Models.Admin, { _id: id }, projection, options);
            if (!check.length) {
                throw await handleCustomError("NO_DATA_FOUND", language);
            }

            const data: any = {
                name: name,
            };

            if (file) {
                let image = await this.uploadFile(file, 'uploads/admin/image');
                data.image = image;
            }

            const response = await DAO.findAndUpdate(Models.Admin, { _id: id }, data, options);
            return response;
        } catch (err) {
            throw err;
        }
    }

    // =================== Projects SERVICES =================== 

    static async createProject(payload: any, file?: any) {
        try {
            const { slug, title, category, client, description, features, gallery, language = "ENGLISH" } = payload;

            let imagePath = "";
            if (file) {
                imagePath = await this.uploadFile(file, "uploads/projects/image");
            }

            const setData = {
                slug,
                title,
                category,
                client,
                description,
                image: imagePath,
                features,
                gallery,
            };

            const response = await DAO.saveData(Models.Project, setData);
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async getAllProjects() {
        try {
            const projection = { __v: 0 };
            const options = { lean: true, sort: { createdAt: -1 } };
            const response = await DAO.getData(Models.Project, {}, projection, options);
            return response;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    static async getProjectById(id: string, language = "ENGLISH") {
        try {
            const projection = { __v: 0 };
            const options = { lean: true };
            const check = await DAO.getData(Models.Project, { _id: id }, projection, options);
            if (!check.length) throw await handleCustomError("NO_DATA_FOUND", language);
            return check[0];
        } catch (err) {
            throw err;
        }
    }
    static async getProjectBySlug(slug: string, language = "ENGLISH") {
        try {
            const projection = { __v: 0 };
            const options = { lean: true };
            const check = await DAO.getSingleData(Models.Project, { slug: slug }, projection, options);

            if (!check) throw await handleCustomError("NO_DATA_FOUND", language);
            return check;
        } catch (err) {
            throw err;
        }
    }

    static async updateProject(id: string, payload: any, files?: any) {
        try {
            const { title, category, client, description, language = "ENGLISH" } = payload;

            const existing = await DAO.getSingleData(Models.Project, { _id: id });
            if (!existing) throw await handleCustomError("NO_DATA_FOUND", language);

            // ✅ FEATURES (always flat)
            let parsedFeatures: string[] = [];

            if (payload.features) {
                // Case 1: Already array
                if (Array.isArray(payload.features)) {
                    parsedFeatures = payload.features.flat(); // flatten if nested
                } else if (typeof payload.features === "string") {
                    try {
                        const json = JSON.parse(payload.features);
                        parsedFeatures = Array.isArray(json) ? json.flat() : [json];
                    } catch {
                        parsedFeatures = [payload.features];
                    }
                }
            } else {
                // Case 2: FormData with features[0], features[1]...
                const keys = Object.keys(payload).filter((k) => k.startsWith("features["));
                parsedFeatures = keys.map((k) => payload[k]).flat();
            }

            // ✅ GALLERY
            let galleryPaths = existing.gallery || [];

            if (files?.gallery) {
                const galleryFiles = Array.isArray(files.gallery)
                    ? files.gallery
                    : [files.gallery];
                const uploadedGallery = await Promise.all(
                    galleryFiles.map((f) =>
                        this.uploadFile(f, "uploads/projects/gallery")
                    )
                );
                galleryPaths = [...galleryPaths, ...uploadedGallery];
            } else if (payload.gallery) {
                try {
                    const parsed = JSON.parse(payload.gallery);
                    galleryPaths = Array.isArray(parsed) ? parsed : [parsed];
                } catch {
                    galleryPaths = [payload.gallery];
                }
            }

            // ✅ MAIN IMAGE
            let imagePath = existing.image;
            if (files?.image) {
                imagePath = await this.uploadFile(files.image, "uploads/projects/image");
            }

            // ✅ FINAL DATA
            const updateData = {
                title,
                category,
                client,
                description,
                features: parsedFeatures, // ✅ always array of strings
                gallery: galleryPaths,
                image: imagePath,
            };

            const response = await DAO.findAndUpdate(
                Models.Project,
                { _id: id },
                updateData,
                { new: true }
            );

            return response;
        } catch (err) {
            console.error("❌ Error updating project:", err);
            throw err;
        }
    }

    static async deleteProject(id: string, language = "ENGLISH") {
        try {
            const check = await DAO.getData(Models.Project, { _id: id }, {}, { lean: true });
            console.log(check)
            if (!check.length) throw await handleCustomError("NO_DATA_FOUND", language);

            const response = await DAO.removeData(Models.Project, { _id: id });
            return response;
        } catch (err) {
            throw err;
        }
    }

    // =================== BLOG SERVICES =================== 

    static async createBlog(payload: any, file?: any) {
        try {
            const {
                title,
                slug,
                subTitle,
                description,
                shortDescription,
                author,
                category,
                language = "ENGLISH",
            } = payload;

            let imagePath = "";
            if (file) {
                imagePath = await this.uploadFile(file, "uploads/blogs/image");
            }

            const data = {
                title,
                slug,
                subTitle,
                description,
                shortDescription,
                author,
                category,
                image: imagePath,
            };

            const response = await DAO.saveData(Models.Blog, data);
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async getAllBlogs() {
        try {
            const projection = { __v: 0 };
            const options = { lean: true, sort: { createdAt: -1 } };
            const response = await DAO.getData(Models.Blog, {}, projection, options);
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async getBlogById(id: string, language = "ENGLISH") {
        try {
            const projection = { __v: 0 };
            const options = { lean: true };
            const check = await DAO.getData(Models.Blog, { _id: id }, projection, options);
            if (!check.length) throw await handleCustomError("NO_DATA_FOUND", language);
            return check[0];
        } catch (err) {
            throw err;
        }
    }
    static async getBlogBySlug(slug: string, language = "ENGLISH") {
        try {
            const projection = { __v: 0 };
            const options = { lean: true };
            const check = await DAO.getSingleData(Models.Blog, { slug: slug }, projection, options);

            if (!check) throw await handleCustomError("NO_DATA_FOUND", language);
            return check;
        } catch (err) {
            throw err;
        }
    }


    static async updateBlog(id: string, payload: any, file?: any) {
        try {
            const {
                title,
                slug,
                subTitle,
                description,
                shortDescription,
                author,
                category,
                language = "ENGLISH",
            } = payload;

            const check: any = await DAO.getData(Models.Blog, { _id: id }, {}, { lean: true });
            if (!check.length) throw await handleCustomError("NO_DATA_FOUND", language);

            const data: any = {
                title,
                slug,
                subTitle,
                description,
                shortDescription,
                author,
                category,
            };

            if (file) {
                const imagePath = await this.uploadFile(file, "uploads/blogs/image");
                data.image = imagePath;
            }

            const response = await DAO.findAndUpdate(Models.Blog, { _id: id }, data, { new: true });
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async deleteBlog(id: string, language = "ENGLISH") {
        try {
            const check = await DAO.getData(Models.Blog, { _id: id }, {}, { lean: true });
            if (!check.length) throw await handleCustomError("NO_DATA_FOUND", language);

            const response = await DAO.removeData(Models.Blog, { _id: id });
            return response;
        } catch (err) {
            throw err;
        }
    }

    // =================== CORE SERVICES ===================
    static async createCoreService(payload: any, file?: any) {
        try {
            const { title, description, button, url, slug, language = "ENGLISH" } = payload;

            // ✅ Points parsing (same as your logic)
            let points: string[] = [];

            if (Array.isArray(payload.points)) {
                points = payload.points;
            } else if (typeof payload.points === "string") {
                try {
                    points = JSON.parse(payload.points);
                } catch {
                    points = [payload.points];
                }
            } else {
                const extracted = Object.keys(payload)
                    .filter((key) => key.startsWith("points["))
                    .sort()
                    .map((key) => payload[key])
                    .filter(Boolean);

                if (extracted.length > 0) points = extracted;
            }

            if (!points.length) {
                throw await handleCustomError("POINTS_REQUIRED", language);
            }

            // ✅ Image is REQUIRED as per schema
            if (!file) {
                throw await handleCustomError("IMAGE_REQUIRED", language);
            }

            const imagePath = await this.uploadFile(file, "uploads/core-services/image");

            // ✅ Slug must be unique
            const slugCheck = await DAO.getSingleData(
                Models.CoreService,
                { slug },
                {},
                { lean: true }
            );

            if (slugCheck) {
                throw await handleCustomError("SLUG_ALREADY_EXISTS", language);
            }

            const setData = {
                title,
                description,
                slug,      // ✅ REQUIRED
                url,
                points,    // ✅ ARRAY
                button,
                image: imagePath, // ✅ REQUIRED
            };

            const response = await DAO.saveData(Models.CoreService, setData);
            return response;

        } catch (err) {
            console.error("Error creating Core Service:", err);
            throw err;
        }
    }


    static async getAllCoreServices() {
        try {
            const projection = { __v: 0 };
            const options = { lean: true, sort: { createdAt: -1 } };
            const response = await DAO.getData(Models.CoreService, {}, projection, options);
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async getCoreServiceById(id: string, language = "ENGLISH") {
        try {
            const projection = { __v: 0 };
            const options = { lean: true };
            const check = await DAO.getData(Models.CoreService, { _id: id }, projection, options);
            if (!check.length) throw await handleCustomError("NO_DATA_FOUND", language);
            return check[0];
        } catch (err) {
            throw err;
        }
    }

    static async getServicesBySlug(slug: string, language = "ENGLISH") {
        try {
            const projection = { __v: 0 };
            const options = { lean: true };
            const check = await DAO.getSingleData(Models.CoreService, { slug: slug }, projection, options);

            if (!check) throw await handleCustomError("NO_DATA_FOUND", language);
            return check;
        } catch (err) {
            throw err;
        }
    }

    static async updateCoreService(id: string, payload: any, file?: any) {
        try {
            const { title, description, points, button, url, slug, language = "ENGLISH" } = payload;

            const check: any = await DAO.getSingleData(
                Models.CoreService,
                { _id: id },
                {},
                { lean: true }
            );

            if (!check) {
                throw await handleCustomError("NO_DATA_FOUND", language);
            }

            // ✅ Points parsing again (same logic as create)
            let parsedPoints = check.points;

            if (Array.isArray(points)) {
                parsedPoints = points;
            } else if (typeof points === "string") {
                try {
                    parsedPoints = JSON.parse(points);
                } catch {
                    parsedPoints = [points];
                }
            }

            const data: any = {
                title,
                description,
                url,
                points: parsedPoints,
                button,
            };

            // ✅ Slug update (unique check)
            if (slug && slug !== check.slug) {
                const slugCheck = await DAO.getSingleData(
                    Models.CoreService,
                    { slug, _id: { $ne: id } },
                    {},
                    { lean: true }
                );

                if (slugCheck) {
                    throw await handleCustomError("SLUG_ALREADY_EXISTS", language);
                }

                data.slug = slug;
            }

            // ✅ Optional Image Update
            if (file) {
                const imagePath = await this.uploadFile(file, "uploads/core-services/image");
                data.image = imagePath;
            }

            const response = await DAO.findAndUpdate(
                Models.CoreService,
                { _id: id },
                data,
                { new: true }
            );

            return response;

        } catch (err) {
            throw err;
        }
    }


    static async deleteCoreService(id: string, language = "ENGLISH") {
        try {
            const check = await DAO.getData(Models.CoreService, { _id: id }, {}, { lean: true });
            if (!check.length) throw await handleCustomError("NO_DATA_FOUND", language);

            const response = await DAO.removeData(Models.CoreService, { _id: id });
            return response;
        } catch (err) {
            throw err;
        }
    }


    static async createExtension(payload: any, file?: any) {
        try {
            const { slug, title, description, longDescription, link, features, benefits } = payload;

            let imagePath = "";
            if (file) {
                imagePath = await this.uploadFile(file, "uploads/extensions/image");
            }

            // console.log(file)
            console.log(imagePath)

            // ✅ Parse features & benefits safely
            const parseArray = (input: any, keyPrefix: string) => {
                if (Array.isArray(input)) return input;
                if (typeof input === "string") {
                    try {
                        return JSON.parse(input);
                    } catch {
                        return [input];
                    }
                }
                const extracted = Object.keys(payload)
                    .filter((key) => key.startsWith(`${keyPrefix}[`))
                    .map((key) => payload[key])
                    .filter(Boolean);
                return extracted;
            };

            const parsedFeatures = parseArray(features, "features");
            const parsedBenefits = parseArray(benefits, "benefits");

            const setData = {
                slug,
                title,
                description,
                longDescription,
                link,
                features: parsedFeatures,
                benefits: parsedBenefits,
                image: imagePath,
            };

            const response = await DAO.saveData(Models.Extension, setData);
            return response;
        } catch (error) {
            console.error("❌ Error creating extension:", error);
            throw error;
        }
    }

    static async getAllExtensions() {
        return await DAO.getData(Models.Extension, {}, {}, { createdAt: -1 });
    }

    static async getExtensionById(id: string) {
        return await DAO.getSingleData(Models.Extension, { _id: id });
    }
    static async getExtensionBySlug(slug: string, language = "ENGLISH") {
        try {
            const projection = { __v: 0 };
            const options = { lean: true };
            const check = await DAO.getSingleData(Models.Extension, { slug: slug }, projection, options);

            if (!check) throw await handleCustomError("NO_DATA_FOUND", language);
            return check;
        } catch (err) {
            throw err;
        }
    }

    static async updateExtension(id: string, payload: any, file?: any) {
        try {
            const {
                slug,
                title,
                description,
                longDescription,
                link,
                features,
                benefits,
            } = payload;

            console.log("📦 Incoming file:", file ? file.originalname : "No new file");

            // ✅ Step 1: Get existing extension from DB
            const existingData = await DAO.getSingleData(Models.Extension, { _id: id });
            if (!existingData) throw new Error("Extension not found");

            // ✅ Step 2: Handle image logic
            let imagePath = existingData.image; // default: keep old image
            if (file) {
                // upload new file and replace image path
                imagePath = await this.uploadFile(file, "uploads/extensions/image");
            }

            // ✅ Step 3: Parse features & benefits safely
            const parseArray = (input: any, keyPrefix: string) => {
                if (Array.isArray(input)) return input;
                if (typeof input === "string") {
                    try {
                        return JSON.parse(input);
                    } catch {
                        return [input];
                    }
                }

                const extracted = Object.keys(payload)
                    .filter((key) => key.startsWith(`${keyPrefix}[`))
                    .map((key) => payload[key])
                    .filter(Boolean);

                return extracted;
            };

            const parsedFeatures = parseArray(features, "features");
            const parsedBenefits = parseArray(benefits, "benefits");

            // ✅ Step 4: Prepare data
            const data = {
                slug,
                title,
                description,
                longDescription,
                link,
                features: parsedFeatures,
                benefits: parsedBenefits,
                image: imagePath,
            };

            // ✅ Step 5: Update document
            const response = await DAO.findAndUpdate(
                Models.Extension,
                { _id: id },
                data,
                { new: true }
            );

            return response;
        } catch (error) {
            console.error("❌ Error updating extension:", error);
            throw error;
        }
    }


    static async deleteExtension(id: string) {
        try {
            const pageModels = [
                Models.UserGuide,
                Models.AdminGuide,
                Models.HelpPage,
                Models.CaseStudy,
                Models.OverView,
                Models.ExtensionTermsAndConditions,
                Models.ExtensionPrivacyPolicy,
            ];

            // Delete all pages (safe delete)
            await Promise.all(
                pageModels.map(async (Model) => {
                    try {
                        await DAO.removeData(Model, { extensionId: id });
                    } catch (e) {
                        // ignore if page doesn't exist or delete fails
                    }
                })
            );

            // Delete extension
            return await DAO.removeData(Models.Extension, { _id: id });
        } catch (err) {
            throw err;
        }
    }


    //====================Home Page =======================

    static async createHome(data: Partial<IHome>) {
        try {
            const existing = await Models.Home.findOne();
            if (existing) {
                throw new Error("Home page already exists. Please update instead.");
            }

            const home = new Models.Home(data);
            console.log(home)
            return await home.save();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async updateHome(data: Partial<IHome>) {
        try {
            let home = await Models.Home.findOne();
            if (!home) {
                throw new Error("Home page not found. Please create it first.");
            }

            Object.assign(home, data);
            return await home.save();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getHome() {
        try {
            const home = await Models.Home.findOne();
            if (!home) throw new Error("Home page not found.");
            return home;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    // -------------------- helper resolver --------------------
    static resolvePageModel(pageType: string) {
        const map: any = {
            userGuide: Models.UserGuide,
            adminGuide: Models.AdminGuide,
            help: Models.HelpPage,
            caseStudy: Models.CaseStudy,
            overview: Models.OverView,
            terms: Models.ExtensionTermsAndConditions,
            privacy: Models.ExtensionPrivacyPolicy,
        };
        return map[pageType];
    }

    // -------------------- ADMIN CRUD --------------------
    static async createStaticPage(pageType: string, payload: any) {
        try {
            const Model = this.resolvePageModel(pageType);
            if (!Model) throw await handleCustomError("INVALID_PAGE_TYPE", "ENGLISH");

            if (!payload.extensionId)
                throw await handleCustomError("EXTENSION_ID_REQUIRED", "ENGLISH");

            const setData = {
                extensionId: payload.extensionId,
                title: payload.title,
                content: payload.content,
            };

            // STEP 1: create static page
            const created = await DAO.saveData(Model, setData);

            // STEP 2: update Extension reference
            const fieldMap: any = {
                userGuide: "userGuide",
                adminGuide: "adminGuide",
                help: "helpPage",
                caseStudy: "caseStudy",
                overview: "overView",
                terms: "termsAndConditions",
                privacy: "privacyPolicy",
            };

            const fieldToUpdate = fieldMap[pageType];

            if (!fieldToUpdate) return created; // safety check

            await DAO.findAndUpdate(
                Models.Extension,
                { _id: payload.extensionId },
                { [fieldToUpdate]: created._id },
                { new: true }
            );

            return created;
        } catch (err) {
            throw err;
        }
    }


    static async getAllStaticPages(pageType: string, extensionId?: string) {
        try {
            const Model = this.resolvePageModel(pageType);
            if (!Model) throw await handleCustomError("INVALID_PAGE_TYPE", "ENGLISH");

            const query: any = {};
            if (extensionId) query.extensionId = extensionId;

            return await DAO.getData(Model, query, {}, { lean: true, sort: { createdAt: -1 } });
        } catch (err) {
            throw err;
        }
    }

    static async getStaticPageById(pageType: string, id: string) {
        try {
            const Model = this.resolvePageModel(pageType);
            if (!Model) throw await handleCustomError("INVALID_PAGE_TYPE", "ENGLISH");
            const result = await DAO.getSingleData(Model, { _id: id });
            if (!result) throw await handleCustomError("NO_DATA_FOUND", "ENGLISH");
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async updateStaticPage(pageType: string, id: string, payload: any) {
        try {
            const Model = this.resolvePageModel(pageType);
            if (!Model) throw await handleCustomError("INVALID_PAGE_TYPE", "ENGLISH");

            const update: any = {
                title: payload.title,
                content: payload.content,
            };

            const updated: any = await DAO.findAndUpdate(
                Model,
                { _id: id },
                update,
                { new: true }
            );

            if (!updated) throw await handleCustomError("NO_DATA_FOUND", "ENGLISH");

            const fieldMap: any = {
                userGuide: "userGuide",
                adminGuide: "adminGuide",
                help: "helpPage",
                caseStudy: "caseStudy",
                overview: "overView",
                terms: "termsAndConditions",
                privacy: "privacyPolicy",
            };

            const fieldToUpdate = fieldMap[pageType];

            if (fieldToUpdate && updated.extensionId) {
                await DAO.findAndUpdate(
                    Models.Extension,
                    { _id: updated.extensionId },
                    { [fieldToUpdate]: updated._id },
                    { new: true }
                );
            }

            return updated;

        } catch (err) {
            throw err;
        }
    }


    static async deleteStaticPage(pageType: string, id: string) {
        try {
            const Model = this.resolvePageModel(pageType);
            if (!Model) throw await handleCustomError("INVALID_PAGE_TYPE", "ENGLISH");

            // get doc for extension cleanup
            const doc: any = await DAO.getSingleData(Model, { _id: id });
            const resp = await DAO.removeData(Model, { _id: id });

            // clear reference in Extension
            try {
                if (doc && doc.extensionId) {
                    const extUpdate: any = {};

                    if (pageType === "userGuide") extUpdate.userGuide = null;
                    if (pageType === "adminGuide") extUpdate.adminGuide = null;
                    if (pageType === "help") extUpdate.helpPage = null;
                    if (pageType === "caseStudy") extUpdate.caseStudy = null;
                    if (pageType === "overview") extUpdate.overView = null;
                    if (pageType === "terms") extUpdate.termsAndConditions = null;
                    if (pageType === "privacy") extUpdate.privacyPolicy = null;

                    await DAO.findAndUpdate(
                        Models.Extension,
                        { _id: doc.extensionId },
                        extUpdate,
                        { new: true }
                    );
                }
            } catch (e) {
                // ignore
            }

            return resp;
        } catch (err) {
            throw err;
        }
    }

    // -------------------- PUBLIC FETCH --------------------
    static async getStaticPageByExtensionSlug(pageType: string, slug: string) {
        try {
            const extension = await DAO.getSingleData(Models.Extension, { slug });
            if (!extension) throw await handleCustomError("NO_DATA_FOUND", "ENGLISH");

            const Model = this.resolvePageModel(pageType);
            if (!Model) throw await handleCustomError("INVALID_PAGE_TYPE", "ENGLISH");

            const page = await DAO.getSingleData(Model, { extensionId: extension._id });
            if (!page) throw await handleCustomError("NO_DATA_FOUND", "ENGLISH");

            return page;
        } catch (err) {
            throw err;
        }
    }


    static async getTerms() {
        return Models.Terms.findOne();
    }

    static async upsertTerms(content: string) {
        let terms = await Models.Terms.findOne();

        if (terms) {
            terms.content = content;
            return terms.save();
        }

        return Models.Terms.create({ content });
    }

    static async getPrivacy() {
        return Models.Privacy.findOne();
    }

    static async upsertPrivacy(content: string) {
        let privacy = await Models.Privacy.findOne();

        if (privacy) {
            privacy.content = content;
            return privacy.save();
        }

        return Models.Privacy.create({ content });
    }

}

export default adminServices
