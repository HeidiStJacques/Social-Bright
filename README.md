# SocialBright

**SocialBright** is a HIPAA-compliant case management platform designed for social service providers, care coordinators, and human services teams. It supports client tracking, care planning, secure document uploads, eligibility reviews, and more — all in a user-friendly, multi-tenant environment.

---

## 🌟 **Features**

- ✅ Secure, HIPAA-aligned client data management
- 🧑‍⚕️ Customizable care plans
- 📁 Document uploads with category tagging
- 📅 Appointment calendar linked to clients
- 📊 Reports & dashboards for case workers and admins
- 🛡️ Role-based access control
- 🧩 Multi-tenant (organization-based) support

---

## 🚀 **Getting Started**

> ⚠️ This project is under active development.  
To run it locally:

### **Frontend**
```bash
cd socialbright-frontend
npm install
npm run dev

### **Backend (FastAPI + PostgreSQL)**
cd socialbright-backend
# Set up `.env` file with credentials
uvicorn app.main:app --reload

🛠️ Tech Stack
Frontend: React, Tailwind CSS
Backend: FastAPI (Python)
Database: PostgreSQL
Other: Docker, Stripe, MinIO, GitHub Actions

socialbright/
├── socialbright-frontend/    # React frontend
├── socialbright-backend/     # FastAPI backend
├── docs/                     # System architecture & policies
└── README.md

🧑‍💼 Who It's For
SocialBright is built for:
Medicaid Waiver Programs
Elder Services & Social Workers
Care Management Agencies
Multi-site Human Services Organizations

⚖️ License
This project is currently closed-source and does not have an open license.  
Please contact the maintainer for permissions or access.

🤝 Contributing
We welcome contributions!

📬 Contact
For more info, contact info@socialbright.org or visit socialbright.org (coming soon).


