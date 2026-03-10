# HerStories Africa

> _A 3D digital archive preserving the biographies, legacies, of told and untold histories of African women._

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-FastAPI-green?style=flat-square&logo=python)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)
![Frontend on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)
![Backend on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)

---

## What is HerStories?

HerStories is a platform built at the intersection of technology and African women's history. It exists because these stories deserve to be told, and technology is the most powerful tool we have to tell them.

The platform features:

- **3D Wall of Fame** — an interactive, immersive library of African women's biographies rendered in 3D
- **Biography Archive** — detailed profiles celebrating the lives, legacies, and contributions of African women across history
- **Women's Studies Archive** — a curated collection of research materials, papers, and resources for women's studies (in progress)

---

## Tech Stack

| Layer            | Technology                    |
| ---------------- | ----------------------------- |
| Frontend         | Next.js 16, React, TypeScript |
| Styling          | Tailwind CSS                  |
| 3D Rendering     | React Three Fiber / Three.js  |
| Backend          | Python, FastAPI               |
| Frontend Hosting | Vercel                        |
| Backend Hosting  | Render                        |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- npm or yarn

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/CelineJames/herstories.git

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app.main:app --reload
```

Backend runs on [http://localhost:8000](http://localhost:8000)

API docs available at [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=your_render_backend_url_here
```

> The backend is hosted on Render. Once deployed, copy your Render service URL and paste it as the value above. This connects your frontend to the live API.

---

## Contributing

This project uses a protected main branch. All contributions must go through a pull request.

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes, then push
git push origin feature/your-feature-name

# Open a Pull Request on GitHub
```

---

## About the Developer

Built by **Itoro Uwem James** — Frontend Developer, AI-augmented builder, and advocate for African women's stories in tech and history.

- 🌐 [Portfolio](https://itoro-james.vercel.app)
- 💼 [LinkedIn](https://www.linkedin.com/in/itoro-celine-james)
- 🐙 [GitHub](https://github.com/CelineJames)

---

_HerStories Africa — Documenting Her, Defining Us...._
