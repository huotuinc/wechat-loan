import Cookies from 'js-cookie'

const agreementLink = 'agreementLink'
const about = 'about'
const loanerQuestionLink = 'loanerQuestionLink'
const loanerRegisterLink = 'loanerRegisterLink'

export function getAgreementLink() {
  return Cookies.get(agreementLink)
}

export function setAgreementLink(payload) {
  return Cookies.set(agreementLink, payload, { expires: 7 })
}

export function getAbout() {
  return Cookies.get(about)
}

export function setAbout(payload) {
  return Cookies.set(about, payload, { expires: 7 })
}
export function getLoanerQuestionLink() {
  return Cookies.get(loanerQuestionLink)
}

export function setLoanerQuestionLink(payload) {
  return Cookies.set(loanerQuestionLink, payload, { expires: 7 })
}
export function getLoanerRegisterLink() {
  return Cookies.get(loanerRegisterLink)
}

export function setLoanerRegisterLink(payload) {
  return Cookies.set(loanerRegisterLink, payload, { expires: 7 })
}
