import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { MdNotificationsNone } from 'react-icons/md';
import { MdMailOutline } from 'react-icons/md';
import { MdOutlineListAlt } from 'react-icons/md';
import { MdOutlineModeComment } from 'react-icons/md';
import { MdOutlinePermContactCalendar } from 'react-icons/md';
import { MdExitToApp } from 'react-icons/md';

import './Dropdown.css'

const Dropdown = (props) => {
    const myRef2 = useRef(false)

    useEffect(() => {
        document.addEventListener('mousedown', _handleClickOutSideDropdown)
    }, [])

    const _handleClickOutSideDropdown = (e) => {
        if (e.target.src && e.target.src.indexOf('avatar.png') > -1) {
            return
        } else {
            if (myRef2.current && !myRef2.current.contains(e.target)) props.setDropdownClose()
        }
    }

    return (

        <ul className='dropdown' ref={myRef2}>
            <li>
                <h6 className='dropdown-header'>
                    Account
                </h6>
            </li>
            <li>
                <Link to="/">
                    <MdNotificationsNone size='1.2rem' />
                    Updates
                    <span className='update'>1</span>
                </Link>
            </li>
            <li>
                <Link to="/">
                    <MdMailOutline size='1.2rem' />
                    Messages
                    <span className='messages'>3</span>
                </Link>
            </li>
            <li>
                <Link to="/">
                    <MdOutlineListAlt size='1.2rem' />
                    Task
                    <span className='tasks'>6</span>
                </Link>
            </li>
            <li>
                <Link to="/">
                    <MdOutlineModeComment size='1.2rem' />
                    Comments
                    <span className='comments'>8</span>
                </Link>
            </li>
            <li>
                <h6 className='dropdown-header'>
                    Settings
                </h6>
            </li>
            <li>
                <Link to="/user-info">
                    <MdOutlinePermContactCalendar size='1.2rem' />
                    Profile
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider"></hr>
            </li>
            <li>
                <Link to="/sign-in">
                    <MdExitToApp size='1.2rem' />
                    Logout
                </Link>
            </li>
        </ul>
    );
};

export default Dropdown