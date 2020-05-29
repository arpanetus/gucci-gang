#!/bin/sh

neo4j start
echo "Sleeping for 30 seconds in order to warm up the server"
sleep 30

conf() {
  for query in ./config-queries/$1/*.cql
  do
    cat $query
    cypher-shell -u neo4j -p letmein "$(cat $query)"
  done
}

node_types="SOG FOG KeyValueContent"

cypher-shell -u neo4j -p neo4j 'CALL dbms.changePassword("letmein")'

cypher-shell -u neo4j -p letmein 'create (x:SOG) return x'
echo "Running uuid constraint on $node_types"
conf "uuid"
echo "Setting uuid field on $node_types"
conf "apoc"
cypher-shell -u neo4j -p letmein 'match (x:SOG) return x'

echo "Configuration is done"

neo4j stop
