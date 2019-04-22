# vue-typescript-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

# Docker
Make sure you have Db backup file in C:/Sources
## Run this command to start:
```
docker-compose -f "docker-compose.yml" up -d
```
## Restore Database file (I haven't automate this process yet)
```
Choose backup file from this url: c:/var/opt/mssql/backup
Relocate all files to folder:
- Data file folder: c:/var/opt/mssql/data/
- Log file folder: c:/var/opt/mssql/data/
