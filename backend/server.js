const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const friendDiscussionRoutes = require("./routes/friendDiscussion.route");
const discussionRoutes = require("./routes/discussion.route");

const userId = require("./middlewares/userId.middleware");

require("dotenv").config({ path: "./backend/config/.env" });
require("./config/db");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD",
  prefLightContinue: false,
};

// middelwares declaration
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// define a road public for the pictures(user profil img, bg user img and post img)
app.use(
  "/uploads/profil",
  express.static(path.join(__dirname, "/_uploads/profil"))
);
app.use(
  "/uploads/background",
  express.static(path.join(__dirname, "/_uploads/background"))
);
app.use(
  "/uploads/post",
  express.static(path.join(__dirname, "/_uploads/post"))
);

// get user id
app.get("/userId", userId, (req, res) => {
  res.send({ userId: req.auth.userIdAuth });
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/friend-discussion", friendDiscussionRoutes);
app.use("/api/discussion", discussionRoutes);

// port listening
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
