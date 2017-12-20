export default class Purpose {
  constructor({id, borrowUse}) {
    this.id = id
    this.borrowUse = borrowUse
  }
}

export function createPurposeArray() {
  let items = [new Purpose({
    id: 0,
    borrowUse: '个体经营'
  }), new Purpose({
    id: 1,
    borrowUse: '消费'
  }), new Purpose({
    id: 2,
    borrowUse: '助学'
  }), new Purpose({
    id: 3,
    borrowUse: '创业'
  }), new Purpose({
    id: 4,
    borrowUse: '租房'
  }), new Purpose({
    id: 5,
    borrowUse: '旅游'
  }), new Purpose({
    id: 6,
    borrowUse: '装修'
  }), new Purpose({
    id: 7,
    borrowUse: '医疗'
  }), new Purpose({
    id: 8,
    borrowUse: '其他'
  })]
  return items
}

export function findPurposeCode(purpose) {
  let ret = createPurposeArray()
  for (let i = 0; i < ret.length; i++) {
    if (ret[i].borrowUse === purpose) {
      return ret[i].id
    }
  }
  return 1
}
