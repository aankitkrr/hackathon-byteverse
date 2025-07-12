import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ThemeProvider from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; 
import "./Main.css"

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </ThemeProvider>
);
