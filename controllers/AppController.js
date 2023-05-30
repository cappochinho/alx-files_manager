const Redis = require('../utils/redis');
const Db = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    if (Redis.isAlive() && Db.isAlive()) {
      return res.status(200).json({ redis: true, db: true });
    }
    return res.status(400).send('Redis and/or DbDB not connected');
  }

  static async getStats(req, res) {
    const users = await Db.nbUsers();
    const files = await Db.nbFiles();
    return res.status(200).json({ users, files });
  }
}

module.exports = AppController;
