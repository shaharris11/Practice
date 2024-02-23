const client = require('../client');
const util = require('util');

async function getAllAnimes() {
  try {
    const { rows: animes } = await client.query('SELECT * FROM anime ORDER BY name');
    return animes;
  } catch (error) {
    throw new Error('Unable to retrieve animes');
  }
}

async function getAnimeById(id) {
  try {
    const {
      rows: [anime],
    } = await client.query(
      `
            SELECT * FROM anime
            WHERE id = $1;
        `,
      [id]
    );
    return anime;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAnimeById,
  getAllAnimes
};
