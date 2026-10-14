# Testnode Monorepo (React Frontend + Node.js Express Backend)

A Yarn monorepo / workspace setup featuring:
- **Backend workspace (`testnode-backend`)**: Node.js & Express exposing `GET /api` returning `{ "message": "hello-world" }`.
- **Frontend workspace (`testnode-frontend`)**: React (Vite) fetching and displaying the message from `/api`.

---

## Directory Structure

```text
testnode/
├── backend/
│   ├── package.json     # Workspace package: testnode-backend
│   └── server.js        # Express server on port 3000 (/api & /health)
├── frontend/
│   ├── package.json     # Workspace package: testnode-frontend
│   ├── vite.config.js   # Vite dev server with proxy to backend (/api -> :3000)
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx      # React UI component fetching and displaying /api
│       ├── App.css
│       └── index.css
├── env/
│   └── minikube/        # Kubernetes manifests matching argo-env's testnode source path
│       ├── deployment.yaml
│       ├── service.yaml
│       └── kustomization.yaml
├── .gitignore
├── Caddyfile            # Reverse proxy config (routes /api to backend, other to frontend)
├── package.json         # Yarn root workspace config
└── README.md
```

---

## Getting Started with Yarn

### 1. Install Dependencies for All Workspaces

Run `yarn` from the root of `testnode/` to install dependencies across both frontend and backend:

```bash
cd /home/pra/projects/2026/oct/testnode
yarn
```

---

### 2. Run Both Backend and Frontend Concurrently

```bash
yarn dev
```
This runs the Express backend and the Vite frontend simultaneously with prefixed color logs.

---

### 3. Run Workspaces Individually

- **Backend only**:
  ```bash
  yarn dev:backend
  # Or: yarn workspace testnode-backend dev
  ```
  Backend starts on `http://localhost:3000`. Test endpoint:
  ```bash
  curl http://localhost:3000/api
  # Output: {"message":"hello-world"}
  ```

- **Frontend only**:
  ```bash
  yarn dev:frontend
  # Or: yarn workspace testnode-frontend dev
  ```
  Frontend starts on `http://localhost:8080`.

- **Build frontend for production**:
  ```bash
  yarn build:frontend
  # Or: yarn workspace testnode-frontend build
  ```

---

## Reverse Proxy with Caddy

Validate the Caddyfile:
```bash
caddy validate --config Caddyfile
```

Run Caddy (port 80 requires `sudo` on Linux):
```bash
sudo caddy run --config Caddyfile
```
Now access `http://localhost/` for the frontend and `http://localhost/api` for the backend.
