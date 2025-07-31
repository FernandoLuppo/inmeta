const isValidCPF = (cpf: string) => {
  const cleaned = cpf.replace(/[^\d]+/g, "")

  if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false

  const calcCheckDigit = (base: string, factor: number) => {
    let total = 0
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i]) * (factor - i)
    }
    const remainder = (total * 10) % 11
    return remainder === 10 ? 0 : remainder
  }

  const firstCheck = calcCheckDigit(cleaned.slice(0, 9), 10)
  const secondCheck = calcCheckDigit(cleaned.slice(0, 10), 11)

  return (
    firstCheck === parseInt(cleaned[9]) && secondCheck === parseInt(cleaned[10])
  )
}

const formatCPF = (value: string) => {
  const digits = value.replace(/\D/g, "")
  const validRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  const cpfTemplate = /(\d{3})(\d{3})(\d{3})(\d{2})/

  if (validRegex.test(value)) {
    return value
  }

  return digits.replace(cpfTemplate, "$1.$2.$3-$4")
}

export { isValidCPF, formatCPF }
