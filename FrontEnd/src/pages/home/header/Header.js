import { MdLogout } from 'react-icons/md';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import { MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from '../dropdown/Dropdown';
import './Header.css';
import viewActions from '../../../actions/viewActions';
import userActions from "../../../actions/userActions"

const Header = (props) => {
    const [avatarUrl, setAvatarUrl] = useState('')
    const clickMenuIcon = () => {
        props.toggleSidebar();
    }

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const _onClickAvatar = () => {
        setDropdownIsOpen(!dropdownIsOpen)
    }

    const handleClickOutSideDropdown = () => {
        setDropdownIsOpen(false)
    }

    const handleLogout = () => {
        // clear data in localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        window.location.replace('/sign-in');
    }

    // setAvatarUrl to get data
    useEffect(() => {
        if (props.user.avatarUrl != null && props.user.avatarUrl != '') {
            let avatarUrl = props.user.avatarUrl
            let temp = avatarUrl.split('\\')
            setAvatarUrl(temp[temp.length - 2] + '/' + temp[temp.length - 1])
        }
    }, [props.user])

    return (
        <div className='header'>
            <div className='row-1'>
                <div className='nav-left'>
                    <MdMenu className='menu-icon' onClick={clickMenuIcon} />
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/user-info">User Info</Link>
                    <Link to="/list-groups">List Groups</Link>
                    <Link to="/password-changing">Change Password</Link>
                </div>

                <div className='nav-right'>
                    <Box
                        className="header-avatar"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Tooltip title="Logout">
                            <IconButton
                                onClick={handleLogout}
                                size="small"
                                sx={{
                                    color: "text.secondary",
                                    "&:hover": {
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                    },
                                }}
                            >
                                <MdLogout size={30} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Account">
                            <IconButton onClick={_onClickAvatar} size="small">
                                <Avatar
                                    src={avatarUrl}
                                    alt="avatar"
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        border: "1px solid",
                                        borderColor: "primary.main",
                                        bgcolor: "transparent",
                                        "& img": {
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {
                        dropdownIsOpen && <Dropdown setDropdownClose={handleClickOutSideDropdown} />
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.userInfo.isLoading,
        user: state.userInfo.user,
        errorMessage: state.userInfo.errorMessage,
    }
}

const mapDispathToProps = (dispatch, props) => {
    return {
        getUserInfo: (avatarURL) => {
            dispatch(userActions.getUserInfo(avatarURL))
        },
        toggleSidebar: () => {
            dispatch(viewActions.toggleSidebar())
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);