# FROM centos:centos8

# COPY . .
# RUN yum -y update
# RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
# RUN yum install -y nodejs
# RUN node --version
# RUN npm install

# CMD [ "node", "consumer.js" ]

FROM mynode:14
COPY . .
RUN npm install
CMD [ "node", "consumer.js" ]