# Use a imagem oficial do Node.js (versão 18)
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "start" ]
