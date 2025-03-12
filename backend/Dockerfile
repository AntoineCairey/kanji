# Utiliser une image JDK 21 légère
FROM eclipse-temurin:21-jdk-alpine

# Installer les dépendances nécessaires
RUN apk add --no-cache libc6-compat tzdata

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier JAR de l'application
COPY target/*.jar app.jar

# Exposer le port sur lequel l'application tourne (ex: 8080)
EXPOSE 8080

# Démarrer l'application
CMD ["java", "-jar", "app.jar"]