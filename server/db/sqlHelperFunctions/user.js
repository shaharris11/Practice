const client = require('../client');

async function updateUsername(token, body) {
  try {
    const {
      rows: [user],
    } = await client.query('SELECT * FROM users WHERE token = $1', [token]);

    if (user.id !== body.id) {
      throw new Error('Invalid user');
    }

    const {
      rows: [updatedUser],
    } = await client.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [body.username, body.id]);
    return updatedUser;
  } catch (error) {
    throw new Error('Unable to update username');
  }
}

async function updateEmail(token, body) {
  try {
    const {
      rows: [user],
    } = await client.query('SELECT * FROM users WHERE token = $1', [token]);

    if (user.id !== body.id) {
      throw new Error('Invalid user');
    }

    const {
      rows: [updatedUser],
    } = await client.query('UPDATE users SET email = $1 WHERE id = $2 RETURNING *', [body.email, body.id]);
    return updatedUser;
  } catch (error) {
    throw new Error('Unable to update user email');
  }
}

module.exports = {
  updatePic,
  updateUsername,
  updateEmail,
};
