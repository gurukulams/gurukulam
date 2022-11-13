# Reference Implementation of Static Site using NPM Scripts
Reference implementation for HTML Prototypes using NPM Scripts. This codebase is maintained by students and volunteers of [techatpark](http://www.techatpark.com)

### Design Goals

We have below design goals.

1. Use Low level tools as much as possible
1. Stablilty over cutting edge
1. Best Practices and Conventions
1. Build time Speed 

We carefuly avoided using image optimization during build time as it is good to do images at design time rather than build time.

### Setup

To set the appropriate node version. You can install nvm from [here](https://github.com/nvm-sh/nvm)

> nvm install

To download the dependencies and build

> npm i

To watch the application on your local browser

> npm start

### Document Converter

> docker-compose up --build -d

> docker run -ti -v `pwd`:/docs my-pdfminer:v1 pdf2txt.py -o pdfminer/samples/<<FILE>>.md pdfminer/samples/<<FILE>>.pdf

A Small Changes


## Regex Useful

Duplicate Heading

```
(#.+) ([0-9]+).([0-9]+) (.+)
```

### Why

Tamil Book is Wrong
Question Bank is available only in English
Content is scattered.
Good Content difficult to find.

Books
Questions
Notes