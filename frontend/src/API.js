// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://api.insyrge.com";
// export const BASE_URL_ADMIN = `${BASE_URL}/Admin/api`;
export const BASE_URL_USER = `${BASE_URL}/User/api`;

export const GET_BLOGS = "/blogs-all";
export const GET_BLOG_BY_ID = (id) => `/blog/${id}`;

export const GET_SERVICES = "/services-all";
export const GET_SERVICE_BY_ID = (id) => `/service/${id}`;

export const GET_EXTENSION = "/extension-all";
export const GET_EXTENSION_BY_ID = (id) => `/extension/${id}`;

export const GET_PROJECTS = "/project-all";
export const GET_PROJECTS_BY_ID = (id) => `/project${id}`;

export const GET_HOME = "/home";
