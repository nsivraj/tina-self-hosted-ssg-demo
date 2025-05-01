# MongoDB database server for TinaCMS

## How to setup MongoDB using Docker on your laptop

1. In your terminal cd tina-self-hosted/server/mongodb-server
2. sudo docker ps -a
3. sudo docker images -a
4. source ../../.env && sudo docker run --name office-mongo -e MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME -e MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD -e MONGO_INITDB_DATABASE=$MONGO_INITDB_DATABASE -d -p 27017:27017 -v ./config:/etc/mongo -v ./data:/data/db mongo
5. To verify the startup of the mongodb database do:
   - Install mongosh: https://www.mongodb.com/docs/mongodb-shell/install/
   - mongosh --version
   - source ../../.env && mongosh --host $MONGODB_HOST -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin $MONGO_INITDB_DATABASE
   - At the mongosh prompt do: `db.getName();`
   - Then at the mongosh prompt do: `exit`

## How to setup MongoDB using Docker on AWS EC2 officesync instance

1. ssh officesync
2. docker ps -a
3. docker images -a
4. mkdir ~/office/mongo/config
5. mkdir ~/office/mongo/data
6. source ../../.env && docker run --name office-mongo -e MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME -e MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD -e MONGO_INITDB_DATABASE=$MONGO_INITDB_DATABASE -d -p 27017:27017 -v ~/office/mongo/config:/etc/mongo -v ~/office/mongo/data:/data/db mongo
7. To verify the startup of the mongodb database do:
   - Install mongosh: https://www.mongodb.com/docs/mongodb-shell/install/
   - mongosh --version
   - source ../../.env && mongosh --host $MONGODB_HOST -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin $MONGO_INITDB_DATABASE
   - At the mongosh prompt do: `db.getName();`
   - Then at the mongosh prompt do: `exit`

## To get a dump of the data from mongo

1. Use mongodump: docker exec office-mongo sh -c 'exec mongodump -d tinacms_db --archive' > /some/path/on/your/host/all-collections.archive
