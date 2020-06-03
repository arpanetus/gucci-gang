CALL apoc.uuid.install('User', {addToExistingNodes: true, uuidProperty: 'uuid'})
YIELD label, installed, properties RETURN label, installed, properties;
