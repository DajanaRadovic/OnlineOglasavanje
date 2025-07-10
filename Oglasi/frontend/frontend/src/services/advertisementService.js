const API_URL = process.env.REACT_APP_API_URL;

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

export async function getAds(page = 1, limit = 20) {
  const response = await fetch(`${API_URL}/ads?page=${page}&limit=${limit}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Greška pri dohvatanju oglasa');
  }
  return response.json();
}