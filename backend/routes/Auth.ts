import { express } from "../index";
import Users from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const usersWithMatchingEmail = await Users["Users"].findAll({
      where: {
        email: email,
      },
    });

    if (usersWithMatchingEmail.length == 1) {
      const isValid = await bcrypt.compare(
        password,
        usersWithMatchingEmail[0].dataValues.password
      );
      if (isValid) {
        // Generate a JWT token to encode userInfo
        const token = jwt.sign(
          { userInfo: usersWithMatchingEmail[0].dataValues },
          `${process.env.SECRET_KEY}`
        );
        const userInfo = usersWithMatchingEmail[0].dataValues;
        //return userwithmatching emails below too?
        res.status(200).json({ token, userInfo });
      } else {
        res.status(400).json({ error: "Password does not match" });
      }
    } else {
      res.status(400).json({ error: "Email not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
