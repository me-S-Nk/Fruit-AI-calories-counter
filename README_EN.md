# FoodScanner AI 🍎📸

An intelligent web application for analyzing food products from photos. It uses **FastAPI** on the backend, **Vanilla HTML/CSS/JS** on the frontend, and **Google Gemini 2.5 Flash** as the AI engine to assess freshness, identify products, estimate calorie content, and provide storage recommendations.

---

## 🛠️ Local Development

You can continue running the project directly through Python:

### 1. Install the dependencies

```bash
pip install -r backend/requirements.txt
```

### 2. Create the environment file

Create `backend/.env` if it does not already exist and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start the backend

```bash
python backend/main.py
```

### 4. Open the application

Open the following URL in your browser:

**http://127.0.0.1:8000**

---

## 💾 Git & Security

A `.gitignore` file is included in the project root. It ensures that local virtual environments, temporary files, and — most importantly — the backend `.env` file containing your secret API key are **never committed to a public repository**.

### How to safely publish the project to GitHub/GitLab

#### 1. Initialize the repository

```bash
git init
```

#### 2. Stage the files

```bash
git add .
```

> The `backend/.env` file will be automatically ignored because of `.gitignore`.

#### 3. Create the first commit

```bash
git commit -m "Initial commit with deployment config"
```

#### 4. Add the remote repository and push the code

```bash
git remote add origin https://github.com/your_username/repository_name.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

---

## 🐳 Method 1. Deployment with Docker & Docker Compose (Recommended)

Docker is the fastest, most reliable, and cleanest way to run the project on a server such as Ubuntu or Debian. It ensures that all system libraries and Python versions are consistent.

### Step 1. Install Docker on the server

If Docker is not already installed, run the official installation script on your server (for example, Ubuntu):

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Step 2. Clone the code and prepare the configuration

1. Clone your repository onto the server:

```bash
git clone https://github.com/your_username/repository_name.git
cd repository_name
```

2. Create a `.env` file in the project root, next to `docker-compose.yml`:

```bash
cp .env.example .env
```

3. Edit the `.env` file on the server (for example, with `nano .env`) and add your real Gemini API key:

```env
GEMINI_API_KEY=your_real_gemini_api_key
PORT=8000
```

### Step 3. Start the application

Build and start the container in the background (daemon mode):

```bash
docker compose up -d --build
```

The container will automatically build, install the dependencies, and start the server on port `8000`.

Useful commands:

- Check the status: `docker compose ps`
- View logs: `docker compose logs -f`
- Stop the project: `docker compose down`

---

## 🐧 Method 2. Manual Deployment on a Clean Ubuntu Server (Without Docker)

If you prefer a traditional deployment using the `systemd` process manager and the Nginx web server.

### Step 1. Install system dependencies

Update the packages and install Python, the `pip` package manager, the `venv` virtual environment module, Nginx, and Git:

```bash
sudo apt update
sudo apt install -y python3-pip python3-venv nginx git
```

### Step 2. Clone the repository and configure the environment

1. Clone the repository into `/var/www/`:

```bash
sudo mkdir -p /var/www/foodscanner
sudo chown -R $USER:$USER /var/www/foodscanner
git clone https://github.com/your_username/repository_name.git /var/www/foodscanner
cd /var/www/foodscanner
```

2. Create a virtual environment and install the dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
```

3. Create the working `.env` file in `/var/www/foodscanner/backend/`:

```bash
nano backend/.env
```

Add:

```env
GEMINI_API_KEY=your_real_gemini_api_key
```

### Step 3. Configure automatic backend startup with systemd

To keep the backend running continuously in the background and restart it automatically after failures, create a system service.

#### 1. Create the service configuration file

```bash
sudo nano /etc/systemd/system/foodscanner.service
```

#### 2. Paste the following configuration

Replace `your_username` with your Ubuntu username. You can find it by running `whoami`.

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

#### 3. Start the service and enable it at boot

```bash
sudo systemctl daemon-reload
sudo systemctl start foodscanner
sudo systemctl enable foodscanner
```

#### 4. Check the service status

```bash
sudo systemctl status foodscanner
```

---

## 🌐 Step 4. Configure Nginx & SSL (Required for Both Methods)

Whether you launched the project with **Docker** or **systemd**, it is currently running locally on port `8000`.

To make it publicly accessible through your domain and enable secure HTTPS encryption — which is required for browser camera access — you need to configure Nginx and SSL.

### 1. Configure Nginx as a Reverse Proxy

#### 1. Remove the default Nginx configuration

```bash
sudo rm /etc/nginx/sites-enabled/default
```

#### 2. Create a new configuration file

```bash
sudo nano /etc/nginx/sites-available/foodscanner
```

#### 3. Add the following configuration

Replace `yourdomain.com` with your actual domain pointing to the server's IP address:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Maximum uploaded photo size (for example, up to 15 MB)
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

#### 4. Enable the configuration and restart Nginx

```bash
sudo ln -s /etc/nginx/sites-available/foodscanner /etc/nginx/sites-enabled/
sudo nginx -t  # Check the configuration for errors
sudo systemctl restart nginx
```

### 2. Get a Free SSL Certificate from Let's Encrypt

Modern browsers block camera access on websites that do not use `HTTPS` (except for localhost). Install a free, automatically renewable SSL certificate:

#### 1. Install Certbot for Nginx

```bash
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. Generate the certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

> Certbot will ask you a few questions, such as your email address and agreement to the terms. At the end, it will automatically configure Nginx to redirect all HTTP traffic to secure HTTPS.

#### 3. Test automatic certificate renewal

```bash
sudo certbot renew --dry-run
```

---

## 🎉 Done!

Your FoodScanner AI application is now available at:

**https://yourdomain.com**

> **Security reminder:** Never commit your `.env` file or expose your Gemini API key in a public repository.
