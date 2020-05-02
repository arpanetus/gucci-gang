export const createConstraint = (entityName) => `
CREATE CONSTRAINT ON (el:${entityName})
ASSERT el.uuid IS UNIQUE;
`
export const callUuidSet = (entityName) => `
CALL apoc.uuid.install('${entityName}', {addToExistingNodes: true, uuidProperty: 'uuid'})
YIELD label, installed, properties
RETURN label, installed, properties;
`


