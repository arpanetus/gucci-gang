export class RST {
  /**
   *
   * @param{Array<Node>} nodes
   * @param{Array<Rel>} nodeRels
   * @param{Array<KeyValueContent>} nodeContents
   * @param{Array<Rel>} nodeContentRels
   * @constructor
   */
  constructor(
    nodes,
    nodeRels,
    nodeContents,
    nodeContentRels
  ) {
    this.nodes = nodes
    this.nodeRels = nodeRels
    this.nodeContents = nodeContents
    this.nodeContentRels = nodeContentRels
  }
}

export class Node {
  /**
   *
   * @param{string|null} uuid
   * @param{string|null} type
   * @constructor
   */
  constructor(uuid = null, type = null) {
    this.uuid = uuid
    this.type = type
  }

}

export class Rel {
  /**
   *
   * @param{string|null} from
   * @param{string|null} to
   * @constructor
   */
  constructor(from = null, to = null) {
    this.from = from
    this.to = to
  }
}

export class KeyValueContent {
  /**
   *
   * @param{string|null} uuid
   * @param{string|null} key
   * @param{string|null} type
   * @param{string|null} value
   * @param{number|null} order
   * @param{string|null} orderForField
   * @constructor
   */
  constructor(
    uuid = null,
    key = null,
    type = null,
    value = null,
    order = null,
    orderForField = null
  ) {
    this.uuid = uuid
    this.key = key
    this.type = type
    this.value = value
    this.order = order
    this.orderForField = orderForField
  }
}
