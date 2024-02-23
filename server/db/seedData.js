const client = require('./client');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');
    await client.query(`
      DROP TABLE IF EXISTS anime;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS likes;
      DROP TABLE IF EXISTS posts;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Building All Tables...');
    await client.query(`
      CREATE TABLE anime (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        creator VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        link VARCHAR(255) NOT NULL
        );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email TEXT NOT NULL,
        token VARCHAR(255) NOT NULL,
        );
      CREATE TABLE likes (
        id SERIAL PRIMARY KEY,
        userid INTEGER NOT NULL,
        animeid INTEGER NOT NULL
        );
       CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(50),
        userid INTEGER NOT NULL,
        description TEXT NOT NULL,
       ) 
      
      `);
  } catch (error) {
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log('Creating Initial Data...');
    await client.query(`
    INSERT INTO animes (name, creator, description, image, link)
    VALUES
      ('Fullmetal Alchemist Brotherhood', 'creator', 'Brothers Edward and Alphonse Elric search for the Philsopher's Stone, hoping to restore their bodies, which were lost when they attempted to use their alchemy skills to resurrect their deceased mother. Edward, who lost only limbs, joins the State Military, which gives him the freedom to continue the search as he tries to restore his brother, whose soul is tethered to earth by a suit of armor. However, Edward and Alphonse are not the only ones seeking the powerful stone. And as they search, they learn of a plot to transmute the entire country for reasons they cannot comprehend.', 'fullmetal.png',  'https://www.crunchyroll.com/series/GRGGPG93R/fullmetal-alchemist-brotherhood'), ('My Hero Academia', 'Kohei Horikoshi', 'In a world where those with powers are known as "Quirks," Izuku Midoriya has aspirations to one day become a hero but there's a catch -- he isn't a Quirk. After a tragic accident involving his friend Katuski Bakugo; Midoriya is the only one to have stepped forward to help protect Bakugo from a villain, because of his acts, he is given a gift by the world's greatest hero, All Might. Now, Midoriya attends U.A. School--a school that cultivates the next generation of superheroes.', 'myhero.png', 'https://www.crunchyroll.com/series/G6NQ5DWZ6/my-hero-academia?utm_campaign=media_actions&utm_medium=deep_link&utm_source=google')
        `);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
