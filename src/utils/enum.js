export default class Enum {
  constructor({code, desc}) {
    this.code = code
    this.desc = desc
  }
}

export function findCode(ret, desc) {
  for (let i = 0; i < ret.length; i++) {
    if (ret[i].desc === desc) {
      return ret[i].code
    }
  }
  return 1
}
export const marry = [new Enum({
  code: 1,
  desc: '未婚'
}), new Enum({
  code: 2,
  desc: '已婚'
}), new Enum({
  code: 3,
  desc: '离异'
}), new Enum({
  code: 4,
  desc: '丧偶'
}), new Enum({
  code: 5,
  desc: '再婚'
}), new Enum({
  code: 6,
  desc: '复婚'
})]

export const education = [new Enum({
  code: 1,
  desc: '小学'
}), new Enum({
  code: 2,
  desc: '初中'
}), new Enum({
  code: 3,
  desc: '高中'
}), new Enum({
  code: 4,
  desc: '专科'
}), new Enum({
  code: 5,
  desc: '本科'
}), new Enum({
  code: 6,
  desc: '硕士研究生'
}), new Enum({
  code: 7,
  desc: '博士研究生'
}), new Enum({
  code: 8,
  desc: '博士后'
})]

export const purpose = [new Enum({
  code: 0,
  desc: '个体经营'
}), new Enum({
  code: 1,
  desc: '消费'
}), new Enum({
  code: 2,
  desc: '助学'
}), new Enum({
  code: 3,
  desc: '创业'
}), new Enum({
  code: 4,
  desc: '租房'
}), new Enum({
  code: 5,
  desc: '旅游'
}), new Enum({
  code: 6,
  desc: '装修'
}), new Enum({
  code: 7,
  desc: '医疗'
}), new Enum({
  code: 8,
  desc: '其他'
})]

export const workAge = [new Enum({
  code: 1,
  desc: '1个月'
}), new Enum({
  code: 2,
  desc: '3个月'
}), new Enum({
  code: 3,
  desc: '6个月'
}), new Enum({
  code: 4,
  desc: '1年'
}), new Enum({
  code: 5,
  desc: '2年'
}), new Enum({
  code: 6,
  desc: '3-5年'
}), new Enum({
  code: 7,
  desc: '5-10年'
}), new Enum({
  code: 8,
  desc: '10年以上'
})]

export const income = [new Enum({
  code: 1,
  desc: '10000以下'
}), new Enum({
  code: 2,
  desc: '10000-50000'
}), new Enum({
  code: 3,
  desc: '50000-100000'
}), new Enum({
  code: 4,
  desc: '100000-200000'
}), new Enum({
  code: 5,
  desc: '200000以上'
})]

export const realState = [new Enum({
  code: 0,
  desc: '无房'
}),new Enum({
  code: 1,
  desc: '有房有贷款'
}), new Enum({
  code: 2,
  desc: '有房无贷款'
}), new Enum({
  code: 3,
  desc: '其他'
})]

export const relation = [new Enum({
  code: 1,
  desc: '父母'
}), new Enum({
  code: 2,
  desc: '配偶'
}), new Enum({
  code: 3,
  desc: '兄妹'
}), new Enum({
  code: 4,
  desc: '亲戚'
}), new Enum({
  code: 5,
  desc: '朋友'
}), new Enum({
  code: 6,
  desc: '其他'
})]


