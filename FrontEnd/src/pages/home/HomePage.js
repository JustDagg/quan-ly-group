import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import './HomePage.css';

const HomePage = (props) => {

    return (
        <div className='home-container'>
            <Sidebar />
            <div className={props.sidebarIsOpen ? 'home-main' : 'home-main sidebar-close'}>
                <Header />
                <div className='main-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sidebarIsOpen: state.view.sidebarIsOpen
    }
}

export default connect(mapStateToProps, null)(HomePage);
