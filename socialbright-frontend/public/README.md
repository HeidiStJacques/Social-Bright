# 🖼️ Public Images

This folder contains static image assets used in the **public-facing areas** of the SocialBright platform.

These assets are available directly to the browser and are not processed by the React/Vite build system. They are typically referenced by direct URL paths such as `/images/logo.png`.

---

## 📂 Common Files Stored Here

- **Logos**
  - `logo.png`, `logo-white.png`, etc.
- **Icons**
  - Static social icons, favicons, etc.
- **Backgrounds**
  - Public marketing background images
- **Screenshots**
  - Product or dashboard screenshots for use on the Home, About, or Pricing pages

---

## ⚠️ Usage Notes

- Do **not** store private or dynamic images here
- Do **not** import these in React with `import ...` — instead use:
  ```html
  <img src="/images/logo.png" alt="SocialBright Logo" />
  ```

- This folder is publicly accessible to all users

---

## 📬 Contact

For questions about image use or design guidelines, please contact:  
**info@socialbright.org**



