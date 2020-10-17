import React from 'react';
import { Container, Typography } from '@material-ui/core';
import LoginForm from '../components/LoginForm';

export default function StudentLogin(){
    return(
        <Container>
            <Typography variant='h4'>
                Teacher Login
            </Typography>
            <LoginForm />
        </Container>
    );
};
