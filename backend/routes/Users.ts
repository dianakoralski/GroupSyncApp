import { express } from "../index";
const { Users } = require("../models");
const router = express.Router();

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
    await Users.create(user);
    return res.json(user);
  } catch (error) {
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

module.exports = router;
