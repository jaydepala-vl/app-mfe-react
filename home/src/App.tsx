import React, { useEffect, useState } from "react";
import { FusionThemeProvider } from 'fusion';
import ReactDOM, { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';

// Main Layout
import MainLayout from "./MainLayout";

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

const App = () => (
	<React.StrictMode>
		<FusionThemeProvider>
			{globalStyles}
			<MainLayout />
		</FusionThemeProvider>
	</React.StrictMode>
);

// let container: any = null;

// document.addEventListener('DOMContentLoaded', function(event) {
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
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);