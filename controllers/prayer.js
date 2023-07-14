const PrayerService = require("../services/prayer");
const UserService = require("../services/user");
const { Response } = require("../helpers");
const { prayerLogger } = require("../logger");

const prayerService = new PrayerService();
const userService = new UserService();

exports.createPrayer = async (req, res) => {
  const { id } = req.payload;
  try {
    const prayer = await prayerService.createPrayer(req.body);
    await userService.updateUserWithId(id, {
      $addToSet: { prayers: prayer._id },
    });
    const response = new Response(
      true,
      201,
      "Prayer created successfully",
      prayer
    );
    prayerLogger.info(`New prayer created - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    prayerLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.updatePrayer = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const prayer = await prayerService.updatePrayer(pid, req.body);
    const response = new Response(
      true,
      200,
      "Prayer updated successfully",
      prayer
    );
    prayerLogger.info(`Prayer Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    prayerLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllPrayer = async (req, res) => {
  const { id } = req.payload;
  try {
    const page = Number(req.query.page) || 1;
    const num = Number(req.query.limit) || 10;
    let title = req.query.title;

    let offset;
    let limit;

    if (page === 1 || page === 0 || !page) {
      offset = 0;
      limit = num;
    } else {
      offset = (page - 1) * num;
      limit = num;
    }

    const prayers = await groupService.findAllGroup(limit, offset, title);
    const response = new Response(true, 200, "Success", prayers);
    prayerLogger.info(`Get all prayers - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    prayerLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
