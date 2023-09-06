import { express } from "../index";
const { Posts } = require("../models");
const router = express.Router();

router.get("/", async (req: any, res: any) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req: any, res: any) => {
  const post = req.body;
  //console.log(post);
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
