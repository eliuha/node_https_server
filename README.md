# node_https_server
A simple way to share a directory using node.js. 

## Install node.js
https://nodejs.org/en/download/stable/

## Before running, make sure that you have the following libs 
+ npm install https
+ npm install fs
+ npm install path
+ npm install url

## Generate Keys using openssl
**Don't forget to put them in ./keys**

```bash
openssl genrsa -des3 -out private.pem 4096
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

openssl req -key private_key.pem -new -out request.csr
openssl ca -config openssl.cnf -out hostname.pem -infiles request.csr
```



