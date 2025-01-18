// src/index.tsx

// import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'antd/dist/reset.css';
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	// <ConfigProvider
	// 	theme={{
	// 		token: {
	// 			colorPrimary: '#584495',
	// 		},
	// 	}}
	// >
	<App />
	// </ConfigProvider>
);
