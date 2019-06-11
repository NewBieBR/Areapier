FROM ubuntu

RUN apt-get update && apt-get install -y npm
CMD ["/bin/bash", "-c", "cd /web && rm -rf node_modules && rm -rf package-lock.json && npm install && npm start"]