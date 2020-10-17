import React from 'react';
import { Container, Typography } from '@material-ui/core';
import StudentRegisterForm from '../components/StudentRegisterForm';

export default function StudentRegister(){
    return(
        <Container>
            <Typography variant='h4'>
                Register A Student
            </Typography>
            <StudentRegisterForm />
        </Container>            
    );
};
