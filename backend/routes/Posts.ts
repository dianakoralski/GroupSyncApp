import { express } from "../index";
const { Posts, Users } = require("../models");
const router = express.Router();

router.get("/", async (req: any, res: any) => {
  try {
    // Fetch all posts along with the associated user data (first and last names)
    const listOfPosts = await Posts.findAll();
    const formattedPosts = await Promise.all(
      listOfPosts.map(async (post: any) => {
        const userInfo = await Users.findOne({
          where: { id: post.hostId },
        });
        if (!userInfo) {
          // Handle the case where user information is not found
          return null;
        }
        const firstName = userInfo.firstName;
        const lastName = userInfo.lastName;
        const fullName = firstName + " " + lastName;
        return {
          title: post.title,
          location: post.location,
          date: post.date,
          time: post.time,
          hostName: fullName,
        };
      })
    );

    // Filter out any null values that occurred when user information wasn't found
    const filteredPosts = formattedPosts.filter((post) => post !== null);

    res.json(filteredPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req: any, res: any) => {
  const post = req.body;
  //console.log(post);
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
