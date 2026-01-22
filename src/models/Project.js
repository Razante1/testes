// DTO para a Lista (DataTable)
// Filtramos apenas as colunas que importam para uma visualização em tabela fixa
export class ProjectDTO {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.status = obj.status
    this.startDate = obj.startDate
  }
}

// FullModel para Detalhes (Modais de Visualização e Edição)
// Contém todas as chaves do seu mockData, nem mais, nem menos
export class ProjectFull {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.technologies = obj.technologies || [] // Array de strings
    this.members = obj.members || []           // Array de IDs de membros
    this.status = obj.status
    this.startDate = obj.startDate
    this.endDate = obj.endDate
    this.images = obj.images || []             // Array de URLs das fotos
    this.repository = obj.repository
  }
}