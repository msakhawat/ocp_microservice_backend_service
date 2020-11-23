FROM centos:centos8

COPY . .
RUN yum -y update && 
    curl -sL https://rpm.nodesource.com/setup_14.x | bash - &&
    yum install -y nodejs && 
    npm install

CMD [ "node", "consumer.js" ]

# FROM mynode:14
# COPY . .
# RUN npm install
# CMD [ "node", "consumer.js" ]