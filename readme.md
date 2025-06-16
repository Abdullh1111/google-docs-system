
---

# 🎫 Document Management System

A comprehensive **Document Management System** designed to facilitate user support ticket submissions and provide administrators with efficient management capabilities. Key features include:

* **User Authentication**: Secure user registration, login, and logout functionality.
* **Document Management**: Users can create, view, and delete their own documents.
* **Document Sharing**: Users can share documents with others via email.
* **Role-Based Access Control**: Shared users can access documents according to assigned roles; for example, editors have permission to modify documents.
* **Real-Time Collaboration**: Changes made to a document by one user are instantly visible to all other shared users.
* **Active User Tracking**: View the number of active users currently collaborating on a specific document.

🔗 **Live Demo**: [https://google-docs-system.vercel.app](https://google-docs-system.vercel.app)
*Note: The backend is hosted on a free Render plan, which may take 5–10 minutes to start initially. Once running, performance is smooth.*

---

## 🚀 Project Setup

### 🧩 Frontend

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Configure environment variables:
   Create a `.env` file based on the `.env.example` provided.

3. Start the development server:

   ```bash
   yarn dev
   ```

---

### ⚙️ Backend

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Configure environment variables:
   Create a `.env` file based on the `.env.example` provided.

3. Run Prisma migrations:

   ```bash
   yarn prisma migrate dev --name init
   ```

4. Start the backend server:

   ```bash
   yarn dev
   ```

---
