import React from 'react';
import { Container, Typography } from '@material-ui/core';
import TeacherRegisterForm from '../components/TeacherRegisterForm';

export default function StudentRegister(){
    return(
        <Container>
            <Typography variant='h4'>
                Register A Teacher
            </Typography>
            <TeacherRegisterForm />
        </Container>            
    );
};
