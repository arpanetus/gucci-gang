FROM neo4j:4.0.3

ENV NEO4J_AUTH=neo4j/letmein \
    APOC_VERSION=3.5.0.5 \
    GRAPHQL_VERSION=3.5.0.4 \
    UUID_VERSION=3.5.14.55.19

ENV APOC_URI https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/${APOC_VERSION}/apoc-${APOC_VERSION}-all.jar
RUN sh -c 'cd /var/lib/neo4j/plugins && wget -N "${APOC_URI}"'

ENV GRAPHQL_URI https://github.com/neo4j-graphql/neo4j-graphql/releases/download/${GRAPHQL_VERSION}/neo4j-graphql-${GRAPHQL_VERSION}.jar
RUN sh -c 'cd /var/lib/neo4j/plugins && wget -N "${GRAPHQL_URI}"'

EXPOSE 7474 7473 7687

CMD ["neo4j"]
