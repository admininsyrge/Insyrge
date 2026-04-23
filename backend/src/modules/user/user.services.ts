import express, { response } from "express";
import * as DAO from "../../DAO/index";
import * as Models from "../../models/index";
import { app_constant } from '../../config/index'
const user_scope = app_constant.scope.user;
import { handleCustomError, helpers, generate_token } from "../../middlewares/index";
import path from 'path';
import fs from "fs";

class userServices {

    static async saveSessionData(access_token: any, token_data: any) {
        try {
            let { _id, token_gen_at, expire_time } = token_data
            let set_data = {
                type: "USER",
                user_id: _id,
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

    static async fetchUserToken(token_data: any) {
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

    static async generateUserToken(_id: string) {
        try {
            let token_data = {
                _id: _id,
                scope: user_scope,
                collection: Models.User,
                token_gen_at: +new Date()
            }
            let response = await this.fetchUserToken(token_data)
            return response;
        } catch (err) {
            throw err;
        }
    }

    static async makeAdminResponse(data: any, language: string) {
        try {
            console.log(data)
            let { user_id, token_gen_at, access_token } = data
            let query = { _id: user_id }
            let projection = { password: 0 }
            let options = { lean: true }
            let fetch_data: any = await DAO.getData(Models.User, query, projection, options)

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

    static async verifyUser(query: any) {
        try {
            let projection = { __v: 0 }
            let options = { lean: true }
            let response = await DAO.getData(Models.User, query, projection, options)
            return response
        } catch (err) {
            throw err;
        }
    }

    static async createUser(req_data: any, file: any) {
        try {
            const { name, email, password, company, reasonForInterest, language = "ENGLISH" } = req_data
            const projection = { __v: 0 }
            const options = { lean: true }
            const check: any = await DAO.getData(Models.User, { email: email.toLowerCase() }, projection, options);

            if (check.length > 0) {
                throw await handleCustomError("THIS_DATA_ALREADY_EXIT", language)
            }

            let bcrypt = await helpers.bcrypt_password(password)

            const data: any = {
                name: name,
                email: email.toLowerCase(),
                password: bcrypt,
                company: company,
                reasonForInterest: reasonForInterest,
            }

            const response = await DAO.saveData(Models.User, data)
            console.log(response)

            return response;
        } catch (err) {
            throw err;
        }
    }

    static async uploadFile(file: any, uploadPath: string) {
        try {
            if (!file || !file.file) {
                handleCustomError("FILE_NOT_UPLOAD", 'ENGLISH');
            }

            const uploadedFile = file.file;
            const uploadDir = path.join(__dirname, '../../public/' + uploadPath);

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const uniqueFileName = `${Date.now()}_${uploadedFile.name}`;
            const finalPath = path.join(uploadDir, uniqueFileName);

            await new Promise<void>((resolve, reject) => {
                uploadedFile.mv(finalPath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            const imagePath = path.join(uploadPath, uniqueFileName);
            return imagePath;
        } catch (err) {
            throw err;
        }
    }

    static async editUser(id: any, req_data: any, file: any) {
        try {
            const { name, company, reasonForInterest, interestedProjects, language = "ENGLISH" } = req_data
            const projection = { __v: 0 }
            const options = { lean: true }
            const check: any = await DAO.getData(Models.User, { _id: id }, projection, options);
            if (!check.length) {
                throw await handleCustomError("NO_DATA_FOUND", language)
            }

            const data: any = {
                name: name,
                company: company,
                reasonForInterest: reasonForInterest,
                interestedProjects: interestedProjects,
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

}


export default userServices;
