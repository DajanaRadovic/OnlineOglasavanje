const express = require('express');
const Advertisement = require('../models/Advertisement');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', authenticateToken, async(req,res)=>{
    const {title, description, imageUrl, price, category, city} = req.body;

    try {
    const newAd = new Advertisement({
      title,
      description,
      imageUrl,
      price,
      category,
      city,
      user: req.user.id, // U JWT middleware-u sam postavila req.user
    });

    await newAd.save();
    res.status(201).json({ message: 'Oglas uspešno dodat', ad: newAd });

  } catch (error) {
    console.error('Greška pri dodavanju oglasa:', error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

 // Dobavljanje oglasa
router.get('/ads', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Advertisement.countDocuments();
    const ads = await Advertisement.find()
      .sort({postedAt: -1})
      .skip(skip)
      .limit(limit)
      .populate('user', 'username') // da dobijem korisničko ime koje je postavilo oglas

    res.json({
        total,
        page,
        pages: Math.ceil(total / limit),
        ads
    });
  } catch (error) {
    console.error('Greška pri dohvatanju oglasa:', error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

module.exports = router;