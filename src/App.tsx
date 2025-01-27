//src/app.tsx
import { ThemeProvider } from 'context/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import './App.scss';
import './styles/global/theme.scss';
import { Toaster } from 'react-hot-toast';
import { ToastSuccessSvg, ToastErrorSvg } from 'utils/svgs';

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
			<Toaster
				position="top-center"
				reverseOrder={false}
				containerClassName="toast-container-custom"
				toastOptions={{
					success: {
						icon: (
							<div className="toast-container-div">
								<ToastSuccessSvg />
							</div>
						),
						style: {
							backgroundColor: '#009049',
							color: '#fff',
							fontSize: '16px',
						},
					},
					error: {
						icon: (
							<div className="toast-container-div">
								<ToastErrorSvg />
							</div>
						),
						style: {
							backgroundColor: 'red',
							color: '#fff',
							fontSize: '16px',
						},
					},
				}}
			/>
		</ThemeProvider>
	);
}

export default App;
