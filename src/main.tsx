import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'lenis/dist/lenis.css';

createRoot(document.getElementById("root")!).render(<App />);
