const redis = require('../utils/redis');
const db = require('../utils/db');

const getStatus = (req, res) => {
  const redisStatus = redis.isAlive();
  const dbStatus = db.isAlive();

  res.status(200).json({
    "redis": redisStatus,
    "db": dbStatus
  });
}

const getStats = (req, res) => {
  const nbUsers = db.nbUsers();
  const nbFiles = db.nbFiles();

  res.status(200).json({
    "users": nbUsers,
    "files": nbFiles,
  });
}

module.exports = {
  getStatus,
  getStats
}
