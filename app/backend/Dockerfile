FROM ubuntu:22.04

RUN apt-get update && apt-get install -y openjdk-17-jdk && \
    apt-get install -y ant && \
    apt-get clean;
RUN apt-get install maven -y;

RUN apt-get update && apt-get install -y netcat

VOLUME /tmp

COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY . .

ENTRYPOINT ["./wait-for-it.sh", "mongodb 27017", "--", "mvn", "spring-boot:run"]
