import Employees from './pages/Employees.vue';
import History from './pages/History.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {path: '/employees', component: Employees, meta: {title: "Сотрудники"}},
    {path: '/history', component: History, meta: {title: "История"}},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
    