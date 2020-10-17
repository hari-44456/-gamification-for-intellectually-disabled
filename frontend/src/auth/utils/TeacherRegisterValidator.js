import FormValidator from '../../utils/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;
const validEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
};

export default function StudentRegisterValidator() {
    const validator = new FormValidator();
    validator
        .addRule('email', validEmail, 'Please Enter Valid Email')
        .addRule('password', emptyCheck, 'Please Enter Password')
        .addRule('name', emptyCheck, 'Please Enter Name');

    return validator;
}
