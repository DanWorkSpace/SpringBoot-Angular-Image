# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# 1. Copy package files. The '*' makes it look for both package.json and package-lock.json
# but it won't crash if package-lock is missing.
COPY package*.json ./
RUN npm install

# 2. Copy config files explicitly
COPY angular.json ./
COPY tsconfig*.json ./ 
COPY src ./src

# 3. Build using the local CLI
RUN npx ng build --configuration production

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=build /app/dist/*/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]