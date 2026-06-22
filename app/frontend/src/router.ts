import Employees from './pages/Employees.vue';
import History from './pages/History.vue';
import { createRouter, createWebHistory} from 'vue-router';
import Organizations from './pages/Organizations.vue';
import AboutEmployee from './pages/AboutEmployee.vue';
import NewEmployee from './pages/NewEmployee.vue';
import HrOperations from './pages/HrOperations.vue';
import Users from './pages/Users.vue';
import LoginPage from './forms/loginPage.vue';
import { currentUser } from './currentUser';
import { getMe } from './API/auth';
const routes = [
    {path: '/', component: Employees, meta: {title: "Сотрудники"}},
    {path: '/history', component: History, meta: {title: "История"}},
    {path: '/organizations', component: Organizations, meta: {title: "Организации и отделы"}},
    {path: '/employee/:employeeId', props:true, component: AboutEmployee, meta: {title: "Информация о сотруднике"}},
    {path: '/hireEmployee', component: NewEmployee, meta:{title: "Найм нового сотрудника"}},
    {path: '/hr-operations', component: HrOperations, meta:{title:"Кадровые операции"}}, 
    {path: '/users', component: Users, meta:{title:"Пользователи"}}, 
    {path: '/login', component: LoginPage}
]



const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
router.beforeEach(async (to) => {
    const user = await getMe().catch(() => null)
    currentUser.value = user

    const isAuth = !!user

    if (!isAuth && to.path !== '/login') return '/login'
    if (isAuth && to.path === '/login') return '/'
})
export default router
    