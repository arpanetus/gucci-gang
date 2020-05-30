 # gucci-gang



 ## run:
 first you need to up the containers
 ```shell script
$ docker-compose up -d
 ```

then you can run:
```shell script
$ yarn watch
```

populate some data (graphql server must be running):
```shell script
$ yarn populate
```

show the population-mutations:
```shell script
$ yarn populog
$ cat public/seed-mutations.graphql
```


 ## graphql

In the url below you can look for schema and docs:

http://localhost:4001/graphql


static-files : http://localhost:4001/static

all the mutation stuff may lie in `public/seed-mutations.graphql`


 ## TODO:
 - user add/reg(I guess using neo4j as regular backend is ok, since we're using graphql)
 - issues
 - community stuff
