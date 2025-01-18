//src/app.tsx
import { ThemeProvider } from 'context/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import './App.scss';
import './styles/global/theme.scss';

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
