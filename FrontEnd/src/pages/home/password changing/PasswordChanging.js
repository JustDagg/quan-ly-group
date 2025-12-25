import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useEffect } from "react";

import userActions from "../../../actions/userActions";
import CustomInput from "../../../_sharecomponents/custominput/CustomInput";
import FormGroup from "../../../_sharecomponents/formgroup/FromGroup";
import CustomButton from "../../../_sharecomponents/custombutton/CustomButton";

const PasswordChanging = (props) => {
    const username = localStorage.getItem('username');

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!")
        }),
        onSubmit: values => {
            props.changePassword(username, values.password);
        }
    });

    useEffect(() => {
        props.showLoading(props.isLoading);
    }, [props.isLoading]);

    return (
        <div className={props.className}>
            <form className="content" onSubmit={formik.handleSubmit}>
                <h3>Change Password</h3>
                <FormGroup>
                    <CustomInput
                        label='New Password *'
                        type='password'
                        name='password'
                        value={formik.values.password}
                        onChangeInput={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p className="error-message">{formik.errors.password}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <CustomButton
                        type="submit"
                        className="submit-button"
                        uppercase
                    >
                        Submit
                    </CustomButton>
                </FormGroup>
                <FormGroup>
                    {props.messageChangePasswordSuccess && (
                        <p className="success-message">{props.messageChangePasswordSuccess}</p>
                    )}
                    {props.errorMessageChangePassword && (
                        <p className="error-message">{props.errorMessageChangePassword}</p>
                    )}
                </FormGroup>
            </form>
        </div>
    );
}

const PasswordChangingStyled = styled(PasswordChanging)`
    height: calc(100vh - 108px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    .content {
        width: 1000px;
        background-color: #ffffff;
        border-radius: 15px; /* More rounded corners */
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    h3 {
        text-align: center;
        color: #333;
        font-family: 'Arial', sans-serif;
        font-size: 1.5rem;
        margin-bottom: 20px;
    }

    .error-message {
        color: red;
        font-size: 0.9rem;
        margin-top: 5px;
    }

    .success-message {
        color: green;
        font-size: 0.9rem;
        text-align: center;
        margin-top: 10px;
    }

    /* Styles for button */
    .submit-button {
        background: linear-gradient(90deg, #007BFF, #0056b3);
        color: #fff;
        border: none;
        border-radius: 20px;
        padding: 12px 20px;
        transition: all 0.3s ease;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
    }

    .submit-button:hover {
        background: linear-gradient(90deg, #0056b3, #007BFF); 
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
`;

const mapStateToProps = (state) => {
    return {
        isLoading: state.userInfo.isLoading,
        errorMessageChangePassword: state.userInfo.errorMessageChangePassword,
        messageChangePasswordSuccess: state.userInfo.messageChangePasswordSuccess,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        changePassword: (username, password) => {
            dispatch(userActions.changePassword(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangingStyled);
