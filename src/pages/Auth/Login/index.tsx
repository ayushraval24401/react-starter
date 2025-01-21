import { LockOutlined, UserOutlined } from '@ant-design/icons'; // Import icons
import { Button, Checkbox, Form, Input } from 'antd';
import InputField from 'components/Form/InputField';
import AuthLayout from 'layouts/AuthLayout';
import PasswordField from 'components/Form/PasswordField'; // Import the PasswordField
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { validateFormData } from 'utils/utils';

const LoginPage: React.FC = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});

	const [formErrors, setFormErrors] = useState<any>({
		email: false,
		password: false,
	});

	const handleChange = (name: string, value: string | boolean) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = () => {
		let checkFormError = validateFormData(
			{
				email: formData.email,
				password: formData.password,
			},
			{ ...formErrors }
		);

		console.log('Form Data: ', formData);
	};

	console.log('formErrors.email: ', formErrors.email);

	return (
		<AuthLayout imageSrc="/assets/login-image.jpg">
			<div className={styles['login-container']}>
				<img
					src="https://costallocationspro.s3.amazonaws.com/resuse-app/3n-star/3nStarLogo.png"
					alt="Logo"
					className={styles['logo']}
				/>
				<h2 className={styles['title']}>Login</h2>

				<Form
					layout="vertical"
					onFinish={handleSubmit}
					className={styles['form']}
				>
					{/* Email Input with icon inside label */}
					<Form.Item
						label={
							<>
								<UserOutlined /> Email
							</>
						}
						required
					>
						<InputField
							name="email"
							placeholder="Please enter email"
							label="email"
							value={formData.email}
							showLabel={false}
							onChange={(value) => handleChange('email', value)}
							helperText="Email is invalid"
							isError={!!formErrors.email}
							type='email'
						/>
					</Form.Item>

					{/* Password Input with icon inside label */}
					<Form.Item
						label={
							<>
								<LockOutlined /> Password
							</>
						}
						required
					>
						<PasswordField
							name="password"
							label="Password"
							value={formData.password}
							onChange={(value) =>
								handleChange('password', value)
							}
							helperText="Password is invalid"
							isError={!!formErrors.password}
							placeholder="Enter your password"
							showLabel={false}
						/>
					</Form.Item>

					<Form.Item>
						<Checkbox
							checked={formData.rememberMe}
							onChange={(e) =>
								handleChange('rememberMe', e.target.checked)
							}
						>
							Remember me
						</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button type="primary" block htmlType="submit">
							Login
						</Button>
					</Form.Item>

					<div className={styles['bottom-links']}>
						<Link to="/forgot-password">Forgot password?</Link>
						<Link to="/register">Create an account</Link>
					</div>
				</Form>
			</div>
		</AuthLayout>
	);
};

export default LoginPage;
