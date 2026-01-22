// models/MemberDTO.js (Para a DataTable - LEVE)
export class MemberDTO {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.role = obj.role
  }
}

// models/MemberFull.js (Para Modais - COMPLETO)
export class MemberFull {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.role = obj.role
    this.bio = obj.bio
    this.email = obj.email
    this.avatar = obj.avatar
    this.createdAt = new Date(obj.created_at).toLocaleDateString('pt-BR')
  }
}