//src/app.tsx

import { ThemeProvider } from 'context/ThemeContext';
import MainLayout from 'layouts/MainLayout/MainLayout';
import './styles/global/theme.scss';
import './App.scss';

function App() {
	return (
		<ThemeProvider>
			<div className="App">
				<MainLayout>
					<h1>App Content</h1>
				</MainLayout>
			</div>
		</ThemeProvider>
	);
}

export default App;
