import React, { useState, useEffect } from 'react';
import AdsTable from '../components/AdsTable';

function HomePage({isLoggedIn, username, refreshAds, setRefreshAds}) {
  const [adsData, setAdsData] = useState({ ads: [], total: 0, page: 1, pages: 1 });
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minPrice: '',
    maxPrice: '',
    mine: false,
  });
  
 useEffect(() => {
  if (refreshAds) {
    setAdsData({ ads: [], total: 0, page: 1, pages: 1 });
    setRefreshAds(false);
  }
}, [refreshAds, setRefreshAds]);
  useEffect(() => {
    fetchAds(1); // učitavanje prve stranice pri promeni filtera
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (!isLoggedIn && filters.mine) {
    setFilters(prev => ({ ...prev, mine: false }));
  }
  
  fetchAds(1); // kad se loguje/izloguje, učitaj oglase
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isLoggedIn]);



  const fetchAds = (page) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', 20);

    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.mine && isLoggedIn) params.append('mine', 'true');

    const token = localStorage.getItem('token');
    const headers = {};
    if(token){
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(`http://localhost:5000/api/ads?${params.toString()}`,{
      headers
    })
      .then(res => res.json())
      .then(data => {
        setAdsData(data);
        setAdsData(prev => ({ ...prev, page })); // update trenutne stranice
      })
      .catch(err => console.error(err));
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePageChange = (newPage) => {
    fetchAds(newPage);
  };

  

  return (
    <div className="container mt-5 pt-5">
      <h1>Lista oglasa</h1>

      {/* Filteri */}
      <form className="mb-4 row g-3">
        <div className="col-md-3">
          <label>Kategorija</label>
          <select name="category" value={filters.category} onChange={handleFilterChange} className="form-select">
            <option value="">Sve kategorije</option>
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

        <div className="col-md-3">
          <label>Ime (pretraga)</label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="form-control"
            placeholder="Pretraga po nazivu"
          />
        </div>

        <div className="col-md-2">
          <label>Min cena</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="form-control"
            min="0"
          />
        </div>

        <div className="col-md-2">
          <label>Max cena</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="form-control"
            min="0"
          />
        </div>

        <div className="col-md-2 d-flex align-items-center pt-4">
          <input
            type="checkbox"
            name="mine"
            checked={filters.mine}
            onChange={handleFilterChange}
            id="mineOnly"
            disabled={!isLoggedIn} // onemogući ako nije ulogovan
          />
          <label htmlFor="mineOnly" className="ms-2 mb-0">
            Prikaži samo moje oglase
          </label>
        </div>
      </form>

      {/* Tabela oglasa */}
      <AdsTable ads={adsData.ads} isLoggedIn={isLoggedIn} username={username} />

      {/* Paginacija */}
      <nav aria-label="Paginacija" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${adsData.page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(adsData.page - 1)}>
              Prethodna
            </button>
          </li>

          {[...Array(adsData.pages)].map((_, idx) => (
            <li key={idx + 1} className={`page-item ${adsData.page === idx + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                {idx + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${adsData.page === adsData.pages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(adsData.page + 1)}>
              Sledeća
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
