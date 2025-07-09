const API_URL = process.env.REACT_APP_API_URL;

export async function login(username, password) {

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json();
}

export async function register(username, password, phone) {
    
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, phone }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return await response.json(); // { message: "Korisnik uspešno registrovan" }
}