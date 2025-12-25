import { Button, FormControl, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { MdEdit, MdOutlineDeleteForever, MdAddToPhotos, MdRefresh } from 'react-icons/md'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate';

import ConfirmDeleteModal from './ConfirmDeleteModal '
import userActions from '../../../actions/userActions'
import FormGroupInfo from './FromGroupInfo'
import viewActions from '../../../actions/viewActions'
import './ListGroups.scss'

const ListGroups = (props) => {
    const [groupItem, setGroupItem] = useState({})
    const [buttonText, setButtonText] = useState('Create')
    const [selectChanged, setSelectChanged] = useState(false)
    const [type, setType] = useState('Type')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const PAGE_SIZE = 10
    const SORT = 'id,asc'

    const handleClickAddGroup = () => {
        setGroupItem({
            name: '',
            type: '',
            createdAt: '',
            totalMember: ''
        })
        setButtonText('Create')
        props.toggleFormGroup(true)
    }

    const handleClickEdit = (item) => {
        setButtonText('Save')
        props.toggleFormGroup(true)
        let groupIndex = props.listGroups.findIndex(x => x.id === item.id)
        setGroupItem(props.listGroups[groupIndex])
    }

    const handleClickDelete = (item) => {
        setGroupItem(item);
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        props.deleteGroup(groupItem.id);
        setShowConfirmModal(false);
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    const onSelectChange = (e) => {
        setType(e.target.value)
        setSelectChanged(true)
    }

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setEndDate(date)
    }

    const resetFilters = () => {
        setType('Type');
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(0);
        setSelectChanged(false);
        fetchGroups(0);
    };

    const fetchGroups = (page) => {
        let groupFilterForm = {
            type: type === 'Type' ? null : type,
            startDate: startDate,
            endDate: endDate,
            pageNumber: page + 1,
            pageSize: PAGE_SIZE,
            sort: SORT
        }
        props.getListGroups(groupFilterForm)
    }

    useEffect(() => {
        fetchGroups(currentPage);
    }, [currentPage, props.updateCompleted, props.createdGroupSuccessfully, props.groupDeleted, type, startDate, endDate]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    // Calculate total members function
    const calculateTotalMembers = () => {
        return props.listGroups.reduce((total, group) => total + group.totalMember, 0);
    }

    return (
        <div className="list-groups">
            <div className='content'>
                {props.formGroupIsOpen && <FormGroupInfo groupItem={groupItem} buttonText={buttonText} />}

                <Stack direction="row" alignItems="center" spacing={1}>
                    <FormControl
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 150, border: "1px solid lightgray" }}
                    >
                        <Select
                            labelId="type-select-label"
                            value={type}
                            label="Select TYPE"
                            displayEmpty
                            onChange={onSelectChange}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return <span style={{ color: '#999' }}>Select TYPE</span>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select Type
                            </MenuItem>
                            <MenuItem value="BACKEND">BACKEND</MenuItem>
                            <MenuItem value="FRONTEND">FRONTEND</MenuItem>
                            <MenuItem value="FULLSTACK">FULLSTACK</MenuItem>
                        </Select>
                    </FormControl>

                    <DatePicker
                        className='form-control-filter'
                        selected={startDate}
                        onChange={handleStartDateChange}
                        name="startDate"
                        dateFormat="dd/MM/yyyy"
                        placeholderText='Start Date'
                    />

                    <DatePicker
                        className='form-control-filter'
                        selected={endDate}
                        onChange={handleEndDateChange}
                        name="endDate"
                        dateFormat="dd/MM/yyyy"
                        placeholderText='End Date'
                    />

                    <Tooltip
                        title="Refresh"
                        placement="top"
                        arrow
                    >
                        <Button
                            size="large"
                            onClick={resetFilters}
                            variant="contained"
                            color="primary"
                            startIcon={<MdRefresh />}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                            }}
                        >
                            Refresh
                        </Button>
                    </Tooltip>

                    <Tooltip
                        title="Create group"
                        placement="top"
                        arrow
                    >
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            startIcon={<MdAddToPhotos />}
                            onClick={handleClickAddGroup}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                            }}
                        >
                            Create group
                        </Button>
                    </Tooltip>
                </Stack>

                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: '1px solid #eee',
                        mt: 2
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f6fa' }}>
                                <TableCell><b>ID</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Type</b></TableCell>
                                <TableCell><b>Total Member</b></TableCell>
                                <TableCell><b>Created Date</b></TableCell>
                                <TableCell align="center"><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.listGroups && props.listGroups.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    hover
                                    sx={{ '&:hover': { backgroundColor: '#f9fbff' } }}
                                >
                                    <TableCell>
                                        {index + 1 + currentPage * PAGE_SIZE}
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.type}
                                    </TableCell>
                                    <TableCell>
                                        {item.totalMember}
                                    </TableCell>
                                    <TableCell>
                                        {item.createdAt}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="success"
                                                startIcon={<MdEdit />}
                                                onClick={() => handleClickEdit(item)}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="error"
                                                startIcon={<MdOutlineDeleteForever />}
                                                onClick={() => handleClickDelete(item)}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                    {/* Total Members */}
                    <Typography
                        variant="body2"
                        sx={{ mb: 1.5, fontWeight: 500 }}
                    >
                        Total Members:&nbsp;
                        <Typography component="span" color="primary" fontWeight={600}>
                            {calculateTotalMembers()}
                        </Typography>
                        &nbsp;of page {currentPage + 1}
                    </Typography>

                    {/* Pagination */}
                    <div className='paging'>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={props.totalPagesListGroups}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>

                <ConfirmDeleteModal
                    show={showConfirmModal}
                    onClose={handleCloseModal}
                    onConfirm={confirmDelete}
                    groupName={groupItem.name}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        formGroupIsOpen: state.view.formGroupIsOpen,
        isLoading: state.userInfo.isLoading,
        listGroups: state.userInfo.listGroups,
        totalPagesListGroups: state.userInfo.totalPagesListGroups,
        updateCompleted: state.userInfo.updateCompleted,
        createdGroupSuccessfully: state.userInfo.createdGroupSuccessfully,
        groupDeleted: state.userInfo.groupDeleted
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleFormGroup: (isOpen) => {
            dispatch(viewActions.toggleFormGroup(isOpen))
        },
        getListGroups: (groupFilterForm) => {
            dispatch(userActions.getListGroups(groupFilterForm))
        },
        deleteGroup: (id) => {
            dispatch(userActions.deleteGroup(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGroups)
