import React, { useState, useEffect } from "react";
import { Form, FormInput } from './UI/Form';
import TopBar from "./TopBar";

export default function Register() {
    const [user, setUser] = useState(null);
    return (
        <>
            <TopBar title='Register' />
            <Form
                title='Register'
                submitButtonTitle='Register'
            // errorMessage={this.state.errorMessage}
            //onSubmit={handleSave}
            >
                <FormInput
                    //onChange={handleChange}
                    type='text'
                    label='Name'
                    placeholder='Name'
                    name='name'
                    value={user?.name}
                    errorMessage={user?.name.length > 0 ? 'Name must begint with an upper case letter and only contain letters' : 'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                />
                <FormInput
                    //onChange={handleChange}
                    type='text'
                    label='Surname'
                    placeholder='Surname'
                    name='surname'
                    value={user?.surname}
                    errorMessage={user?.surname.length > 0 ? 'Surname must begint with an upper case letter and only contain letters' : 'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                />
                <FormInput
                    //onChange={handleChange}
                    type='text'
                    label='Social security number'
                    placeholder='Social security number'
                    name='socialSecurityNumber'
                    value={user?.socialSecurityNumber}
                    errorMessage={user?.socialSecurityNumber.length > 0 ? 'Social security number must be a positive integer' : 'Field is required'}
                    required={true}
                    pattern='^[0-9]*$'
                />
                <FormInput
                    //onChange={handleChange}
                    type='text'
                    label='Email'
                    placeholder='Email'
                    name='email'
                    value={user?.email}
                    errorMessage={user?.email?.length > 0 ? 'Email is not valid' : 'Field is required'}
                    required={true}
                    pattern='^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
                />
                <FormInput
                    //onChange={handleChange}
                    type='text'
                    label='Phone number'
                    placeholder='Phone number'
                    name='phoneNumber'
                    value={user?.phoneNumber}
                    errorMessage='Field is required'
                    required={true}
                />
                <FormInput
                    //onChange={handleChange}
                    type='text'
                    label='Username'
                    placeholder='Username'
                    name='username'
                    value={user?.username}
                    errorMessage={user?.username?.length > 0 ? 'Username must be between 5-20 characters and cannot contain _ and . caracters in front or end' : 'Field is required'}
                    required={true}
                    pattern='^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
                />
                <FormInput
                    //onChange={handleChange}
                    type='password'
                    label='Password'
                    placeholder='Password'
                    name='password'
                    errorMessage={user?.password?.length > 0 ? 'Password must be 8-20 characters long and contain at least one letter, number and special character' : 'Field is required'}
                    required={true}
                    pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$'
                />
                <FormInput
                    //onChange={handleChange}
                    type='password'
                    label='Confirm Password'
                    placeholder='Confirm password'
                    name='confirmPassword'
                    errorMessage={user?.confirmPassword?.length > 0 ? 'Passwords do not match' : 'Field is required'}
                    required={true}
                    pattern={user?.password}
                />
                <FormInput
                    //onChange={handleChange}
                    type='text'
                    label='Address'
                    placeholder='Address'
                    name='address'
                    value={user?.address}
                    errorMessage='Field is required'
                    required={true}
                />
            </Form>
        </>
    );
};