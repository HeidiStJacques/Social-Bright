# 👤 Development – User Pages

This folder contains in-development components and layouts related to **case managers and regular users** within the SocialBright platform. These pages represent tools used by front-line staff to manage clients, notes, tasks, calendars, and care plans.

---

## 🗂 Included Pages

The following components may be found in this folder (depending on your current build):

- **Calendar**
- **Case Notes**
- **Client Overview**
- **Clients**
- **Dashboard**
- **Demographics**
- **Eligibility**
- **Providers**
- **Reports**
- **Status Form**
- **Tasks**  

---

## 🧪 Purpose

These pages are:
- **In development** — not yet merged into the production `/src/user` folder.
- **Meant for internal testing and feedback**
- Designed to evolve rapidly based on team input and real-world workflows

---

## 🖼 Screenshots

Screenshots and walkthroughs will be added to this folder to support documentation and visual QA.

---

## 📌 Notes

- These pages are connected to **multi-tenant**, **role-based access control** logic.
- Most components rely on client selection from a dashboard or global context.
- Sensitive tenant details should be **abstracted** before pushing public code.

---

## 🧼 Cleanup Reminder

Once components here are finalized:
- Move them into `/src/user/`
- Update routing and layout imports
- Delete outdated versions from this folder

---

## 📣 Collaboration

Pull requests, reviews, and feedback are encouraged as these tools are core to daily user workflows.

---

