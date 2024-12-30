// start no processo
docker-compose up --build 

//parar tudo 
docker-compose down

//somente subir os dockers
docker-compose up

// parar o processo da porta
sudo lsof -i :5432
sudo kill -9 <PID>


// Dockerfile
# Use uma imagem base oficial do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho do container
COPY . .

# Exponha a porta em que o servidor vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "start" ]

// docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:latest
    container_name: ecommerce
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: 123456
      POSTGRES_DB: ecommerce
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: 
      context: ../server
    ports: 
      - "3000:3000"
    environment:
      DB_USER: root
      DB_PASSWORD: 123456
      DB_NAME: ecommerce
      DB_HOST: db
    depends_on:
      - db
volumes:
  pgdata:

