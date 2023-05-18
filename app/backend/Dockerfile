FROM ubuntu:22.04

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jdk && \
    apt-get clean;
RUN apt-get install maven -y;

RUN apt-get update && apt-get install -y netcat

VOLUME /tmp

COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

COPY . /app

ENTRYPOINT ["/app/wait-for-it.sh", "mongodb 27017", "--", "mvn", "-f", "/app", "spring-boot:run"]
