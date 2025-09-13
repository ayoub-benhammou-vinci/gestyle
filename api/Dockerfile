# Étape 1 : build avec Maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Étape 2 : exécution
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Render fournit $PORT automatiquement
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
