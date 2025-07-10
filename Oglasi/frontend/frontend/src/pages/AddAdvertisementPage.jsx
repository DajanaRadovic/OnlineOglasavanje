import {useState} from 'react';
import {addAd} from '../services/advertisementService'

function AddAdvertisementPage() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await addAd(formData, token);
      setSuccess('Oglas uspešno dodat!');
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        price: '',
        category: '',
        city: ''
      });
    } catch (err) {
      setError('Greška prilikom dodavanja oglasa.');
    }
  };

  return (
    <div className="container mt-5 pt-5">
     <h2>Dodaj oglas</h2>
     <form onSubmit={handleSubmit}>
          <div className="row mb-3">
               <div className="col-md-6">
               <label>Naziv</label>
               <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    required
               />
               </div>
               <div className="col-md-6">
               <label>Grad</label>
               <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                    required
               />
               </div>
          </div>

          <div className="row mb-3">
               <div className="col-md-6">
               <label>Cena</label>
               <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    required
               />
               </div>
               <div className="col-md-6">
               <label>Kategorija</label>
               <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-control"
                    required
               >
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
          </div>

          <div className="row mb-3">
          <div className="col-md-6">
          <label>URL slike</label>
          <input
               name="imageUrl"
               value={formData.imageUrl}
               onChange={handleChange}
               className="form-control"
          />
          </div>

          <div className="col-md-6">
          <label>Opis</label>
          <textarea
               name="description"
               value={formData.description}
               onChange={handleChange}
               className="form-control"
               rows="3"
               style={{ resize: 'vertical' }}
               required
          />
          </div>
          </div>
          {success && (
          <div className="row mb-3">
          <div className="col-md-6">
               <div className="alert alert-success">{success}</div>
          </div>
          </div>
          )}
          {error && (
          <div className="row mb-3">
          <div className="col-md-6">
               <div className="alert alert-danger">{error}</div>
          </div>
          </div>
          )}

          <button type="submit" className="btn btn-primary">Dodaj</button>
     </form>
</div>

  );
}

export default AddAdvertisementPage;