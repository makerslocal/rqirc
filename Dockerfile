FROM node

COPY . /rqirc
RUN cd /rqirc && npm install

WORKDIR /rqirc
ENTRYPOINT ["node", "index.js"]



