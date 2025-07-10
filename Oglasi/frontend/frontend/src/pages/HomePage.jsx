import React, { useState, useEffect } from 'react';
import AdsTable from '../components/AdsTable';

function HomePage() {
  const [adsData, setAdsData] = useState({
    ads: [],
    total: 0,
    page: 1,
    pages: 1,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const limit = 20; // broj oglasa po strani

  const fetchAds = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/ads?page=${page}&limit=${limit}`);
      const data = await response.json();
      setAdsData({
        ads: data.ads,
        total: data.total,
        page: data.page,
        pages: data.pages,
      });
    } catch (error) {
      console.error('Greška pri dohvatanju oglasa:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(1);

    // Token i korisnik iz localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    setIsLoggedIn(!!token);
    setUsername(user || '');
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > adsData.pages) return;
    fetchAds(newPage);
  };

  return (
    <div className="ads-list-container mt-5 pt-5">
      <h1>Lista oglasa</h1>

      {loading ? (
        <p>Učitavanje oglasa...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default HomePage;
