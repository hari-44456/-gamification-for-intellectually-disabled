import React, { useState } from 'react';
import { Button, IconButton, TextField, Typography,InputAdornment } from '@material-ui/core';
import { Form, FormGroup } from 'react-bootstrap';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import LoginValidator from '../utils/LoginValidator'

const useStyles = makeStyles((theme) => ({
    forgotPassword: {
        textAlign: 'right',
    },
    button: {
        borderRadius: 0,
        margin: theme.spacing(2, 0),
    },
    style: {
        margin: theme.spacing(1,0),
    }
}));

export default function LoginForm() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
            }).then(() => {    
                resetForm();
            },error => {
                console.log(error.errors);
                setErrors(error.errors)
            })
    };

    return (
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
                                    title={showPassword ? 'Hide Password' : 'Show Password'}
                                >
                                    {showPassword ? (
                                        <Visibility fontSize='small'  />
                                    ) : (
                                        <VisibilityOff fontSize='small' />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormGroup>
            <Typography variant='subtitle2' color='error' data-testid='non-field-errors'>
                {errors['non_field_errors'] ? errors['non_field_errors'][0] : null}
            </Typography>
            <Typography color='error' variant='subtitle2' className={classes.forgotPassword}>
                <b>Forgot Password?</b>
            </Typography>
            <Button
                className={[classes.button,classes.style].join(' ')}
                fullWidth
                type='submit'
                size='large'
                color='secondary'
                variant='contained'
                onClick={submitHandler}
            >
                Login
            </Button>
        </Form>
    );
};
