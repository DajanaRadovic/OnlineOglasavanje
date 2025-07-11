import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateAd } from '../services/advertisementService';

function EditAdvertisementPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    price: '',
    category: '',
    city: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/ads/${id}`)
      .then(res => res.json())
      .then(data => setFormData({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        price: data.price,
        category: data.category,
        city: data.city
      }))
      .catch(err => {
        console.error(err);
        setError('Greška pri učitavanju oglasa.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await updateAd(id, formData, token);
      setSuccess('Oglas uspešno ažuriran!');
      setTimeout(() => navigate(`/ads/${id}`), 1000);
    } catch {
      setError('Greška prilikom izmene oglasa.');
    }
  };

  return (
    <div className="container mt-5 pt-5 d-flex justify-content-center">
      <div className="p-4 rounded shadow" style={{ backgroundColor:(255, 255, 255, 0.6), width: '100%', maxWidth: '700px' }}>
        <h2 className="mb-4 text-center">Izmeni oglas</h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label>Naziv</label>
              <input name="title" value={formData.title} onChange={handleChange} className="form-control" required />
            </div>

            <div className="col-md-6">
              <label>Grad</label>
              <input name="city" value={formData.city} onChange={handleChange} className="form-control" required />
            </div>

            <div className="col-md-6">
              <label>Cena</label>
              <input name="price" type="number" value={formData.price} onChange={handleChange} className="form-control" required />
            </div>

            <div className="col-md-6">
              <label>Kategorija</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-select" required>
                <option value="">Izaberi kategoriju</option>
                <option value="clothing">Odeća</option>
                <option value="tools">Alati</option>
                <option value="sports">Sport</option>
                <option value="accessories">Aksesoari</option>
                <option value="furniture">Nameštaj</option>
                <option value="pets">Ljubimci</option>
                <option value="games">Igre</option>
                <option value="books">Knjige</option>
                <option value="technology">Tehnologija</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>URL slike</label>
              <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="form-control" />
            </div>

            <div className="col-md-12">
              <label>Opis</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="3" required />
            </div>

            {success && <div className="alert alert-success mt-3">{success}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="col-12 mt-3 text-center">
              <button type="submit" className="btn btn-primary px-5">Sačuvaj izmene</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAdvertisementPage;
