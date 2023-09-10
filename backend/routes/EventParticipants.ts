import { express } from "../index";
const { Posts, Users, EventParticipants } = require("../models");
const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { eventId, userId } = req.body;
  try {
    // Find the event by ID
    const event = await Posts.findOne({ where: { id: eventId } });
    const user = await Users.findOne({ where: { id: userId } });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await EventParticipants.create({
      eventId: event.id,
      participantId: user.id,
    });

    return res.status(200).json({ message: "Joined the event successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/eventsByUser/", async (req: any, res: any) => {
  const { userId } = req.body;
  console.log("userId: ", userId);

  try {
    // Find all event participants with the given userId
    const eventsRSVPd = await EventParticipants.findAll({
      where: { participantId: userId },
    });

    if (!eventsRSVPd) {
      return res.status(404).json({ message: "No events found for the user" });
    }

    const eventIds = Array.from(
      new Set(eventsRSVPd.map((ep: any) => ep.eventId))
    );

    // Find all Posts with eventIds matching the extracted eventIds
    const events = await Posts.findAll({
      where: { id: eventIds },
    });

    const extractedEvents = events.map((event: any) => event.dataValues);

    const formattedPosts = await Promise.all(
      extractedEvents.map(async (post: any) => {
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
          hostId: post.hostId,
          id: post.id,
        };
      })
    );

    // Filter out any null values that occurred when user information wasn't found
    const filteredPosts = formattedPosts.filter((post) => post !== null);

    res.json(filteredPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/leave", async (req: any, res: any) => {
  const { eventId, userId } = req.body;

  try {
    // Find the event participant entry with the given event and user IDs
    const eventParticipant = await EventParticipants.findOne({
      where: {
        eventId: eventId,
        participantId: userId,
      },
    });

    if (!eventParticipant) {
      return res.status(404).json({ message: "Event participant not found" });
    }

    // Delete the event participant entry
    await eventParticipant.destroy();

    return res.status(200).json({ message: "Left the event successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
