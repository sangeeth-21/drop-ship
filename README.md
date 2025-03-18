# 🚀 React + Vue + TSX Project

## 📌 Project Overview
This project is built using **React**, **Vue**, and **TypeScript (TSX)**, deployed on **Cloudflare**, and uses **Supabase** as the database backend.

### 🌐 Live URL
[Project URL](https://your-project-url.com)

---

## 🛠️ Technologies Used

### Frontend:
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React** (Component-based UI)
- ![Vue](https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white) **Vue 3** (Reactive UI components)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript (TSX)** (Strongly typed components)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** (Utility-first styling)
- ![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-FB923C?style=for-the-badge&logo=shadcn-ui&logoColor=black) **ShadCN UI** (Pre-built UI components)

### Backend:
- ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white) **Cloudflare Workers** (Serverless API functions)
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) **Supabase** (PostgreSQL DB & Auth)

### Deployment & DevOps:
- ![Cloudflare Wrangler](https://img.shields.io/badge/Wrangler-000000?style=for-the-badge&logo=cloudflare&logoColor=orange) **Wrangler** (Cloudflare deployment tool)
- ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) **GitHub Actions** (CI/CD automation)

---

## 🔧 Setting Up the Project

### 1️⃣ Clone the Repository
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run Development Server
```sh
npm run dev
```

---

## 📡 Deploying to Cloudflare with Wrangler

### 1️⃣ Install Wrangler CLI
```sh
npm install -g wrangler
```

### 2️⃣ Authenticate Cloudflare
```sh
wrangler login
```

### 3️⃣ Publish the API
```sh
wrangler publish
```

---

## 📦 Supabase Integration
This project uses **Supabase as a database backend** with the following API functions:

### 📥 Uploading an Image (Example API Endpoint)
```ts
app.post("/upload", async (c) => {
  const supabase = getSupabaseClient();
  const formData = await c.req.formData();
  const file = formData.get("file") as File;
  if (!file) return c.json({ error: "No file provided" }, 400);

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
  if (error) return c.json({ error: error.message }, 500);

  const publicUrl = supabase.storage.from("uploads").getPublicUrl(fileName);
  return c.json({ url: publicUrl });
});
```

### 🗂️ Database Table: `comments`
```sql

## 🚀 Deploying the Project

### 1️⃣ Deploy API to Cloudflare
```sh
wrangler deploy
```

### 2️⃣ Deploy Frontend to Cloudflare Pages
```sh
git push origin main
```

### 3️⃣ View Live Project
After deployment, your project will be accessible at:
```
https://your-cloudflare-page-url.com
```

---

## 🎯 Features
✅ React + Vue hybrid frontend
✅ TypeScript with TSX
✅ Tailwind CSS for styling
✅ Cloudflare Workers for API
✅ Supabase for DB and storage
✅ Commenting system
✅ Secure authentication
✅ GitHub Actions for CI/CD

---

## 💡 Want to Contribute?
Feel free to fork the repo and submit a PR! 🚀

