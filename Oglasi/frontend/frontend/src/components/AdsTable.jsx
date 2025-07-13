import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { deleteAd } from '../services/advertisementService';


function AdsTable({ ads = [], isLoggedIn, username, refreshAds }) {
  const navigate = useNavigate();

  const handleDelete = async (adId) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete oglas?')) return;
    try {
      const token = localStorage.getItem('token');
      await deleteAd(adId, token);
      alert('Oglas uspešno obrisan');
      if (refreshAds) refreshAds(); // Osvježavanje oglasa ako funkcija postoji
    } catch (error) {
      alert(error.message);
    }
  };

  const categoryLabels = {
    clothing: 'Odeća',
    tools: 'Alati',
    sports: 'Sport',
    accessories: 'Aksesoari',
    furniture: 'Nameštaj',
    pets: 'Ljubimci',
    games: 'Igre',
    books: 'Knjige',
    technology: 'Tehnologija'
  };


  return (
    <table className="table modern-table">
      <thead>
        <tr>
          <th>Slika</th>
          <th>Naziv</th>
          <th>Cena</th>
          <th>Grad</th>
          <th>Kategorija</th>
          {isLoggedIn && <th>Akcije</th>}
        </tr>
      </thead>
      <tbody>
        {ads.map(ad => (
          <tr key={ad._id}>
            <td>
              <img
                src={ad.imageUrl || 'https://via.placeholder.com/70'}
                alt={ad.title}
                className="ad-image"
              />
            </td>
            <td className="fw-semibold">{ad.title}</td>
            <td className="text-pink fw-bold">{ad.price} RSD</td>
            <td>{ad.city}</td>
            <td>{categoryLabels[ad.category] || ad.category}</td>
            {isLoggedIn && (
              <td>
                {ad.user.username === username ? (
                  <>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/edit-ad/${ad._id}`)} >Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(ad._id)}>Delete</button>
                  </>
                ) : (
                  <span className="text-muted">Nije vaš oglas</span>
                )}
              </td>
              
            )}
            {isLoggedIn &&(
            <td className="fw-semibold">
              <Link to={`/ads/${ad._id}`}>DETALJI</Link>
            </td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdsTable;
