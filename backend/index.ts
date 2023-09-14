export const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const userRouter = require("./routes/Users");
app.use("/users", userRouter);

const userDataRoute = require("./routes/Users"); //get data for logged in user
app.use("/users/user", userDataRoute);
const updateUserRoute = require("./routes/Users"); //update data for logged in user
app.use("/users/updateProfile", updateUserRoute);
const searchUserRoute = require("./routes/Users"); //get data for logged in user
app.use("/users/all", searchUserRoute);

const eventJoinRouter = require("./routes/EventParticipants");
app.use("/eventParticipants", eventJoinRouter);
const RSVPdRouter = require("./routes/EventParticipants");
app.use("/eventParticipants/eventsByUser", RSVPdRouter);
const leaveEventRouter = require("./routes/EventParticipants");
app.use("/eventParticipants/leave", leaveEventRouter);

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
