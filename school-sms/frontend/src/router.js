import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import AdminDashboard from './pages/AdminDashboard.vue';
import TeacherDashboard from './pages/TeacherDashboard.vue';
import Classes from './pages/Classes.vue';
import Students from './pages/Students.vue';
import Attendance from './pages/Attendance.vue';
import Exams from './pages/Exams.vue';
import ResultsLookup from './pages/ResultsLookup.vue';
import Teachers from './pages/Teachers.vue';
const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: AdminDashboard, meta: { role: 'admin' } },
  { path: '/t/dashboard', component: TeacherDashboard, meta: { role: 'teacher' } },
  { path: '/classes', component: Classes, meta: { role: 'admin' } },
  { path: '/students', component: Students, meta: { role: 'admin' } },
  { path: '/attendance', component: Attendance, meta: { role: ['admin','teacher'] } },
  { path: '/exams', component: Exams, meta: { role: ['admin','teacher'] } },
  { path: '/results', component: ResultsLookup }, 
  { path: '/teachers', component: Teachers, meta: { role: 'admin' } },// public page (no auth required)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!to.meta.role) {
    if (to.path === '/login' && token) {
      // redirect based on role
      if (user?.role === 'admin') return next('/dashboard');
      if (user?.role === 'teacher') return next('/t/dashboard');
    }
    return next();
  }
  if (!token) return next('/login');
  const needed = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role];
  if (user && needed.includes(user.role)) return next();
  return next('/login');
});

export default router;
