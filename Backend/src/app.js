// let express = require("express");
// let cors = require("cors");
// let bodyParse = require("body-parser");
// let http = require("http");
// let { env } = require("./config");
// const loader = require("./loaders");
// const router = require("./routes");

// const startServer = async () => {
//   try {
//     let app = express();
//     app.use(bodyParse());
//     let server = http.Server(app);

//     app.use(
//       cors({
//         origin: "*",
//         credentials: true,
//       })
//     );

//     loader.load();

//     app.use("/api", router);

//     server.listen(process.env.PORT || 3001, () => {
//       console.log("Connect to port", env.PORT);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// startServer();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.router");
const adminAuthRoutes = require("./routes/adminAuth.router");
const bookRoutes = require("./routes/book.router");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
