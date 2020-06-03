CALL apoc.uuid.install('Tag', {addToExistingNodes: true, uuidProperty: 'uuid'})
YIELD label, installed, properties RETURN label, installed, properties;
