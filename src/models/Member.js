// DTO para a Lista (DataTable)
// Selecionamos apenas os campos essenciais para não sobrecarregar a tabela
export class MemberDTO {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.role = obj.role
    this.status = obj.status
  }
}

// FullModel para Detalhes (Modais de Visualização e Edição)
// Contém 100% das propriedades do seu mockData
export class MemberFull {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.role = obj.role
    this.email = obj.email
    this.avatar = obj.avatar
    this.status = obj.status
    this.skills = obj.skills || [] // Array de strings do mock
    this.joinedAt = obj.joinedAt
  }
}