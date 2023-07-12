const Prayer = require("../model/prayer");

module.exports = class PrayerService {
  async findAllPrayer(max, offset, name) {
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

  async findPrayerWithId(id) {
    return await Prayer.findOne({ _id: id });
  }

  async createPrayer(postObj) {
    return await Prayer.create(postObj);
  }

  async updatePrayer(id, payload) {
    return await Prayer.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }

  async updatePrayerImage(id, payload) {
    return await Post.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }
};
