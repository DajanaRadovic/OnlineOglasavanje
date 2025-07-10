require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const { DB_connection } = require('./config/dbconfig')

const app = express();
const port = process.env.PORT || 800;

DB_connection();

app.use(cors());
app.use(express.json()); //Parsiranje JSON body

//Testiranje 
app.get('/api/test', (req, res) => {
  res.json({ message: 'Radi server i MongoDB!' });
});

const authRoutes = require('./routes/auth');
const advertisementRoutes = require('./routes/advertisements');

app.use('/api', authRoutes);
app.use('/api/ads', advertisementRoutes);
app.use('/api', advertisementRoutes);

// Pokretanje servera
app.listen(port, () => console.log(`Server is running on port ${port}`));