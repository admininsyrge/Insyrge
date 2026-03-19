import axios from "axios";

// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://api.insyrge.com";
export const BASE_URL_ADMIN = `${BASE_URL}/Admin/api`;
export const BASE_URL_USER = `${BASE_URL}/User/api`;

export const IMAGE_URL = BASE_URL;

export const CREATE_PROJECT = "/project";
export const GET_PROJECTS = "/project-all";
export const GET_PROJECTS_BY_ID = `/project`;
export const UPDATE_PROJECT = `/update-project`;
export const DELETE_PROJECT = `/delete-project`;

export const CREATE_BLOG = "/blog";
export const GET_BLOGS = "/blogs-all";
export const GET_BLOG_BY_ID = (id) => `/blog/${id}`;
export const UPDATE_BLOG = (id) => `/blog/${id}`;
export const DELETE_BLOG = (id) => `/blog/${id}`;

export const CREATE_SERVICE = "/service";
export const GET_SERVICES = "/services-all";
export const GET_SERVICE_BY_ID = (id) => `/service/${id}`;
export const UPDATE_SERVICE = (id) => `/service/${id}`;
export const DELETE_SERVICE = (id) => `/service/${id}`;

export const CREATE_EXTENSION = "/create-extension";
export const GET_EXTENSION = "/extension-all";
export const GET_EXTENSION_BY_ID = (id) => `/extension/${id}`;
export const UPDATE_EXTENSION = (id) => `/extension/${id}`;
export const DELETE_EXTENSION = (id) => `/extension/${id}`;

// ==========END-POINTS============
export const LOGIN = "/login";
export const FORGOT_PASSWORD = "/forgot-password";
export const RESET_PASSWORD = "/set-new-password";
export const USER_DETAILS = "/view-profile";
export const UPLOAD_IMAGE = "/admin-image";
export const UPDATE_PROFILE = "/update-profile";
export const CHANGE_PASSWORD = "/change-password";
export const CHECKSECURITYCODE = "/check-security-code";

export const GET_DASHBOARD_DETAILS = "/get-all-users";

export const GET_USERS = "/get-all-users";
export const DELETE_USER = "/delete-user";

export const GET_CONTENT_PAGE = "/get-page";
export const EDIT_CONTENT = "/edit-single-page-data";
export const SINGLE_PAGE_CONTENT = "/single-page-data";
export const GET_CONTACTS = "/contact";

export const GET_HOME = "/home";
export const UPDATE_HOME = "/home";
export const CREATE_HOME = "/home";

export const CREATE_STATIC_PAGE = (pageType) => `/static/${pageType}`;
// GET a single static page by ID
export const GET_STATIC_PAGE_BY_ID = (pageType, id) =>
  `/static/${pageType}/${id}`;

// UPDATE static page
export const UPDATE_STATIC_PAGE = (pageType, id) => `/static/${pageType}/${id}`;

export const GET_STATIC_PAGES = (pageType) => `/static/${pageType}`;
export const DELETE_STATIC_PAGE = (pageType, id) => `/static/${pageType}/${id}`;
