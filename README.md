# JLabs Assessment

## Overview

This repository contains a full-stack application composed of a Next.js frontend and an Express.js backend with a PostgreSQL database. The backend infrastructure is containerized using Docker, while the frontend runs locally.

## Technologies Used

### Frontend

- Next.js (React Framework)
- TypeScript
- Tailwind CSS
- Leaflet / React-Leaflet (Mapping)
- pnpm (Package Manager)

### Backend

- Node.js & Express.js
- TypeScript
- PostgreSQL
- JSON Web Tokens (JWT) for Authentication

### Infrastructure

- Docker & Docker Compose

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/installation) (Package manager)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Must be running to start the backend services)

## Getting Started

Follow these steps to set up and run the application locally.

### 1. Environment Configuration

Create the necessary environment variable files by copying the provided examples and filling in the appropriate values.

```bash
# In the docker-be directory
cp docker-be/.env.example docker-be/.env
cp docker-be/backend/.env.example docker-be/backend/.env

# In the webapp directory
cp webapp/.env.example webapp/.env.local
```

### 2. Install Dependencies

You need to install dependencies for both the backend and frontend.

```bash
# Install backend dependencies
cd docker-be/backend
pnpm install

# Return to root and install frontend dependencies
cd ../../webapp
pnpm install
```

### 3. Start the Backend Services

Ensure Docker Desktop is running. Then, navigate to the Docker configuration directory and launch the containers. This will spin up both the custom application backend and the PostgreSQL database.

```bash
cd ../docker-be
docker compose up --build
```

_(Note: Leave this terminal window open or run with the `-d` flag to run in detached mode)_

### 4. Start the Frontend Application

Open a new terminal window, navigate back to the frontend directory, and start the development server.

```bash
cd webapp
pnpm run dev
```

Alternatively, if you wish to run a production build of the frontend:

```bash
cd webapp
pnpm run build
pnpm run start
```

### 5. Access the Application

Once both the backend and frontend are running, you can access the application in your web browser. By default, the frontend will run at `http://localhost:3000` (unless the port is occupied).
