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

router.get('/ads', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search, minPrice, maxPrice, mine } = req.query;

    // Ako korisnik hoće svoje oglase, mora biti autentifikovan
    if (mine === 'true') {
      // Middleware ručno pozivam ovde
      authenticateToken(req, res, async () => {
        await fetchAds(req, res);
      });
    } else {
      // Javne oglase šaljemo bez tokena
      await fetchAds(req, res);
    }
  } catch (error) {
    console.error('Greska pri dohvatanju oglasa:', error);
    res.status(500).json({ message: 'Greska na serveru' });
  }
});

async function fetchAds(req, res) {
  const { page = 1, limit = 20, category, search, minPrice, maxPrice, mine } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (mine === 'true') filter.user = req.user.id;

  const skip = (page - 1) * limit;
  const total = await Advertisement.countDocuments(filter);
  const ads = await Advertisement.find(filter)
    .sort({ postedAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate('user', 'username');

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    ads
  });
}
 
//Dobavljanje oglasa po ID-u
router.get('/ads/:id', async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id).populate('user', 'username phone');
    if (!ad) return res.status(404).json({ message: 'Oglas nije pronađen' });

    res.json(ad);
  } catch (error) {
    console.error('Greška pri dohvatanju oglasa:', error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

//Brisanje oglasa
router.delete('/ads/:id', authenticateToken, async (req, res)=>{
  try{
    const ad = await Advertisement.findById(req.params.id);
    if(!ad){
      return res.status(404).json({message: 'Oglas nije pronadjen'})
    }
    // Provera da li je ulogovani korisnik vlasnik oglasa
    if (ad.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Nemate dozvolu da obrišete ovaj oglas' });
    }

    await ad.deleteOne();
     res.json({ message: 'Oglas uspešno obrisan' });

  }catch(error){
    console.error('Greska pri brisanju oglasa:', error);
    res.status(500).json({message:'Greska na serveru'});
  }
})

//Editovanje oglasa
router.put('/ads/:id', authenticateToken, async (req, res)=>{
  try{
    const ad = await Advertisement.findById(req.params.id);
    if(!ad){
      return res.status(404).json({message:'Oglas nije pronadjen'});
    }

    if(ad.user.toString() != req.user.id){
      return res.status(403).json({message:'Nemate dozvolu za menjanje oglasa'});
    }

    // Ažuriranje vrednosti
    ad.title = req.body.title || ad.title;
    ad.description = req.body.description || ad.description;
    ad.imageUrl = req.body.imageUrl || ad.imageUrl;
    ad.price = req.body.price || ad.price;
    ad.category = req.body.category || ad.category;
    ad.city = req.body.city || ad.city;

    await ad.save();
    res.json({ message: 'Oglas uspešno ažuriran', ad });

  }catch(error){
    console.error('Greska prilikom izmene:', error);
    res.status(500).json({message:'Greska na serveru'});
  }
})

module.exports = router;