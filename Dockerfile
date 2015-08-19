FROM node:0.10

RUN cd /tmp && \
    wget --quiet https://github.com/itsamenathan/rqirc/archive/master.tar.gz -O rqirc.tar.gz && \
    tar -zxf rqirc.tar.gz && \
    rm -rf rqirc.tar.gz && \
    cd rqirc-master && \
    npm install

WORKDIR /tmp/rqirc-master
ENTRYPOINT ["node", "index.js"]



