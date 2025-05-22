FROM node:18

WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

# Donne les bonnes permissions (prudent, mais pas obligatoire ici)
RUN chmod -R 755 /app


# Expose les ports nécessaires à Expo
EXPOSE 19000 19001 19002

# 🟢 Utilisation du script "start" défini dans package.json
CMD ["npx", "expo", "start", "--tunnel"]

