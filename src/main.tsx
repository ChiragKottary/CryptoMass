import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './app/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
