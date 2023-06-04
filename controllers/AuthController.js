const db = require('../utils/db');
const redis = require('../utils/redis');
const { v4: uuidv4 } = require('uuid');
const sha1 = require('sha1');

const getConnect = (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Basic')) {
    return res.status(401).json({ 'error': 'Unauthorized' });
  }

  const base64 = auth.split(' ')[1];
  const credentials = Buffer.from(base64, 'base64').toString('utf-8');
  const [email, password] = credentials.split(':');

  const user = db.users.findOne({ 'email': email, 'password': sha1(password) });

  if (!user) {
    return res.status(401).json({ 'error': 'Unauthorized' });
  }

  const token = uuidv4();
  const key = `auth_${token}`;
  redis.set(key, user._id, 86400);
  return res.status(200).json({ "token": token });
};

const getDisconnect = (req, res) => {
  const token = req.headers['x-token'];
  // console.log(token);
  if (!token || !redis.get(token)) return res.status(401).json({ 'error' : 'Unauthorized' });

  redis.del(`auth_${token}`);
  return res.status(204).send();
};

module.exports = {
  getConnect,
  getDisconnect,
}
