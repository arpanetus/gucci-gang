CALL apoc.uuid.install('KeyValueContent', {addToExistingNodes: true, uuidProperty: 'uuid'})
YIELD label, installed, properties RETURN label, installed, properties;
