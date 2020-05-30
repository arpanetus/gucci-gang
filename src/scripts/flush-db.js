import neo4j from 'neo4j-driver';
import driver from 'driver';
import dotenv from 'dotenv';

dotenv.config();

const flushDb = `MATCH (n) DETACH DELETE n;`

const runFlush = () => {
  const confSession = driver.session({defaultAccessMode: neo4j.session.WRITE});
  confSession.run(flushDb).subscribe({
    onCompleted: (_) => {
      console.log(`${flushDb}`);
      console.log(`FLUSH IS DONE!`);
      (async () => await confSession.close())().catch(error => console.log(error))
      return process.exit(0)
    },
    onError: (error) => {
      console.log(error);
    }
  })
}
runFlush()
