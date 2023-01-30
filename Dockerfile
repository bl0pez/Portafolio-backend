# Elejimos la imagen de node
FROM node:19.2-alpine3.16

#Entramos en la carpeta /app
WORKDIR /app

# Copiamos el package.json
COPY package*.json .env ./

# Copiamos el resto de archivos
COPY src ./src

# Instalamos las dependencias
RUN npm install

CMD ["npm", "run", "dev"]