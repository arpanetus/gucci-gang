import neo4j from 'neo4j-driver';
import driver from 'driver';
import dotenv from 'dotenv';

dotenv.config();

const createConstraint = (entityName) => `
CREATE CONSTRAINT ON (el:${entityName})
ASSERT el.uuid IS UNIQUE;
`
const callUuidSet = (entityName) => `
CALL apoc.uuid.install('${entityName}', {addToExistingNodes: true, uuidProperty: 'uuid'})
YIELD label, installed, properties
RETURN label, installed, properties;
`

const postConfig = () => {
  const runConfForEntities = (entities, queryFunc) => {
    return entities.map(queryFunc).forEach(query=>{
      const confSession = driver.session({defaultAccessMode: neo4j.session.WRITE});
      confSession.run(query).subscribe({
        onCompleted: () => {
          console.log(`${query}`);
          (async ()=>await confSession.close())()
        },
        onError: (error) => {
          console.log(error);
        }
      })
    })
  }
  runConfForEntities(["KeyValueContent", "FOG", "SOG"], createConstraint)
  setTimeout(
    ()=>runConfForEntities(
      ["KeyValueContent", "FOG", "SOG"],
      callUuidSet),
    2000
  )
}
postConfig()
setTimeout(()=>{console.log(`POST CONFIG IS DONE!`); return process.exit(0)}, 4000)
