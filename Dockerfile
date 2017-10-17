FROM node:8.7

LABEL maintainer "Yoan Rousseau, yOan <yoan.rousseau@gmail.com>"

RUN mkdir -p /opt/app/

WORKDIR /opt/app/

EXPOSE 3000

VOLUME [ "/opt/app/jobs/" ]
VOLUME [ "/opt/app/dashboards/" ]

COPY . .

RUN yarn install

ENTRYPOINT [ "yarn", "start" ]