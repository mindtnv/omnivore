# Omnivore Self-Hosting for Coolify

Optimized docker-compose configuration for deploying Omnivore on Coolify.

## Services

| Service | Description | Port (internal) |
|---------|-------------|-----------------|
| `web` | Next.js frontend | 8080 |
| `api` | GraphQL API backend | 8080 |
| `queue-processor` | Background job processor | - |
| `content-fetch` | Page content fetcher (Firefox) | 8080 |
| `image-proxy` | Image proxy server | 8080 |
| `postgres` | PostgreSQL + pgvector | 5432 |
| `redis` | Redis cache & queues | 6379 |
| `minio` | S3-compatible storage | 9000 |

## Deployment in Coolify

### Step 1: Create New Resource

1. In Coolify, go to your Project → Environment
2. Click **+ New** → **Docker Compose**
3. Select **Empty Compose** or paste from this repo

### Step 2: Configure Environment Variables

In Coolify's environment variables section, add:

```bash
# Required URLs (change to your domain)
CLIENT_URL=https://omnivore.yourdomain.com
SERVER_BASE_URL=https://omnivore.yourdomain.com
IMAGE_PROXY_URL=https://omnivore.yourdomain.com
LOCAL_MINIO_URL=https://omnivore.yourdomain.com

# Required secrets (generate unique values!)
JWT_SECRET=<run: openssl rand -hex 32>
SSO_JWT_SECRET=<run: openssl rand -hex 32>
IMAGE_PROXY_SECRET=<run: openssl rand -hex 32>
VERIFICATION_TOKEN=<run: openssl rand -hex 32>

# Database
POSTGRES_PASSWORD=<strong password>
PG_PASSWORD=<strong password>

# MinIO
MINIO_ROOT_PASSWORD=<strong password>
```

### Step 3: Configure Domains in Coolify

Assign domains to exposed services:

| Service | Domain Example | Port |
|---------|----------------|------|
| `web` | omnivore.yourdomain.com | 8080 |
| `api` | omnivore.yourdomain.com/api | 8080 |
| `image-proxy` | omnivore.yourdomain.com/images | 8080 |
| `minio` | omnivore.yourdomain.com/bucket | 9000 |

**Alternative:** Use subdomains:
- `omnivore.yourdomain.com` → web
- `api.omnivore.yourdomain.com` → api
- `images.omnivore.yourdomain.com` → image-proxy
- `files.omnivore.yourdomain.com` → minio

### Step 4: Deploy

Click **Deploy** in Coolify. The services will start in order:
1. postgres, redis, minio → start first
2. migrate, createbuckets → run once and exit
3. api → waits for migrate
4. queue-processor, content-fetch → wait for api
5. web → waits for api

## Default Demo User

After first deployment, a demo user is created:
- **Email:** demo@omnivore.work
- **Password:** demo_password

## Coolify-Specific Notes

### No Port Publishing

This compose file does **not** publish ports. Coolify handles routing via Traefik. If you need direct access (debugging), add ports temporarily in Coolify UI.

### Health Checks

All services have health checks. Coolify/Traefik won't route traffic until services are healthy.

### Volumes

Persistent volumes are defined:
- `pgdata` - PostgreSQL data
- `redis_data` - Redis persistence
- `minio_data` - File storage

These persist across redeployments.

## Troubleshooting

### Services not starting

Check logs in Coolify for each service. Common issues:
- `migrate` fails → check postgres credentials
- `api` unhealthy → check JWT_SECRET is set
- `web` unhealthy → check CLIENT_URL matches your domain

### Can't access the app

1. Verify domain is assigned in Coolify
2. Check that `web` service is healthy
3. Verify SSL certificate is issued (Coolify handles this)

### Database connection errors

Ensure `PG_PASSWORD` matches between api/queue-processor and what migrate created.
