CALL apoc.uuid.install('FOG', {addToExistingNodes: true, uuidProperty: 'uuid'})
YIELD label, installed, properties RETURN label, installed, properties;
