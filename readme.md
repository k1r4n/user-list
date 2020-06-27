# Build Process

## Setting up docker (Build Environment)

Execute the following command to build a new docker image from the bundled Dockerfile

`docker build  -t user-list .`

This will create a new docker image with the name **user-list**.
Commands can be executed on this image using the following syntax

`docker run --rm -v $(pwd):/data -it user-list <command>`

## Installing dependencies

`docker run --rm -v $(pwd):/data -it user-list yarn install`

This will install the dev dependencies as well as the project dependencies.


## Running the files

`docker run --rm -v $(pwd):/data -it -p 7000:7000 user-list yarn start`

This will execute the project

## Non-Docker Installation

`npm install` or `yarn install`

This will install the dev dependencies as well as the project dependencies.

## Non-Docker Execution

`npm run start` or `yarn start`

## Username

`admin`

## Password

`password`
