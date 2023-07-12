const Group = require("../model/group");

module.exports = class GroupService {
  async findAllGroup(max, offset, name) {
    if (!name) {
      return await Post.find({}).limit(max).skip(offset).sort({ date: -1 });
    }
    if (name) {
      return await Post.find({
        category: new RegExp(`${name}`, "i"),
      })
        .limit(max)
        .skip(offset)
        .sort({ date: -1 });
    }
  }

  async findGroupWithId(id) {
    return await Group.findOne({ _id: id });
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
