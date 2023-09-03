import { express } from "../index";
import Users from "../models";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    console.log("in the try");
    const usersWithMatchingEmail = await Users["Users"].findAll({
      where: {
        email: email,
      },
    });

    if (usersWithMatchingEmail.length == 1) {
      // TODO: Add method to generate token
      const isValid = await bcrypt.compare(
        password,
        usersWithMatchingEmail[0].dataValues.password
      );
      if (isValid) {
        res.status(200).json({ token: "generatedToken123" });
      } else {
        res.status(400).json({ error: "Password does not match" });
      }
    } else {
      res.status(400).json({ error: "email not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
