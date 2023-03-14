import React from "react";
import ReactDOM, { createRoot } from 'react-dom/client';
import { FusionThemeProvider } from 'fusion';

import "./index.css";

// Navbar
import NavbarComponent from 'home/Navbar';

const App = () => (
  <React.StrictMode>
    <FusionThemeProvider>
      <NavbarComponent />
      <div className="container">
        <div>Name: data</div>
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
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     );
//   }
// });
// const container = document.getElementById('app');
// const root = createRoot(container as HTMLElement);
// root.render(<React.StrictMode><App /></React.StrictMode>);
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
