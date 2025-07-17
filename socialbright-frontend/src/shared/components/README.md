# 🧩 Shared / Components

This folder contains **reusable UI components** that are shared across multiple parts of the SocialBright application. These components help keep the frontend consistent, maintainable, and efficient by avoiding repeated code.

---

🎯 Purpose
----------

The `shared/components` directory is designed to:

-  Promote reuse of common UI elements
-  Enforce a consistent visual style across the app
-  Make it easier to maintain UI features in one place
-  Speed up development and prototyping

---

📦 Typical Components
---------------------

You may find components such as:

-  `Button.jsx` – Reusable button with consistent styling
-  `Modal.jsx` – A general-purpose popup/modal
-  `Table.jsx` – Dynamic, sortable, responsive table
-  `FormField.jsx` – Input field with label and error display
-  `SectionHeader.jsx` – Title bar for sections or cards
-  `StatusBadge.jsx` – Displays status (Active, Suspended, etc.)
-  `Card.jsx` – Content block with padding, border, and shadow

---

✅ Best Practices
----------------

-  Use **PascalCase** filenames (e.g., `FormField.jsx`)
-  Keep components stateless when possible
-  Accept props for configurability
-  Use Tailwind CSS for styling (responsive classes too)
-  Avoid business logic in these components

---

💡 Example Usage
----------------

```jsx
import Button from '@shared/components/Button';

<Button onClick={handleClick}>
  Submit
</Button>
