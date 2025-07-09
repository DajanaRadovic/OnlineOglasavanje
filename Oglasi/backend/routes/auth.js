const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Registracija
router.post('/register', async (req, res) => {
  const { username, password, phone } = req.body;

  try {
    // Provera da li korisnik postoji
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Korisničko ime već postoji' });
    }

    // Hash sifre
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cuvanje novog korisnika
    const newUser = new User({
      username,
      password: hashedPassword,
      phone
    });

    await newUser.save();

    return res.status(201).json({ message: 'Korisnik uspešno registrovan' });

  } catch (error) {
    console.error('Greška pri registraciji:', error);
    return res.status(500).json({ message: 'Greška na serveru' });
  }
});

module.exports = router;
