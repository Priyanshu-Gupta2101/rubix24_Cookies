const cron = require("node-cron");
const connectDB = require("./config/db");
const User = require("./models/userModel");

connectDB();

module.exports = async () => {
  console.log("Cron job started...");
  try {
    const twoHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const usersToDelete = await User.find({
      isEmailVerified: false,
      createdAt: { $lt: twoHoursAgo },
    });

    for (const user of usersToDelete) {
      await user.remove();
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
};
