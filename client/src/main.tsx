import { createRoot } from 'react-dom/client'
import './assets/index.css';
import { RouterProvider } from 'react-router-dom';
import { ROUTER } from '@/routes/route';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={ROUTER}/>,
)
