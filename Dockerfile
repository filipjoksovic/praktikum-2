# Use the official MongoDB Docker image
FROM mongo

# Optionally, set environment variables for MongoDB configuration
# ENV MONGO_INITDB_ROOT_USERNAME=myusername
# ENV MONGO_INITDB_ROOT_PASSWORD=mypassword

# Copy any custom configuration files, if required
# COPY mongod.conf /etc/mongod.conf

# Expose the default MongoDB port
EXPOSE 27017

# Start MongoDB when the container is launched
CMD ["mongod"]