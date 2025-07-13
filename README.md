# 🛒 Online Oglasavanje - Full Stack Aplikacija

Ovo je full stack aplikacija za online oglašavanje, razvijena korišćenjem **Express.js** za backend, **React.js** za frontend i **MongoDB** za bazu podataka.

## 📌 Tehnologije

- **Backend:** Express.js
- **Frontend:** React.js
- **Baza:** MongoDB

### Pokretanje servera:
 Navigacija u backend direktorijum i pokretanje:
  ```bash
  cd backend
  node app.js
  ```
### Pokretanje seed skripte:

```bash
cd backend
node seed.js
```

---

### Pokretanje frontend:

 Navigacija u frontend direktorijum i pokretanje:
   ```bash
     cd frontend
     npm start
  ```
---

## 🏠 Početna stranica

- Prikazuje se tabela sa svim oglasima.
- Neregistrovani korisnici vide dugmad za **Login** i **Register**.

   ![Oglasi](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/oglasi.png)

## 👤 Registracija korisnika

- Korisnik unosi korisničko ime, šifru i broj telefona.
- Validacija unosa:
  - Korisničko ime: minimum 3 karaktera
  - Šifra: minimum 6 karaktera
  - Telefon: dozvoljeni samo brojevi

    ![Početna stranica](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/registracija.png)

## 🔐 Prijava korisnika

- Nakon uspešne prijave, korisnik može:
  - Dodavati nove oglase
  - Pregledati sve oglase
  - Izlogovati se

  ![Nakon prijave](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/nakonLogovanja.png)

## ➕ Dodavanje oglasa

- Korisnik unosi sledeće podatke:
  - Naziv oglasa
  - Opis
  - URL slike
  - Cena
  - Kategorija (iz padajućeg menija)
  - Grad

     ![Oglasi](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/dodavanje.png)

## ✏️ Izmena i 🗑️ Brisanje oglasa

- Opcije za izmenu i brisanje su dostupne samo vlasniku oglasa.

## 🔍 Detalji oglasa

- Prikaz detaljnog opisa oglasa i podataka o korisniku koji ga je postavio.

  ![Detalji](https://github.com/DajanaRadovic/OnlineOglasavanje/blob/main/Oglasi/screenshots/detalji.png)

## 🎯 Filtriranje oglasa

- Po kategoriji (padajući meni)
- Po nazivu (pretraga koja nije osetljiva na velika/mala slova)
- Po ceni (minimalna i/ili maksimalna)
- Checkbox "Show mine only" — prikazuje samo oglase koje je korisnik postavio

## 📄 Paginacija

- Prikazuje se 20 oglasa po stranici

---
## 🔒 Bezbednost aplikacije

- Validacija inputa kod registracije
- JWT autentifikacija
- Hashiranje lozinki bcrypt-om
- Autorizacija korisnika za izmene i brisanje oglasa
- Korišćenje `.env` fajla za osetljive podatke


