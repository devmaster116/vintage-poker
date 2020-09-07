import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import theme from './styles/theme';
import Normalize from './styles/Normalize';
import GlobalStyles from './styles/Global';
import logoWithText from './assets/img/logo-text@2x.png';
import GlobalState from './context/global/GlobalState';
import AuthProvider from './context/auth/AuthProvider';

const rootElement = document.getElementById('root');
const cookieBannerRoot = document.getElementById('cookie-banner');
const loadingScreen = document.getElementById('loading-screen');

if (
  process &&
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_MAINTENANCE_MODE === 'true'
) {
  // Show maintenance mode content if proper env vars are set
  const template = `
    <div style="width: 100%; padding: 0 1.5rem; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; background-color: hsl(43, 40%, 86%);">
      <img style="width: 100%; max-width: 320px;" src=${logoWithText} alt="Vintage Poker">
      <p style="font-size: 1.5rem; font-family: 'Roboto', sans-serif; color: hsl(36, 71%, 3%); text-align: center; margin-top: 3rem; padding: 1rem 2rem; background-color: hsl(49, 63%, 92%); border-radius: 2rem;">The website is currently in maintenance mode.</p>
    </div>
  `;
  loadingScreen.style.display = 'none';
  rootElement.innerHTML = template;
  rootElement.style.display = 'block';
} else {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalState>
        <AuthProvider>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Normalize />
              <GlobalStyles />
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </GlobalState>
    </React.StrictMode>,
    rootElement,
  );

  // Hide loading screen and show app content when window has fully loaded
  window.onload = () => {
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      rootElement.style.display = 'block';
      cookieBannerRoot.style.display = 'block';
    }, 1000);
  };

  // Disable react dev tools in production
  if (
    process.env.NODE_ENV === 'production' &&
    typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object'
  ) {
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value == 'function' ? () => {} : null;
    }
  }
}
