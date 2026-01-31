
import { ref } from 'vue'


export function useSidebar() {


    const rail = ref(false)
    const drawer = ref(true) 

    const items = [
    { title: 'Membros', route: '/admin/members', icon: 'mdi-account-group' },
    { title: 'Projetos', route: '/admin/projects', icon: 'mdi-folder-multiple' },
    { title: 'Eventos', route: '/admin/events', icon: 'mdi-calendar-multiple' },
    { title: 'Dados', route: '/admin/dados', icon: 'mdi-database' }
    ]



    return {rail,drawer,items}
} 