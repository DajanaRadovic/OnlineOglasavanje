const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//Login
router.post('/login', async(req, res)=>{
  const {username, password} = req.body;

  try{

    const user = await User.findOne({username});
    if(!user){
      return res.status(400).json({message:'Neispravno korisnicko ime i lozinka'})
    }

    // Provera lozinke
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Neispravno korisničko ime ili lozinka' });
    }

    // Generisanje JWT tokena
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Uspešno prijavljivanje',
      token,
      username: user.username
    });
  }catch(error){
    console.error('Greska pri login:', error);
    return res.status(500).json({message:'Greska na serveru'});
  }
})


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
