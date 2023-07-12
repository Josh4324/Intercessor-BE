const GroupService = require("../services/group");
const cloudinary = require("cloudinary").v2;
const { Response } = require("../helpers");
const { postLogger } = require("../logger");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const groupService = new GroupService();

exports.createGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const group = await groupService.createGroup(req.body);
    const response = new Response(
      true,
      201,
      "Group created successfully",
      group
    );
    postLogger.info(`New post created - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.updateGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;

    const group = await groupService.updateGroup(pid, req.body);

    const response = new Response(
      true,
      200,
      "Post updated successfully",
      group
    );
    postLogger.info(`Post Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.addMemberToGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const user = req.body.user;

    console.log(user);

    const groupCount = await (
      await groupService.findGroupWithId(pid)
    ).memberCount;

    const group = await groupService.updateGroup(pid, {
      memberCount: Number(groupCount) + 1,
      $addToSet: { users: user },
    });

    const response = new Response(
      true,
      200,
      "Group updated successfully",
      group
    );
    postLogger.info(`Post Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getAllGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const page = Number(req.query.page) || 1;
    const num = Number(req.query.limit) || 10;
    let category = req.query.category;

    let offset;
    let limit;

    if (page === 1 || page === 0 || !page) {
      offset = 0;
      limit = num;
    } else {
      offset = (page - 1) * num;
      limit = num;
    }

    const groups = await groupService.findAllGroup(limit, offset, category);
    const response = new Response(true, 200, "Success", groups);
    postLogger.info(`Get all posts - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
