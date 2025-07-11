require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Advertisement = require('./models/Advertisement');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Povezan na bazu!');

    await User.deleteMany();
    await Advertisement.deleteMany();

    const hashedPassword1 = await bcrypt.hash('korisnik', 10);
    const hashedPassword2 = await bcrypt.hash('dajana', 10);

    const users = await User.insertMany([
      { username: 'korisnik', password: hashedPassword1, phone: '123456', role: 'user' },
      { username: 'dajana', password: hashedPassword2, phone: '234567', role: 'user' },
    
    ]);

    const ads = [];
    for (let i = 0; i < 100; i++) {
      ads.push({
        title: `Oglas ${i + 1}`,
        description: `Opis oglasa ${i + 1}`,
        price: (Math.random() * 10000).toFixed(2),
        imageUrl: 'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?semt=ais_hybrid&w=740',
        category: 'sports',
        city: 'Novi Sad',
        user: users[i % users.length]._id
      });
    }

    await Advertisement.insertMany(ads);
    console.log('Seed završen!');
  } catch (error) {
    console.error('Greška pri seedovanju:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
