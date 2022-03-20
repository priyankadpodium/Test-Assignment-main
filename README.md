
# BE Test

Backend Backend Assignment

This is test application. I have created two modules Order & Payment using framework and MongoDB. It is build using docker. Endpoints details are given under respective app readme file.


## Prerequisite

Docker must be installed in order to run the program.


## Usage

Make sure your docker is running and type below command in order to start docker containers

```
    docker-compose build
    docker-compose up -d
```

To stop docker containers:
```
    docker-compose down -v
```


## Clean Docker

Remove containers:
```
    docker ps -aq | xargs docker rm -f
```

Remove images:
```
    docker images -q | xargs docker rmi -f
```

Remove volumes
```
    docker volume ls -q | xargs docker volume rm -f
```


## Feature
1. Order Module
2. Payment Module


## API endpoints

1. create an order
    Method: POST
    Endpoints: http://localhost:5001/order/
    Post data:
    ```
        {
            "name":{required}, 
            "quantity":{required}
        }
    ```

2. cancel an order
    Method: PUT
    Endpoints: http://localhost:5001/order/cancel/:id
    Query Param:
    ```
        {
            "id": {required}
        }
    ```


3. check order status
    Method: GET
    Endpoints: http://localhost:8080/order/:id
    Query Param:
    ```
        {
            "id": {required}
        }
    ```


## Some business logic assumption

- Payment is triggered by the order upon order creation.
- Payment will randomly set correct or incorrect data to order, based on which order will get declained or confirmed.
- Orders with confirmed status will be changed to delivered in 5 seconds, this process done via cron job.


## Deployment Notes

In each of the project directory (order and payment), you will have to run:
- npm install
- sls deploy [This will deploy the project to AWS Lambda.]
- npm test [This will run test script in order module]