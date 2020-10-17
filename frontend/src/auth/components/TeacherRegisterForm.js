import React, { useState } from 'react';
import { Button, IconButton, TextField, Typography,InputAdornment } from '@material-ui/core';
import { Form, FormGroup } from 'react-bootstrap';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import TeacherRegisterValidator from '../utils/TeacherRegisterValidator';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 0,
        margin: theme.spacing(2, 0),
    },
    style: {
        margin: theme.spacing(1,0),
    },
    leftAlign: {
        textAlign: 'left',
        marginLeft: theme.spacing(1),
    },
}));

export default function StudentRegisterForm() {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setErrors({});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        TeacherRegisterValidator()
            .validate({
                email,
                password,
                name,
            }).then(() => {    
                resetForm();
            },error => {
                setErrors(error.errors)
            })
    };

    return (
        <Form className='teacher-register-form'>
            <FormGroup>
                <TextField
                    className={classes.style}
                    fullWidth
                    required
                    autoFocus
                    inputProps={{ 'data-testid': 'name' }}
                    label='Name'
                    variant='outlined'
                    size='small'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name[0] : null}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    className={classes.style}
                    fullWidth
                    required
                    autoFocus
                    inputProps={{ 'data-testid': 'email' }}
                    label='Email'
                    variant='outlined'
                    size='small'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email[0] : null}
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
            <Button
                className={[classes.button,classes.style].join(' ')}
                fullWidth
                type='submit'
                size='large'
                color='secondary'
                variant='contained'
                onClick={submitHandler}
            >
                Register
            </Button>
        </Form>
    );
};
