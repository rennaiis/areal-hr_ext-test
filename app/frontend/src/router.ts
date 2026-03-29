import Departments from './pages/Departments.vue';
import Organizations from './pages/Organizations.vue';
import Positions from './pages/Positions.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {path: '/departments', component: Departments},
    {path: '/organizations', component: Organizations},
    {path: '/positions', component: Positions}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
    