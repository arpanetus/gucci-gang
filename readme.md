 # gucci-gang



 ## run:
 first you need to up the containers
 ```shell script
$ docker-compose up -d
 ```
then you probably have to download the deps(I couldn't solve dockers `ADD` problem :c)
```shell script
$ docker-compose exec neo4j bash
# cd plugins
# wget ${APOC_URI} ; wget ${GRAPHQL_URI}
# exit
$ docker-compose stop && docker-compose up -d
```
then you can run
```shell script
$ yarn watch
```

 ## graphql

In the url below you can look for schema and docs:

http://localhost:4001/graphql


static-files(don't work for now): http://localhost:4001/static
### `KeyValueContent`
 - create:
    ```graphql
    mutation {
      md_des_of_inc: CreateKeyValueContent(
        # uuid: "12",
        key: "description"
        type: "md"
        value: "# INHERITANCE"
      ) {
        uuid
        key
        type
        value
      }
    }
    ```
 - match/query:

    ```graphql
   {
    # you can actually look for model using whatever the field you'd like to
      KeyValueContent(
        key: "description"
        type: "md"
        value: "# INHERITANCE"
      ) {
        key
        type
        value
        uuid
      }
    }
    ```
 - delete
    ```graphql
    mutation {
      DeleteKeyValueContent(uuid:"e27027bd-a801-4940-bca3-234ef17a74af") {
        uuid
        key
        value
        type
      }
    }
    ```
 - update
    ```graphql
    mutation {
      UpdateKeyValueContent(
        uuid:"a88a063d-5c7c-4926-8519-01c3808742fa"
        value: "# INHERITANCE, DUDE!"
      ) {
        uuid
        key
        value
      }
    }
    ```
Same applies to FOG/SOG. Thus I'm going to show how to create connections:
 -  Add content to FOG, for the sake of clarity I separate creation and modification
    ```graphql
    # first we have to create FOG
    mutation {
      CreateFOG {  # let us create a fog first
        uuid
      }
    }
    ```
    ```graphql
    # then we have to add its contents
    mutation {
        AddFOGContents(
          from: { uuid: "some-damn-uuid"}  # FOG
            to: { uuid:"24049c0a-8737-4f6b-9053-f9abbde3a7e0" }  # KeyValueContent
        ) {
          from {
            uuid
            contents{
              uuid
              value
              type
              key
            }
          }
        }
    }
    ```
- Add Fog To Sog
    ```graphql
    # create sog
    mutation {
      myLittleCourse: CreateSOG {
        uuid
      }
    }
    ```

    ```graphql
    # add its contents
    fragment ContentFragment on KeyValueContent {
      uuid
      key
      value
      type
    }
    mutation {
      AddSOGFogs(
        from: { uuid: "33ed5049-02d0-4c45-ba24-5e00d9835770"}  # SOG
      	to: { uuid: "4961b036-7753-4f41-80b3-5c7176498669"})  # FOG
      {
        from {
          uuid
          contents {
            ...ContentFragment
          }
          fogs {
          	uuid
            partOfSog {
              uuid
            }
            contents {
            ...ContentFragment
            }
          }
        }
      }
    }
    ```

##...

I'll add other how-to's later.
Now I need to implement only:
 - proper search queries
 - strapi bind
 - issues
 - community stuff
 - user add/reg(I guess using neo4j as regular backend is ok, since we're using graphql)
