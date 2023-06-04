const db = require('../utils/db');
const redis = require('../utils/redis');
const sha1 = require('sha1');

const postNew = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) res.status(400).json({ "error": 'Missing email' });
  if (!password) res.status(400).json({ "error":'Missing password' });
  if (db.users.findOne({ email })) res.status(400).json({ "error": "Already exist" });


  const newUser = db.users.insertOne({
    "email": email,
    "password": sha1(password),
  });

  res.status(201).json({ "id": newUser.insertedId, "email": newUser.email });
};

const getMe = (req, res) => {
  const token = req.headers['x-token'];
  if (!token || !redis.get(token)) return res.status(401).json({ 'error': 'Unauthorized' });
  else {
    const id = redis.get(`auth_${token}`);
    const user = db.users.findOne({ id });
    res.json({ "id": id, "email": user.email });
  }
};

module.exports = {
  postNew,
  getMe
}
