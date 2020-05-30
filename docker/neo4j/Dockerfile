FROM neo4j:3.5.15

ENV NEO4J_AUTH=neo4j/letmein \
    APOC_VERSION=3.5.0.5 \
    GRAPHQL_VERSION=3.5.0.4 \
    UUID_VERSION=3.5.14.55.19

ENV APOC_URI https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/${APOC_VERSION}/apoc-${APOC_VERSION}-all.jar
ENV GRAPHQL_URI https://github.com/neo4j-graphql/neo4j-graphql/releases/download/${GRAPHQL_VERSION}/neo4j-graphql-${GRAPHQL_VERSION}.jar

RUN wget -q ${APOC_URI} -P plugins/ && \
wget -q ${GRAPHQL_URI} -P plugins/

COPY . .
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

 CMD ["neo4j"]
