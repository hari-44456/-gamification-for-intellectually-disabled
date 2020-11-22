import React, { useState, useEffect, useContext } from 'react';
import {
	Button,
	IconButton,
	TextField,
	Typography,
	InputAdornment,
} from '@material-ui/core';
import { Form, FormGroup } from 'react-bootstrap';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import LoginValidator from '../utils/LoginValidator';
import { TokenContext } from '../../context/TokenContext';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	forgotPassword: {
		textAlign: 'right',
	},
	button: {
		borderRadius: 0,
		margin: theme.spacing(2, 0),
	},
	style: {
		margin: theme.spacing(1, 0),
	},
}));

const DisplayAlert = ({ error }) => {
	return (
		<Alert severity='error'>
			<AlertTitle>{error}</AlertTitle>
		</Alert>
	);
};

export default function LoginForm({ type }) {
	const classes = useStyles();
	const history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);

	const [token, setToken] = useContext(TokenContext);
	const [loginError, setLoginError] = useState('');

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		console.log('token at login page is ', token);
		const validTokenPrefix = ['student', 'teacher', 'admin'];
		if (token && token.type && validTokenPrefix.includes(token.type))
			history.push(`/${token.type}/dashboard`);
	});

	const resetForm = () => {
		setUsername('');
		setPassword('');
		setErrors({});
	};

	const submitHandler = (event) => {
		event.preventDefault();

		LoginValidator()
			.validate({
				username,
				password,
			})
			.then(
				() => {
					resetForm();
				},
				(error) => {
					console.log(error.errors);
					setErrors(error.errors);
				},
			);
		const data = {
			username,
			password,
		};

		axios
			.post(
				`http://localhost:5000/api/auth/${type}/login`,
				data,
			)
			.then((res) => {
				console.log('then', res.data);
				setToken({ type: type, tokenValue: res.data });
				history.push(`/${type}/dashboard`);
			})
			.catch((err) => {
				setLoginError(err.response.data);
			});
	};

	return (
		<>
			{loginError !== '' ? <DisplayAlert error={loginError} /> : ''}
			<Form className='login-form'>
				<FormGroup>
					<TextField
						className={classes.style}
						fullWidth
						required
						autoFocus
						inputProps={{ 'data-testid': 'username' }}
						label='Username'
						variant='outlined'
						size='small'
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						error={!!errors.username}
						helperText={errors.username ? errors.username[0] : null}
					/>
				</FormGroup>
				<FormGroup>
					<TextField
						className={classes.style}
						fullWidth
						required
						inputProps={{ 'data-testid': 'password' }}
						type={showPassword ? 'text' : 'password'}
						label='Password'
						variant='outlined'
						size='small'
						autoComplete='false'
						value={password}
						error={!!errors.password}
						helperText={errors.password ? errors.password[0] : null}
						onChange={(event) => setPassword(event.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										data-testid='password-visibility'
										onClick={togglePasswordVisibility}
										edge='end'
										title={
											showPassword
												? 'Hide Password'
												: 'Show Password'
										}>
										{showPassword ? (
											<Visibility fontSize='small' />
										) : (
											<VisibilityOff fontSize='small' />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</FormGroup>
				<Typography
					variant='subtitle2'
					color='error'
					data-testid='non-field-errors'>
					{errors['non_field_errors']
						? errors['non_field_errors'][0]
						: null}
				</Typography>
				<Typography
					color='error'
					variant='subtitle2'
					className={classes.forgotPassword}>
					<b>Forgot Password?</b>
				</Typography>
				<Button
					className={[classes.button, classes.style].join(' ')}
					fullWidth
					type='submit'
					size='large'
					color='secondary'
					variant='contained'
					onClick={submitHandler}>
					Login
				</Button>
			</Form>
		</>
	);
}
