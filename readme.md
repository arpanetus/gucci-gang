 # gucci-gang



 ## run:
 first you need to up the containers
 ```shell script
$ docker-compose up -d
 ```

I could solve ADD problem, it was actually the volume which was defined in docker-compose.yml.
Thus one doesn't have to run mumbo jumbo commands in order to run the container

then you can run:
```shell script
$ yarn postconfig
$ yarn watch
```

populate some data:
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
