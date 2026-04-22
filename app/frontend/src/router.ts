import Employees from './pages/Employees.vue';
import History from './pages/History.vue';
import { createRouter, createWebHistory} from 'vue-router';
import Organizations from './pages/Organizations.vue';
import AboutEmployee from './pages/AboutEmployee.vue';
import NewEmployee from './pages/NewEmployee.vue';
import HrOperations from './pages/HrOperations.vue';
const routes = [
    {path: '/', component: Employees, meta: {title: "Сотрудники"}},
    {path: '/history', component: History, meta: {title: "История"}},
    {path: '/organizations', component: Organizations, meta: {title: "Организации и отделы"}},
    {path: '/employee/:employeeId', props:true, component: AboutEmployee, meta: {title: "Информация о сотруднике"}},
    {path: '/hireEmployee', component: NewEmployee, meta:{title: "Найм нового сотрудника"}},
    {path: '/hr-operations', component: HrOperations, meta:{title:"Кадровые операции"}}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
    