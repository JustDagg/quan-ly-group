import constants from "../constants/constants"

const initialStateUserInfo = {
    isLoading: false,
    user: {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    },
    errorMessage: null,
    errorMessageGroup: null,
    errorMessageRegister: null,
    errorMessageSignin: null,
    errorMessageChangePassword: null,
    messageChangePasswordSuccess: null,
    listGroups: [],
    totalPagesListGroups: 0,
    updateCompleted: false,
    groupDeleted: false,
    createdGroupSuccessfully: false,
    userToken: {},
}

const userInfoReducer = (state = initialStateUserInfo, action) => {
    switch (action.type) {

        //Get user info
        case constants.GET_USRE_INFO_REUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.GET_USRE_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case constants.GET_USRE_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }

        //Update user info
        case constants.UPDATE_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case constants.UPDATE_USER_INFO_FAIL:
            return {
                ...state, isLoading: false,
                errorMessage: action.payload
            }

        //List groups
        case constants.GET_LIST_GROUP_REUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.GET_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listGroups: action.payload.listGroups,
                totalPagesListGroups: action.payload.totalPagesListGroups
            }
        case constants.GET_LIST_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload
            }

        //Register user
        case constants.REGISTER_USER_REUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case constants.REGISTER_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageRegister: action.payload.message
            }

        //Signin
        case constants.SIGNIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userToken: action.payload
            }
        case constants.SIGNIN_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageSignin: action.payload.message
            }

        //Update group
        case constants.UPDATE_GROUP_REUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateCompleted: true,
            }
        case constants.UPDATE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload
            }

        //Delete group
        case constants.DELETE_GROUP_REUEST:
            return {
                ...state,
                isLoading: true,
                groupDeleted: false
            }
        case constants.DELETE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                groupDeleted: true,
            }
        case constants.DELETE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload
            }

        //Create group
        case constants.CREATE_GROUP_REUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createdGroupSuccessfully: true,
                closeFormGroup: true
            }
        case constants.CREATE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload
            }

        //Change password
        case constants.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                messageChangePasswordSuccess: null,
                errorMessageChangePassword: null
            }
        case constants.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                messageChangePasswordSuccess: 'Your password changed. Please re-active account by click the link which our system has just send to your email.'
            }
        case constants.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageChangePassword: action.payload
            }

        default:
            return state

    }
}

export {
    userInfoReducer
}