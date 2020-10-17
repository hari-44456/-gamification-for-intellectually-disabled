import FormValidator from '../../utils/FormValidator';

const emptyCheck = (value) => value && value.trim().length > 0;
const validDate = (value) => parseInt(value[0]+value[1]+value[2]+value[3]) > 1950;

export default function StudentRegisterValidator() {
    const validator = new FormValidator();
    validator
        .addRule('username', emptyCheck, 'Please Enter Username')
        .addRule('password', emptyCheck, 'Please Enter Password')
        .addRule('id', emptyCheck, 'Please Enter Id')
        .addRule('name', emptyCheck, 'Please Enter Name')
        .addRule('dob', validDate, 'Please Enter Valid Date')

    return validator;
}
