// 1. Importação dos Services
import { MemberService } from '@/service/memberService'
import { ProjectService } from '@/service/projectService'
import { EventService } from '@/service/eventService'

// 2. Importação dos Models (Membros)
import { MemberDTO, MemberFull } from '@/models/Member'

// 3. Importação dos Models (Projetos)
import { ProjectDTO, ProjectFull } from '@/models/Project'

// 4. Importação dos Models (Eventos)
import { EventDTO, EventFull } from '@/models/Events'

export const resources = {
  members: { 
    service: MemberService, 
    mappers: { 
      ListDTO: MemberDTO, 
      FullModel: MemberFull 
    } 
  },
  projects: { 
    service: ProjectService, 
    mappers: { 
      ListDTO: ProjectDTO, 
      FullModel: ProjectFull 
    } 
  },
  events: { 
    service: EventService, 
    mappers: { 
      ListDTO: EventDTO, 
      FullModel: EventFull 
    } 
  }
}