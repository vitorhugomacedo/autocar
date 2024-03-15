function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarCNPJ(cnpj) {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

function formatarMoedaBrl(valor){
    return valorFormatado = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 
}


export default {
  formatarDocumento(doc) {
    return doc.length == 14 ? formatarCNPJ(doc) : formatarCPF(doc)
  },
  
  formatarMoeda(value){
    return formatarMoedaBrl(value)
  }
}
