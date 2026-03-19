import express, { Request, Response, NextFunction } from "express";
import http from "http";
import fs from "fs";
import https from "https";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { connect_to_db, bootstrap_data } from "./index";
import adminRoutes from "../modules/admin/admin.routes";
import userRoutes from "../modules/user/user.routes";
import cors from "cors";
import path from "path";
import { Server as HTTPServer } from "http";
import { Server as HTTPSServer } from "https";

const app = express();

const env = process.env.ENVIRONMENT as string;
const cert: string = process.env.SSL_CERT as string;
const priv_key: string = process.env.SSL_PRIV_KEY as string;
const port: number =
  env === "PROD"
    ? parseInt(process.env.PROD_PORT as string, 10)
    : parseInt(process.env.LOCAL_PORT as string, 10);
// const host: string = process.env.HOST;

console.log("PORT---", port);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors({ origin: "*" }));

const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(apiLogger);

app.get("/", (req: any, res: any) => {
  const userIP = req.ip;
  res.send(`🎊 Server is running Hurrayyyy`);
});


app.use("/Admin/api", adminRoutes);
app.use("/User/api", userRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));



let server: HTTPServer | HTTPSServer;

if (process.env.SSL === "true") {
  try {
    server = https.createServer(
      {
        cert: fs.readFileSync(cert),
        key: fs.readFileSync(priv_key),
      },
      app
    );
  } catch (error) {
    console.error("Error setting up HTTPS server:", error);
    process.exit(1);
  }
} else {
  server = http.createServer(app);
  server.listen(port, () => {
    console.log(`🎊 Server is running Hurrayyyy`);
  });
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

server.on("error", onError);
server.on("listening", onListening);

// Database connection
connect_to_db();
bootstrap_data();
