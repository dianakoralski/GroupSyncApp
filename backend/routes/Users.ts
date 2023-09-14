import { express } from "../index";
import bcrypt from "bcrypt";
const verifyToken = require("../config/verifyToken");
const { Users } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/", async (req: any, res: any) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
});

router.post("/", async (req: any, res: any) => {
  const user = req.body;

  if (!passwordChecker(user["password"])) {
    const errorMessage = "Password does not meet the requirements";
    return res.status(400).json({ error: true, msg: errorMessage });
  }

  try {
    const hashedPassword = await bcrypt.hash(user["password"], 10);
    user["password"] = hashedPassword;
    await Users.create(user);
    return res.json(user);
  } catch (error: any) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      // Send a custom error response for duplicate entry
      return res
        .status(400)
        .json({ error: true, msg: "Email address already exists." });
    }
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
});

function passwordChecker(password: string): boolean {
  // Check if the password has at least 8 characters
  if (password.length < 8) {
    return false;
  }
  // Check if the password has at least 1 lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }
  // Check if the password has at least 1 uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  // Check if the password has at least 1 number
  if (!/[0-9]/.test(password)) {
    return false;
  }
  // Check if the password has at least 1 special character
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return false;
  }
  // If all the conditions are satisfied, the password is valid
  return true;
}

router.get("/user", verifyToken, async (req: any, res: any) => {
  try {
    const userInfo = req.user.userInfo;
    console.log("user info form users/user: ", userInfo);

    //keep in case we want to change logic to auth by just email and then fetch rest of user data
    // // Retrieve the user data from your database
    //const user = await Users["Users"].findOne({ where: { id: userInfo.id } });

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    console.log("SUCCESSFULLY FETCHED USER INFO FROM GET");
    res.status(200).json({ userInfo });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
});

router.post("/updateProfile", async (req: any, res: any) => {
  const user = req.body;
  console.log("new data: ", user);
  try {
    await Users.update(
      { firstName: user.firstName },
      { where: { id: user.id } }
    );
    return res.json(user);
  } catch (error: any) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
});

router.post("/all", verifyToken, async (req: any, res: any) => {
  console.log("req: ", req.body);
  try {
    const nameInput = req.body.query;
    console.log("name from users/all: ", nameInput);

    const matchingUsers = await Users.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${nameInput}%` } }, // Case-insensitive LIKE query
          { lastName: { [Op.like]: `%${nameInput}%` } },
        ],
      },
    });
    console.log("matching users: ", matchingUsers);
    res.status(200).json({ matchingUsers });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
});

module.exports = router;
