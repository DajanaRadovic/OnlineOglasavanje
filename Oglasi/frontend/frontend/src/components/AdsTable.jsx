import React from 'react';
import {Link} from 'react-router-dom';

function AdsTable({ ads = [], isLoggedIn, username }) {
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
      <td className="text-primary fw-bold">{ad.price} RSD</td>
      <td>{ad.city}</td>
      <td className="text-capitalize">{ad.category}</td>
      {isLoggedIn && (
        <td>
          <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
          <button className="btn btn-sm btn-outline-danger">Delete</button>
        </td>
        
      )}
      <td className="fw-semibold">
        <Link to={`/ads/${ad._id}`}>DETALJI</Link>
      </td>
    </tr>
  ))}
</tbody>
    </table>
  );
}

export default AdsTable;
