import { MdLogout } from 'react-icons/md';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from '../dropdown/Dropdown';
import './Header.css';
import viewActions from '../../../actions/viewActions';

const Header = (props) => {
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
                                <MdLogout size={20} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Account">
                            <IconButton onClick={_onClickAvatar} size="small">
                                <Avatar
                                    src="../../images/avatar.png"
                                    alt="avatar"
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        border: "2px solid",
                                        borderColor: "primary.main",
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

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleSidebar: () => {
            dispatch(viewActions.toggleSidebar())
        }
    }
}

export default connect(null, mapDispatchToProps)(Header);