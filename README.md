<div align="center">

# 🍎 FoodScanner AI 📸

**AI-powered food analysis from a single photo.**
https://fruitai-jevh.onrender.com/

Analyze food freshness, identify products, estimate calories, and get storage recommendations — powered by **Google Gemini 2.5 Flash**.

<br>

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)

</div>

---

## 📖 Overview

**FoodScanner AI** is an intelligent web application that analyzes food products from photos.

The application uses:

- **FastAPI** for the backend
- **Vanilla HTML/CSS/JavaScript** for the frontend
- **Google Gemini 2.5 Flash** as the AI engine

The AI analysis is designed to:

- 🔎 Identify the food product
- 🥬 Assess freshness
- 🔥 Estimate calorie content
- 📦 Provide storage recommendations

---

## ✨ Features

| Feature | Description |
|---|---|
| 📸 **Photo Analysis** | Analyze a food product from an uploaded image |
| 🥬 **Freshness Assessment** | Evaluate the apparent freshness of the product |
| 🔎 **Product Recognition** | Identify the food shown in the image |
| 🔥 **Calorie Estimation** | Provide an estimated calorie value |
| 📦 **Storage Recommendations** | Suggest appropriate storage guidance |
| 🤖 **AI-Powered** | Uses Google Gemini 2.5 Flash |
| 🐳 **Docker Ready** | Deploy with Docker Compose |
| 🌐 **HTTPS Support** | Nginx + Let's Encrypt configuration included |

---

## 🧰 Tech Stack

