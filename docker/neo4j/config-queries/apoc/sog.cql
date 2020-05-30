CALL apoc.uuid.install('SOG', {addToExistingNodes: true, uuidProperty: 'uuid'})
YIELD label, installed, properties RETURN label, installed, properties;
