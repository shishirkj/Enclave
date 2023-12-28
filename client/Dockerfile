FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN mkdir -p enclave
WORKDIR /enclave/client

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run","dev" ]

