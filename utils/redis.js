import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error(`${error}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setEx(key, duration, value, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
const redisClient = RedisClient();
module.exports = redisClient;