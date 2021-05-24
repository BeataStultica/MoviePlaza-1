import { useState, useEffect } from 'react';
const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        firstname: '',
        lastname: '',
        bdate: '',
        password: '',
        password2: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        if (window.location.pathname === '/login') {
            fetch('https://movieplazaback.herokuapp.com/login', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'include',
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then(function (response, request) {
                    console.log(response);
                    if (response.success === 'false') {
                        alert('Неправильний логін або пароль');
                    } else {
                        window.location.pathname =
                            '/profile/' + values.username;
                    }
                });
        } else {
            fetch('https://movieplazaback.herokuapp.com/registration', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'include',
                body: JSON.stringify({
                    username: e.target.username.value,
                    firstname: e.target.firstname.value,
                    lastname: e.target.lastname.value,
                    dateofbirthday: e.target.bdate.value,
                    password: e.target.password.value,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
                    if (response.success === 'false') {
                        alert('Користувач вже існує');
                    } else {
                        setIsSubmitting(true);
                        e.preventDefault();
                        setErrors(validate(values));
                        window.location.pathname =
                            '/profile/' + values.username;
                    }
                });
        }

        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [callback, errors, isSubmitting]);

    return { handleChange, handleSubmit, values, errors };
};

export default useForm;
