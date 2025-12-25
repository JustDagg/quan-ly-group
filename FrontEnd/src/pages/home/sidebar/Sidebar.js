import { connect } from 'react-redux';

import './Sidebar.css';
import { menuLinks } from '../../../data/data';
import CustomLinks2 from '../../../_sharecomponents/customlinks/CustomLinks2';

const Sidebar = (props) => {
    return (
        <div
            className={
                props.sidebarIsOpen ?
                    'sidebar' : 'sidebar close'
            }
        >
            <div className='sidebar-header'>

                <h3>Group Management</h3>
            </div>
            <div className='sidebar-menu'>
                <CustomLinks2 menuLinks={menuLinks} />
            </div>
            <div className='sidebar-bottom'>
                <h4>Tuan Dang</h4>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sidebarIsOpen: state.view.sidebarIsOpen
    }
}

export default connect(mapStateToProps, null)(Sidebar);