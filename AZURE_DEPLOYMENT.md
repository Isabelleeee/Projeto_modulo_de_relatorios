# DEPLOYMENT GUIDE - AZURE

## Prerequisites
- Azure CLI installed
- Docker installed locally
- GitHub account (for CI/CD)

## Local Development with Docker

```bash
# Build and run locally
docker-compose up --build

# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

---

## Azure Deployment Steps

### Step 1: Create Azure Resources

```bash
# Login to Azure
az login

# Set variables
RESOURCE_GROUP="project-analysis-rg"
REGISTRY_NAME="projectanalysisacr"
LOCATION="eastus"
APP_NAME="project-analysis"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Container Registry
az acr create --resource-group $RESOURCE_GROUP \
  --name $REGISTRY_NAME --sku Basic

# Get registry URL
az acr show --name $REGISTRY_NAME --query loginServer
```

### Step 2: Build and Push Docker Image

```bash
# Build image
docker build -t $REGISTRY_NAME.azurecr.io/$APP_NAME:latest .

# Login to registry
az acr login --name $REGISTRY_NAME

# Push image
docker push $REGISTRY_NAME.azurecr.io/$APP_NAME:latest
```

### Step 3: Create App Service

```bash
# Create App Service Plan
az appservice plan create --name $APP_NAME-plan \
  --resource-group $RESOURCE_GROUP \
  --sku B2 --is-linux

# Create Web App
az webapp create --resource-group $RESOURCE_GROUP \
  --plan $APP_NAME-plan \
  --name $APP_NAME \
  --deployment-container-image-name-user $REGISTRY_NAME

# Configure container
az webapp config container set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --docker-custom-image-name $REGISTRY_NAME.azurecr.io/$APP_NAME:latest \
  --docker-registry-server-url https://$REGISTRY_NAME.azurecr.io
```

### Step 4: Set Environment Variables

```bash
# Set app settings
az webapp config appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    GROQ_API_KEY="your_groq_key" \
    LOG_LEVEL="INFO" \
    CORS_ORIGINS="https://$APP_NAME.azurewebsites.net" \
    WEBSITES_PORT=8000
```

### Step 5: Enable Continuous Deployment

#### Option A: Using GitHub Actions

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Build and push to ACR
        run: |
          az acr build --registry ${{ secrets.REGISTRY_NAME }} \
            --image ${{ secrets.APP_NAME }}:latest .
      
      - name: Deploy to App Service
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.APP_NAME }}
          images: ${{ secrets.REGISTRY_URL }}/${{ secrets.APP_NAME }}:latest
```

2. Add GitHub Secrets:
   - `AZURE_CREDENTIALS`: Service principal credentials
   - `REGISTRY_NAME`: Azure Container Registry name
   - `REGISTRY_URL`: Registry URL
   - `APP_NAME`: Web app name

#### Option B: Using Azure DevOps

1. Create build pipeline (CI)
2. Create release pipeline (CD)
3. Connect to GitHub repository

---

## Production Configuration

### Environment Variables (Required)

```bash
GROQ_API_KEY=your_api_key
LOG_LEVEL=INFO
CORS_ORIGINS=https://yourdomain.com
DATABASE_URL=<future>
API_SECRET_KEY=<generate_secure_key>
```

### Security Best Practices

1. **Use Azure Key Vault for secrets:**
```bash
az keyvault create --name project-analysis-kv \
  --resource-group $RESOURCE_GROUP

az keyvault secret set --vault-name project-analysis-kv \
  --name groq-api-key --value "your_key"
```

2. **Enable Application Insights:**
```bash
az monitor app-insights component create \
  --app project-analysis-insights \
  --location $LOCATION \
  --resource-group $RESOURCE_GROUP
```

3. **Set up auto-scaling:**
```bash
az monitor autoscale create --resource-group $RESOURCE_GROUP \
  --resource-name-path "/subscriptions/{subscription-id}/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/serverfarms/$APP_NAME-plan" \
  --resource-type "Microsoft.Web/serverfarms" \
  --name autoscale-$APP_NAME
```

---

## Monitoring & Logs

```bash
# View logs
az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP

# View deployment logs
az webapp deployment log show --name $APP_NAME \
  --resource-group $RESOURCE_GROUP

# Check app settings
az webapp config appsettings list --name $APP_NAME \
  --resource-group $RESOURCE_GROUP
```

---

## Cleanup

```bash
# Delete all resources
az group delete --name $RESOURCE_GROUP --yes
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check container logs: `az webapp log tail` |
| CORS errors | Update CORS_ORIGINS in app settings |
| API not responding | Verify GROQ_API_KEY is set correctly |
| High memory usage | Increase App Service Plan tier (B2 or higher) |

---

## Next Steps

1. Setup GitHub Actions workflow
2. Deploy database (SQL Database or Cosmos DB)
3. Enable SSL/TLS certificate
4. Setup custom domain
5. Configure CDN for frontend assets
6. Enable API Management for rate limiting
