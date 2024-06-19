# Use uma imagem base oficial do Java que é mantida pelo Docker
FROM openjdk:17-jdk-slim-buster AS builder

RUN apt-get update -y
RUN apt-get install -y binutils

# Defina o diretório de trabalho
WORKDIR /app
# Copie o código fonte e o build.gradle para o contêiner
COPY . .
# Execute o Gradle para baixar as dependências e compilar o projeto
RUN ./gradlew build

USER root

RUN jlink \
    --module-path "$JAVA_HOME/jmods" \
    --add-modules java.compiler,java.sql,java.naming,java.management,java.instrument,java.rmi,java.desktop,jdk.internal.vm.compiler.management,java.xml.crypto,java.scripting,java.security.jgss,jdk.httpserver,java.net.http,jdk.naming.dns,jdk.crypto.cryptoki,jdk.unsupported \
    --verbose \
    --strip-debug \
    --compress 2 \
    --no-header-files \
    --no-man-pages \
    --output /opt/jre-minimal

# Now it is time for us to build our real image on top of an slim version of debian


FROM debian:12.5-slim

COPY --from=builder /opt/jre-minimal /opt/jre-minimal
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar 

ENV JAVA_HOME=/opt/jre-minimal
ENV PATH="$PATH:$JAVA_HOME/bin"

# Copy the JRE created in the last step into our $JAVA_HOME

# For gradle
# COPY build/libs/app-*.jar app.jar

# For maven
# COPY target/app-*.jar app.jar


ENTRYPOINT ["java","-jar","/app/app.jar"] 



# #compilação final
# FROM openjdk:17-jdk-alpine
# WORKDIR /app
# COPY --from=builder /app/build/libs/*.jar app.jar

# # Execute a aplicação
# ENTRYPOINT ["java","-jar","/app/app.jar"]