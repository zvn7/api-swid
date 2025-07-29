# 📖 SWID API Documentation

Sebuah RESTful API untuk aplikasi **SWID (Sahabat Wellbeing Indonesia)** — platform berbagi cerita dengan fitur autentikasi, kategori, dan moderasi cerita.

---

## 🌐 Base URL

```
http://localhost:5000/api
```

---

## 🚀 Fitur Utama

- ✅ Register & Login (JWT-based authentication)
- 📝 Submit Cerita
- 🗂️ Kategori Cerita
- 🧑‍⚖️ Moderasi Status Cerita
- 🔐 Proteksi endpoint pakai middleware auth

---

## 📦 Instalasi & Menjalankan Server

```bash
git clone https://github.com/username/cerita-jiwa-api.git
cd cerita-jiwa-api
npm install
cp .env.example .env
# Edit file .env lalu isi MONGO_URI & JWT_SECRET
npm run dev
```

---

## 🔐 Autentikasi

Gunakan JWT Token yang dikirim saat login:

```
Authorization: Bearer <token>
```

---

## 📘 Endpoints

### 🧑‍💼 Auth & Users

#### `POST /users/register`

Register user baru.

```json
{
  "username": "aam",
  "email": "aam@mail.com",
  "password": "rahasia123"
}
```

#### `POST /users/login`

Login & dapatkan token.

```json
{
  "email": "aam@mail.com",
  "password": "rahasia123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "<jwt_token>"
}
```

---

### 📚 Stories

#### `GET /stories`

Ambil semua cerita (publik).

#### `POST /stories`

Kirim cerita baru (butuh token).

**Header:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "title": "Cerita Pertamaku",
  "content": "Isi cerita yang menyentuh...",
  "category": "65dxxxxxxxxx"
}
```

#### `PATCH /stories/:id/status`

Update status cerita (butuh token).

```json
{
  "status": "published"
}
```

---

### 🏷️ Categories

#### `GET /categories`

Ambil semua kategori.

#### `POST /categories`

Buat kategori baru (butuh token).

```json
{
  "name": "Kesehatan"
}
```

---

## ⚠️ Error Handling

Jika terjadi error, respon akan seperti ini:

```json
{
  "success": false,
  "code": 404,
  "message": "Endpoint tidak ditemukan."
}
```

---

## 📁 Struktur Folder

```
.
├── controllers/
├── middlewares/
├── models/
├── routes/
├── .env
└── index.js
```

---

## ✍️ Kontribusi

Pull request & issue sangat diterima. Jangan lupa sertakan deskripsi yang jelas yaa! 🙌

---

## 🧠 TODO (Versi Berikutnya)

- ✉️ Notifikasi email ke admin
- ❤️ Like & React
- 💬 Komentar anonim
- 📥 Simpan cerita
- 🔍 Filter & search
- 📄 Halaman About (versi frontend)

---

## 👨‍💻 Author

**Ilham Maulana** a.k.a **Aam**  
_Web Developer | Odoo Dev | UI/UX Designer_

✉️ [ilhammaul917@gmail.com](mailto:ilhammaul917@gmail.com)