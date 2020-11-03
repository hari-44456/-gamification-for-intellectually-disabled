import FormValidator from '../../utils/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;

export default function LoginValidator() {
    const validator = new FormValidator();
    validator
        .addRule('username', emptyCheck, 'Please Enter Username')
        .addRule('password', emptyCheck, 'Please Enter Password');

    return validator;
}
