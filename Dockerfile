# Elejimos la imagen de node
FROM node:19.2-alpine3.16

#Entramos en la carpeta /app
WORKDIR /app

# Copiamos el package.json
COPY package*.json ./

# Copiamos el resto de archivos
COPY src ./src

# Instalamos las dependencias de producción
RUN npm install --only=production

CMD ["npm", "run", "start"]