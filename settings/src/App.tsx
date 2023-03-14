import React, { useEffect } from "react";
import ReactDOM, { createRoot } from 'react-dom/client';
import { FusionThemeProvider } from 'fusion';
import { Global } from '@emotion/react';

// Navbar
import NavbarComponent from 'home/Navbar';

import "./index.css";

const globalStyles = (
	<Global
		styles={() => ({
			// hackery to ensure chart popovers are rendered over page content
			'[data-testid="chart-popover"]': {
				zIndex: 1000,
			},
		})}
	/>
);

const App = () => {

	return (<React.StrictMode>
		<FusionThemeProvider>
			{globalStyles}
			<NavbarComponent />
			<div className="container">
				<div>Name: settings</div>
				<div>Framework: react</div>
				<div>Language: TypeScript</div>
				<div>CSS: Empty CSS</div>
			</div>
		</FusionThemeProvider>
	</React.StrictMode>);
};

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
