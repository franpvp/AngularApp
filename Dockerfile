# Paso 1: Construir la aplicación Angular
FROM node:18 AS build

WORKDIR /usr/src/app

# Copiar el package.json y realizar la instalación de dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build --prod

# Paso 2: Configurar Nginx
FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos generados por Angular al directorio de Nginx
COPY --from=build /usr/src/app/dist/app-angular/browser /usr/share/nginx/html

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]