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
    const hashedPassword3 = await bcrypt.hash('korisnik3', 10);
    const hashedPassword4 = await bcrypt.hash('korisnik4', 10);
    const hashedPassword5 = await bcrypt.hash('korisnik5', 10);
    const hashedPassword6 = await bcrypt.hash('korisnik6', 10);
    const hashedPassword7 = await bcrypt.hash('korisnik7', 10);

    const users = await User.insertMany([
      { username: 'korisnik', password: hashedPassword1, phone: '123456', role: 'user' },
      { username: 'dajana', password: hashedPassword2, phone: '234567', role: 'user' },
      { username: 'korisnik3', password: hashedPassword3, phone: '999999', role: 'user' },
      { username: 'korisnik4', password: hashedPassword4, phone: '888888', role: 'user' },
      { username: 'korisnik5', password: hashedPassword5, phone: '777777', role: 'user' },
      { username: 'korisnik6', password: hashedPassword6, phone: '666666', role: 'user' },
      { username: 'korisnik7', password: hashedPassword7, phone: '555555', role: 'user' },
    
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
