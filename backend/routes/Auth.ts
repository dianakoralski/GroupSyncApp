import { express } from "../index";
import Users from "../models";
const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { email, password } = req.body;
  //TODO: encrypt password
  try {
    const usersWithMatchingEmail = await Users["Users"].findAll({
      where: {
        email: email,
        password: password,
      },
    });
    if (usersWithMatchingEmail.length == 1) {
      // TODO: Add method to generate token
      res.status(200).json({ token: "generatedToken123" });
    } else {
      res.status(400).json({ error: "email not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
