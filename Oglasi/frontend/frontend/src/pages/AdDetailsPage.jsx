import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AdDetailsPage({ isLoggedIn, username }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/ads/${id}`)
      .then(res => res.json())
      .then(data => setAd(data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (!ad) return <p>Učitavanje...</p>;

  const isOwner = isLoggedIn && ad.user.username === username;

  return (
    <div className="container mt-5 pt-5">
      <div className="card shadow-lg p-4">
        <div className="row">
          <div className="col-md-5">
            <img
              src={ad.imageUrl || 'https://via.placeholder.com/300'}
              alt={ad.title}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">{ad.title}</h2>
            <p className="text-muted">{ad.category} | {ad.city}</p>
            <h4 className="text-success mb-3">{ad.price} RSD</h4>
            <p><strong>Opis:</strong> {ad.description}</p>

            <hr />

            <h5>Informacije o korisniku:</h5>
            <p><strong>Korisnik:</strong> {ad.user.username}</p>
            <p><strong>Telefon:</strong> {ad.user.phone || 'Nije unet'}</p>

            {isOwner && (
              <div className="mt-4">
                <button
                  className="btn btn-outline-primary me-3"
                  onClick={() => navigate(`/edit-ad/${ad._id}`)}
                >
                  Izmeni
                </button>
                <button className="btn btn-outline-danger">
                  Obriši
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetailsPage;
