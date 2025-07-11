const API_URL = process.env.REACT_APP_API_URL;

//dodavanje oglasa
export async function addAd(adData, token) {
  const response = await fetch(`${API_URL}/ads/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(adData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Neuspešno dodavanje oglasa');
  }

  return await response.json();
}

//dobavljanje oglasa
export async function getAds(page = 1, limit = 20) {
  const response = await fetch(`${API_URL}/ads?page=${page}&limit=${limit}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Greška pri dohvatanju oglasa');
  }
  return response.json();
}

//brisanje
export const deleteAd = async (adId, token) =>{
  const response = await fetch(`${API_URL}/ads/${adId}`,{
    method: 'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = 'Greška prilikom brisanja oglasa';
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } else {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
    } catch (e) {
      // fallback ako i json/text parsiranje padne
    }

    throw new Error(errorMessage);
  }
  return await response.json();
}