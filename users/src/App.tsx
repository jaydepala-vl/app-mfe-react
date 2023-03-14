import React from "react";
import ReactDOM, { createRoot } from 'react-dom/client';
import { FusionThemeProvider } from 'fusion';

// Navbar
import NavbarComponent from 'home/Navbar';

import "./index.css";

const App = () => (
  <React.StrictMode>
    <FusionThemeProvider>
      <NavbarComponent />
      <div className="container">
        <div>Name: users</div>
        <div>Framework: react</div>
        <div>Language: TypeScript</div>
        <div>CSS: Empty CSS</div>
      </div>
    </FusionThemeProvider>
  </React.StrictMode>
);

// let container: any = null;

// document.addEventListener('DOMContentLoaded', function (event) {
//   if (!container) {
//     container = document.getElementById('app') as HTMLElement;
//     const root = createRoot(container)
//     root.render(
//       <App />
//     );
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);