import { connect } from 'react-redux';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components'
import { MdGroupAdd } from 'react-icons/md'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import FormGroup from "../../_sharecomponents/formgroup/FromGroup";
import CustomInput from "../../_sharecomponents/custominput/CustomInput";
import CustomButton from "../../_sharecomponents/custombutton/CustomButton";
import userActions from "../../actions/userActions";

const SingupContainer = styled.div`
    max-width: 400px;
    margin: auto;
    margin-top: 1.5rem;

    .name {
        display: flex;
    }

    .name > div:first-child {
        margin-right: 5px;
    }
    .name > div:last-child {
        margin-left: 5px;
    }

    .signup-header h1 {
        text-align: center;
        font-weight: 400;
        font-size: 1.6rem;
    }

    .signup-avatar {
        width: 40px;
        height: 40px;
        background-color: #9c27b0;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }

    .btn-submit {
        margin-top: 2rem;
    }

    .group-link {
        margin-top: 1.35rem;
        display: flex;
        flex-direction: row-reverse;
    }

    .group-link a{
        color: #1976d2;
        font-weight: 400;
        letter-spacing: 0.01em;
        font-size: 0.875rem;
    }

    .copy-right {
        color: rgba(0, 0, 0, .6);
        font-weight: 400;
        letter-spacing: 0.01071em;
        font-size: 0.875rem;
        margin-top: 4rem;
        text-align: center;
    }

    .copy-right a {
        color: rgba(0, 0, 0, .6);
    }

    .signup-main > p:first-child {
        color:  red;
        font-size: .8rem;
        text-align: center;
        margin-top: .8rem;
    }

    .signup-main .form-group p {
        color:  red;
        font-size: .8rem;
        position: absolute;
        top: 100%;
    }
`;

const Signup = (props) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            role: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),

            lastName: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),

            username: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),

            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),

            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),

            role: Yup.string()
                .oneOf(['ADMIN', 'MANAGER', 'EMPLOYEE'])
                .required()
        }),

        onSubmit: values => {
            props.signup(values);
        }
    })

    const [userSignup, setUserSignup] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: ''
    })

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <SingupContainer>
            <div className="signup-header">
                <div className="signup-avatar">
                    <MdGroupAdd size='1.36rem' />
                </div>
                <h1>Sign up</h1>
            </div>
            <form className="signup-main" onSubmit={formik.handleSubmit}>
                <p>{props.errorMessageRegister}</p>
                <div className="name">
                    <FormGroup>
                        <CustomInput
                            label='First Name *'
                            type='text'
                            name='firstName'
                            value={formik.values.firstName}
                            onChangeInput={formik.handleChange}
                        />
                        {formik.errors.firstName && formik.touched.firstName && (
                            <p>{formik.errors.firstName}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <CustomInput
                            label='Last Name *'
                            type='text'
                            name='lastName'
                            value={formik.values.lastName}
                            onChangeInput={formik.handleChange}
                        />
                        {formik.errors.lastName && formik.touched.lastName && (
                            <p>{formik.errors.lastName}</p>
                        )}
                    </FormGroup>
                </div>
                <FormGroup>
                    <CustomInput
                        label='Username *'
                        type='text'
                        name='username'
                        value={formik.values.username}
                        onChangeInput={formik.handleChange}
                    />
                    {formik.errors.username && formik.touched.username && (
                        <p>{formik.errors.username}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <CustomInput
                        label='Email *'
                        type='email'
                        name='email'
                        value={formik.values.email}
                        onChangeInput={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p>{formik.errors.email}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <CustomInput
                        label='Password *'
                        type='password'
                        name='password'
                        value={formik.values.password}
                        onChangeInput={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p>{formik.errors.password}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        sx={{ minWidth: 150, border: "1px solid lightgray" }}
                    >
                        <Select
                            name="role"
                            value={formik.values.role || ""}
                            onChange={formik.handleChange}
                            displayEmpty
                            renderValue={(selected) =>
                                selected ? selected : <span style={{ color: "#999" }}>Select role</span>
                            }
                        >
                            <MenuItem value="" disabled>
                                Select role
                            </MenuItem>

                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="MANAGER">MANAGER</MenuItem>
                            <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                        </Select>

                        {formik.touched.role && formik.errors.role && (
                            <FormHelperText>{formik.errors.role}</FormHelperText>
                        )}
                    </FormControl>
                </FormGroup>
                <div className="btn-submit">
                    <CustomButton
                        type="submit"
                        color="#ffffff"
                        width="100%"
                        uppercase
                    >
                        Sign up
                    </CustomButton>
                </div>
                <div className="group-link">
                    <Link to="/sign-in">
                        Already have an account? Sign in
                    </Link>
                </div>
                <p className="copy-right"> Copyright &copy; &nbsp;
                    <Link to="/">Your Website</Link>&nbsp;
                </p>
            </form>
        </SingupContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.userInfo.isLoading,
        errorMessageRegister: state.userInfo.errorMessageRegister
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        signup: (user) => {
            dispatch(userActions.registerUser(user))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)