FROM ubuntu

RUN apt-get update && apt-get install -y npm
CMD ["/bin/bash", "-c", "cd /server && npm install && npm start"]