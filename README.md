Absolutely! Here’s a **concise, clear README** for your DTP Support Center backend. It explains architecture, API examples, DB structure, environment, security, and Knex usage.

---

# **DTP Support Center Backend**

## **1. Overview**

This backend powers the **DTP Support Center** application. It provides APIs for:

* **User Authentication** (register/login, JWT-based security)
* **FAQ Management** (CRUD, search, category filters)
* **Role & Permission Management** (optional for admin)

**Tech stack:** Node.js, Express, MySQL, Knex, JWT, Swagger for API docs.

---

## **2. Architecture**

```
server.js          --> Entry point, loads routes, Swagger, DB connection
config/db.js       --> Knex MySQL client configuration
routes/            --> API endpoints per entity (auth, faqs, roles, permissions)
controllers/       --> Handle request/response & Swagger docs
services/          --> Business logic & DB queries via Knex
utils/logger.js    --> Custom logger to log events to console & file
tests/             --> Jest + Supertest unit tests
```

**Flow:** `Client → Routes → Controller → Service → DB → Response → Client`

---

## **3. Database**

**Environment Variables:**

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your-database
DB_NAME=dtp_db
JWT_SECRET=yourjwtsecret
PORT=5000
```

**Tables & Relationships:**

* `users` → stores user info, linked to `roles`
* `roles` → defines user roles (guest, admin, etc.)
* `permissions` → actions allowed per role
* `role_permissions` → many-to-many between roles & permissions
* `faq` → stores questions, answers, category, created_by, updated_by

**Relationships:**

* `users.role_id → roles.id`
* `role_permissions.role_id → roles.id`
* `role_permissions.permission_id → permissions.id`
* `faq.created_by, faq.updated_by → users.id`

**Knex** handles query building and migrations for MySQL, e.g.,

```js
const roles = await db('roles').select('*');
await db('faq').insert({ question, answer, category, created_by });
```

---

## **4. API Examples**

**Base URL:** `http://localhost:5000/api/v1`

* **Register user**

```http
POST /auth/register
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

* **Login**

```http
POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns JWT token.

* **Create FAQ (admin)**

```http
POST /faqs
Headers: Authorization: Bearer <JWT>
{
  "question": "What is DTP?",
  "answer": "Desktop publishing software",
  "category": "Software",
  "created_by": 1
}
```

* **Search FAQ**

```http
GET /faqs/search?keyword=DTP
```

* **Get FAQ by ID**

```http
GET /faqs/1
```

---

## **5. Security**

* JWT token authentication for protected endpoints.
* Passwords hashed using bcrypt before storing in DB.
* Role-based access control for admin-only operations.

---

## **6. Running the Project**

1. Install dependencies:

```bash
npm install
```

2. Setup `.env` file (see above)
3. Run migrations (if implemented with Knex)
4. Start server:

```bash
npm run dev
```

5. Swagger docs available at: `http://localhost:5000/docs`

---

## **7. Testing**

Unit tests with Jest + Supertest:

```bash
npm test
```

Tests cover **CRUD operations for users, roles, permissions, role-permissions, FAQs**. DB cleanup is done after each suite.

---

This README gives a **complete overview** while staying **short and clear**, perfect for submission or developer onboarding.

---

If you want, I can also **add a small diagram of the DB relationships and API flow** in Markdown to make it visually easier to understand.

Do you want me to do that next?
# dtp-frontend
