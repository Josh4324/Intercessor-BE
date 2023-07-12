const GroupService = require("../services/group");
const UserService = require("../services/user");
const cloudinary = require("cloudinary").v2;
const { Response } = require("../helpers");
const { postLogger } = require("../logger");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const groupService = new GroupService();
const userService = new UserService();

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

exports.addMemberToGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const user = req.body.user;

    const group = await groupService.findGroupWithId(pid);

    if (group.isPrivate) {
      if (!group.users.includes(id)) {
        const response = new Response(true, 400, "Private Group");
        return res.status(response.code).json(response);
      }
    }

    if (group.users.includes(user)) {
      const response = new Response(true, 400, "User has been added");
      return res.status(response.code).json(response);
    }

    await groupService.updateGroup(pid, {
      memberCount: Number(group.memberCount) + 1,
      $addToSet: { users: user },
    });

    await userService.updateUserWithId(user, {
      $addToSet: { groups: pid },
    });

    const response = new Response(true, 200, "Group updated successfully");
    postLogger.info(`Post Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.removeMemberFromGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    const pid = req.params.id;
    const user = req.body.user;

    const group = await groupService.findGroupWithId(pid);

    if (group.isPrivate) {
      if (!group.users.includes(id)) {
        const response = new Response(true, 400, "Private Group");
        return res.status(response.code).json(response);
      }
    }

    await groupService.updateGroup(pid, {
      memberCount: Number(group.memberCount) - 1,
      $pull: { users: user },
    });

    const response = new Response(true, 200, "Group updated successfully");
    postLogger.info(`Post Updated - ${id}`);
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
    let name = req.query.name;

    let offset;
    let limit;

    if (page === 1 || page === 0 || !page) {
      offset = 0;
      limit = num;
    } else {
      offset = (page - 1) * num;
      limit = num;
    }

    const groups = await groupService.findAllGroup(limit, offset, name);
    const response = new Response(true, 200, "Success", groups);
    postLogger.info(`Get all posts - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);
    postLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getOneGroup = async (req, res) => {
  const { id } = req.payload;
  try {
    let pid = req.params.id;
    const group = await groupService.findGroupWithId(pid);
    const response = new Response(true, 200, "Success", group);

    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 500, "Server Error", err);

    return res.status(response.code).json(response);
  }
};
