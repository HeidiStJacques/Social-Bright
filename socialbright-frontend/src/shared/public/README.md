# 🌐 Public Pages

This folder contains all publicly accessible pages in the SocialBright app. These routes do not require authentication and are available to all users, including prospective clients and staff.

## 📄 Included Pages

- **LoginPage.jsx** – Login form for users to access their accounts
- **ForgotPasswordPage.jsx** – Password reset request form
- **PasswordResetPage.jsx** – Reset password using token from email
- **NotFoundPage.jsx** – 404 page for invalid routes
- **PlansPage.jsx** - Plans offered for subscription
- **HomePage.jsx** - Main landing page

---

## 🎨 Styling

- Fully responsive using Tailwind CSS
- Lato font (via `@fontsource/lato`)
- Black text, links/buttons in `#007B94`
- Grey-100 backgrounds

---

## 🔐 Access Rules

- No authentication required
- Role redirects occur after login
- Reset password verifies token before update

---

## ✅ Tips

- Keep pages minimal and accessible
- Use consistent layout headers/footers if applicable
- Add public terms/privacy links to the footer when ready
