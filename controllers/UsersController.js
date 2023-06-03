const db = require('../utils/db');
const sha1 = require('sha1');


const postNew = async (req, res) => {
  const { email, password } = req.body;
  if (!email) res.status(400).json({ "error": 'Missing email' });
  if (!password) res.status(400).json({ "error":'Missing password' });
  if (db.users.findOne({ email })) res.status(400).json({ "error": "Already exist" });


  const newUser = await db.users.insertOne({
    "email": email,
    "password": sha1(password),
  });
  await newUser.save();
  res.status(201).json({ "id": newUser.insertedId, "email": newUser.email });
};

module.exports = postNew;
