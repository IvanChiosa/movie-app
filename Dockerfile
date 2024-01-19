FROM --platform=linux/amd64 openjdk:21
LABEL authors="ivan"
EXPOSE 8080

ADD backend/target/app.jar app.jar
CMD ["sh", "-c", "java -jar /app.jar"]