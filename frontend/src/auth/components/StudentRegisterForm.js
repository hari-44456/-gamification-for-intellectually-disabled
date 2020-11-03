import React, { useState } from 'react';
import { Button, IconButton, TextField, Typography,InputAdornment } from '@material-ui/core';
import { Form, FormGroup } from 'react-bootstrap';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import StudentRegisterValidator from '../utils/StudentRegisterValidator';

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

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState(new Date('0001-01-01').toISOString().slice(0,10));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setId('');
        setName('');
        setDob(new Date('0001-01-01').toISOString().slice(0,10));
        setUsername('');
        setPassword('');
        setErrors({});
    };

    const isDateValid = (date) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const d = new Date(date);
        const dNum = d.getTime();
        if(dNum && dNum !== 0 && d.toISOString().slice(0,10).match(dateRegex)){
            return true;
        }
        return false;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        StudentRegisterValidator()
            .validate({
                username,
                password,
                id,
                name,
                dob
            }).then(() => {    
                resetForm();
            },error => {
                setErrors(error.errors)
            })
    };

    return (
        <Form className='student-register-form'>
            <FormGroup>
                <TextField
                    className={classes.style}
                    fullWidth
                    required
                    autoFocus
                    inputProps={{ 'data-testid': 'id' }}
                    label='ID'
                    variant='outlined'
                    size='small'
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    error={!!errors.id}
                    helperText={errors.id ? errors.id[0] : null}
                />
            </FormGroup>
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
            <FormGroup className={classes.leftAlign}>
                <TextField
                    className={classes.style}
                    id="date"
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={event => {
                        if(isDateValid(event.target.value)){
                            setDob(new Date(event.target.value).toISOString().slice(0,10));
                        }
                    }}
                    error={!!errors.dob}
                    helperText={errors.dob ? errors.dob[0] : null}
                />
            </FormGroup>
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
