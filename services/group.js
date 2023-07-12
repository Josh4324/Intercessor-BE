const Group = require("../model/group");

module.exports = class GroupService {
  async findAllGroup(max, offset, name) {
    if (!name) {
      return await Group.find({})
        .limit(max)
        .skip(offset)
        .sort({ date: -1 })
        .populate("users");
    }
    if (name) {
      return await Post.find({
        category: new RegExp(`${name}`, "i"),
      })
        .limit(max)
        .skip(offset)
        .sort({ date: -1 })
        .populate("users");
    }
  }

  async findGroupWithId(id) {
    return await Group.findOne({ _id: id }).populate("users");
  }

  async createGroup(postObj) {
    return await Group.create(postObj);
  }

  async updateGroup(id, payload) {
    return await Group.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }

  async updateGroupImage(id, payload) {
    return await Post.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }
};
