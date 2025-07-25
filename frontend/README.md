# 🌟 SocialBright Frontend

Welcome to the official **SocialBright Frontend** – a HIPAA-compliant case management interface built using **React**, **Vite**, and **Tailwind CSS**. This frontend connects to a Django backend and supports multi-tenancy, secure authentication, Stripe billing, and role-based access control.

---

## 🚀 Features

- 🔐 Role-based login for Case Managers, Admins, and Superusers
- 🏢 Multi-tenant support
- 💳 Stripe-integrated pricing and billing
- 🧑‍⚕️ Case Management tools: Clients, Calendar, Tasks, Care Plans, Documents
- 📄 Secure document uploads (PDF, DOCX, etc.)
- 📊 Reports and analytics per tenant
- ✅ Fully responsive, professional UI with Tailwind CSS
- ⚙️ React Router DOM with protected routes and layouts

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Auth**: Token-based auth with context
- **State**: Context API
- **Payments**: Stripe Checkout (via backend)
- **API**: Django (hosted separately)
- **Encryption**: E2EE-ready via Web Crypto API

---

## ⚙️ Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Backend running separately (Django API)

---

## 🧪 Testing

To be added (e.g., Vitest, React Testing Library)

---

## 📦 Deployment

Use your preferred static host (e.g., Vercel, Netlify, Cloudflare Pages) and point to the dist/ folder.

Ensure CORS is configured properly on the backend to allow API requests.

---

## 🧑‍💻 Contributing

Fork this repo

Create a branch: git checkout -b feature/YourFeature

Commit your changes: git commit -am 'Add feature'

Push to branch: git push origin feature/YourFeature

Create a pull request

---

## 📄 License

This project is © SocialBright. All rights reserved. Not open source at this time.

---

## ✉️ Contact

For support or questions, please email info@socialbright.org.

---

## 🔐 HIPAA Compliance Notice

SocialBright is designed with HIPAA principles in mind, including:

Role-based access control

Secure document handling

Audit logs

End-to-end encryption (E2EE) support

No data is shared or sold

---




