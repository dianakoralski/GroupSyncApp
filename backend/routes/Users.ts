import { express } from "../index";
const { Users } = require("../models");
const router = express.Router();

router.get("/", async (req: any, res: any) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
});

router.post("/", async (req: any, res: any) => {
  const user = req.body;
  await Users.create(user);
  res.json(user);
});

module.exports = router;
