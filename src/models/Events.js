// DTO para a Lista (DataTable)
// Focado apenas no que é essencial para a visualização em colunas
export class EventDTO {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.date = obj.date
    this.location = obj.location
  }
}

// FullModel para Visualização e Edição (Modais)
// Contém todas as chaves do seu mockData sem exceção
export class EventFull {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.date = obj.date
    this.location = obj.location
    this.organizer = obj.organizer
    this.participants = obj.participants || [] // Array de IDs de membros
    this.images = obj.images || []             // Array de URLs de imagens
  }
}