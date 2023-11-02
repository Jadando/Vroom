export function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  let soma = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let primeiroDigito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (primeiroDigito !== parseInt(cnpj.charAt(12))) {
    return false;
  }

  soma = 0;
  peso = 2;
  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let segundoDigito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (segundoDigito !== parseInt(cnpj.charAt(13))) {
    return false;
  }

  return true;
}
