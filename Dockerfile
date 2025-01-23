# Use a imagem base do Nginx
FROM nginx:alpine

# Copie todos os arquivos estáticos (HTML, CSS, JS) para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Exponha a porta em que o Nginx vai rodar
EXPOSE 80

# Comando padrão do Nginx para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]