```text
Frontend
└── Vanilla HTML / CSS / JavaScript

Backend
└── FastAPI

AI
└── Google Gemini 2.5 Flash

Deployment
├── Docker / Docker Compose
├── systemd
├── Nginx
└── Let's Encrypt / Certbot
```

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)
- [Git & Security](#-git--security)
- [Deployment with Docker](#-method-1-deployment-with-docker--docker-compose)
- [Manual Ubuntu Deployment](#-method-2-manual-deployment-on-a-clean-ubuntu-server-without-docker)
- [Nginx & SSL](#-step-4-configure-nginx--ssl)
- [Security](#-security)
- [License](#-license)

---

## 📁 Project Structure

A typical project layout is expected to look similar to:

```text
FoodScanner/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

> The exact project structure may vary depending on the current implementation.

---

## 🚀 Local Development

You can run the application directly through Python without Docker.

### 1. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 2. Configure the Gemini API key

Create `backend/.env` if it does not already exist:

```env
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start the backend

```bash
python backend/main.py
```

### 4. Open the application

Visit:

```text
http://127.0.0.1:8000
```

---

## 💾 Git & Security

A `.gitignore` file is included in the project root to prevent local environments, temporary files, and sensitive configuration from being committed.

### ⚠️ Never commit your API key

Your `backend/.env` file contains a secret API key and should **never** be uploaded to a public repository.

### Publish the project to GitHub / GitLab

#### 1. Initialize Git

```bash
git init
```

#### 2. Stage the files

```bash
git add .
```

The `backend/.env` file will be ignored automatically if it is covered by `.gitignore`.

#### 3. Create the first commit

```bash
git commit -m "Initial commit with deployment config"
```

#### 4. Add the remote repository

```bash
git remote add origin https://github.com/your_username/repository_name.git
```

#### 5. Use `main` as the default branch

```bash
git branch -M main
```

#### 6. Push the project

```bash
git push -u origin main
```

---

# 🐳 Method 1. Deployment with Docker & Docker Compose

> **Recommended deployment method**

Docker provides a clean and consistent environment for running the application on servers such as Ubuntu or Debian.

It also helps ensure that the required system libraries and Python environment are consistent.

---

## 1️⃣ Install Docker

If Docker is not already installed, run the official installation script:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

---

## 2️⃣ Clone the Repository

Clone your repository on the server:

```bash
git clone https://github.com/your_username/repository_name.git
cd repository_name
```

---

## 3️⃣ Configure Environment Variables

Create the production `.env` file next to `docker-compose.yml`:

```bash
cp .env.example .env
```

Edit it:

```bash
nano .env
```

Add your real Gemini API key:

```env
GEMINI_API_KEY=your_real_gemini_api_key
PORT=8000
```

> 🔐 Keep this file private and never commit it to Git.

---

## 4️⃣ Build & Start the Application

Run:

```bash
docker compose up -d --build
```

Docker will build the container, install dependencies, and start the application on port `8000`.

### Useful commands

Check the container status:

```bash
docker compose ps
```

Follow application logs:

```bash
docker compose logs -f
```

Stop the application:

```bash
docker compose down
```

---

# 🐧 Method 2. Manual Deployment on Ubuntu

If you prefer not to use Docker, the application can be deployed using:

- Python virtual environment
- `systemd`
- Nginx

---

## 1️⃣ Install System Dependencies

Update the package index:

```bash
sudo apt update
```

Install the required packages:

```bash
sudo apt install -y python3-pip python3-venv nginx git
```

---

## 2️⃣ Clone the Repository

Create the application directory:

```bash
sudo mkdir -p /var/www/foodscanner
```

Assign ownership:

```bash
sudo chown -R $USER:$USER /var/www/foodscanner
```

Clone the repository:

```bash
git clone https://github.com/your_username/repository_name.git /var/www/foodscanner
cd /var/www/foodscanner
```

---

## 3️⃣ Create the Python Environment

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Upgrade `pip`:

```bash
pip install --upgrade pip
```

Install the project dependencies:

```bash
pip install -r backend/requirements.txt
```

---

## 4️⃣ Configure Environment Variables

Create the backend environment file:

```bash
nano backend/.env
```

Add:

```env
GEMINI_API_KEY=your_real_gemini_api_key
```

---

# ⚙️ Configure systemd

Using `systemd` allows the backend to run continuously in the background and restart automatically after failures.

## 1️⃣ Create the service

```bash
sudo nano /etc/systemd/system/foodscanner.service
```

Add:

```ini
[Unit]
Description=FoodScanner AI FastAPI Backend
After=network.target

[Service]
User=your_username
WorkingDirectory=/var/www/foodscanner
ExecStart=/var/www/foodscanner/.venv/bin/uvicorn backend.main:app --host 127.0.0.1 --port 8000 --workers 4
Restart=always
Environment="PATH=/var/www/foodscanner/.venv/bin"

[Install]
WantedBy=multi-user.target
```

Replace `your_username` with your Ubuntu username.

You can find it with:

```bash
whoami
```

## 2️⃣ Start the service

Reload systemd:

```bash
sudo systemctl daemon-reload
```

Start FoodScanner:

```bash
sudo systemctl start foodscanner
```

Enable automatic startup:

```bash
sudo systemctl enable foodscanner
```

Check the status:

```bash
sudo systemctl status foodscanner
```

---

# 🌐 Step 4. Configure Nginx & SSL

Whether you use **Docker** or **systemd**, the application runs locally on port `8000`.

Nginx can expose it through your domain, while HTTPS provides encrypted access.

> 📷 **HTTPS is required for browser camera access in modern browsers, except when using localhost.**

---

## 🔁 1. Configure Nginx as a Reverse Proxy

Remove the default Nginx configuration:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

Create the FoodScanner configuration:

```bash
sudo nano /etc/nginx/sites-available/foodscanner
```

Use:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Maximum uploaded photo size
    client_max_body_size 15M;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Replace:

```text
yourdomain.com
```

with your actual domain.

---

## 🔗 2. Enable the Nginx Configuration

Create the symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/foodscanner /etc/nginx/sites-enabled/
```

Test the configuration:

```bash
sudo nginx -t
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

# 🔒 3. Enable HTTPS with Let's Encrypt

Install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Request the SSL certificate:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will ask for information such as your email address and agreement to the terms.

It can also configure Nginx to redirect HTTP traffic to HTTPS.

---

## 🔄 4. Test Automatic Renewal

Run:

```bash
sudo certbot renew --dry-run
```

---

# 🔐 Security

Before deploying to production, keep the following in mind:

- Never commit `.env` files containing secrets.
- Never expose your Gemini API key in frontend JavaScript.
- Keep API keys out of public GitHub/GitLab repositories.
- Use HTTPS for the production deployment.
- Verify that `.gitignore` excludes your environment files.

---

# 🎉 Deployment Complete

Once the deployment and SSL configuration are complete, the application should be available at:

```text
https://yourdomain.com
```

---

## 📌 Quick Command Reference

| Task | Command |
|---|---|
| Install dependencies | `pip install -r backend/requirements.txt` |
| Run locally | `python backend/main.py` |
| Build Docker container | `docker compose up -d --build` |
| View Docker status | `docker compose ps` |
| View Docker logs | `docker compose logs -f` |
| Stop Docker | `docker compose down` |
| Check Nginx config | `sudo nginx -t` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Check backend service | `sudo systemctl status foodscanner` |
| Test SSL renewal | `sudo certbot renew --dry-run` |

---

## 📄 License

No license information was provided in the original project documentation.

If this project will be distributed publicly, consider adding an appropriate `LICENSE` file.

---

<div align="center">

**FoodScanner AI** · Powered by FastAPI & Google Gemini

🍎📸

</div>
