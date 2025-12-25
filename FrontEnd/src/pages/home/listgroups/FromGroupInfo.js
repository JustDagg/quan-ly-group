import styled from 'styled-components'
import { connect } from 'react-redux'
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { MdOutlineClose } from 'react-icons/md'

import viewActions from "../../../actions/viewActions"
import userActions from '../../../actions/userActions'
import FromGroup from '../../../_sharecomponents/formgroup/FromGroup'

const FormGroupInfo = (props) => {
    const [groupItem, setGroupItem] = useState(props.groupItem)

    useEffect(() => {
        setGroupItem(props.groupItem)
    }, [props.groupItem])

    const handleClickIconClose = () => {
        props.toggleFormGroup(false)
    }

    const _onChangeInput = (e) => {
        setGroupItem({ ...groupItem, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (props.buttonText === 'Create') {
            props.creatingGroup(groupItem)
        }
        else {
            props.updateGroup(groupItem)
        }
    }

    return (
        <div className={props.className}>
            <form className="form-group-info">
                <div className="icon-close">
                    <MdOutlineClose
                        fontSize="20px"
                        onClick={handleClickIconClose}
                    />
                </div>

                <h3>
                    GROUP ACTION FORM
                </h3>

                <FromGroup>
                    <Box>
                        <Typography
                            variant="caption"
                            sx={{ mb: 0.5, display: 'block', color: 'text.secondary' }}
                        >
                            Name
                        </Typography>

                        <TextField
                            variant="filled"
                            size="small"
                            fullWidth
                            name="name"
                            value={groupItem.name || ''}
                            onChange={(e) =>
                                _onChangeInput({
                                    target: {
                                        name: 'name',
                                        value: e.target.value,
                                    },
                                })
                            }
                        />
                    </Box>
                </FromGroup>

                <FromGroup>
                    <FormControl
                        size="small"
                        sx={{ border: "1px solid lightgray" }}
                        fullWidth
                    >
                        <Select
                            displayEmpty
                            value={groupItem.type || ''}
                            name="type"
                            onChange={(e) =>
                                _onChangeInput({
                                    target: {
                                        name: 'type',
                                        value: e.target.value,
                                    },
                                })
                            }
                            renderValue={(selected) => {
                                if (!selected) {
                                    return <span style={{ color: '#999' }}>Select Type</span>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select Type
                            </MenuItem>
                            <MenuItem value="FRONTEND">FRONTEND</MenuItem>
                            <MenuItem value="BACKEND">BACKEND</MenuItem>
                            <MenuItem value="FULLSTACK">FULLSTACK</MenuItem>
                        </Select>
                    </FormControl>
                </FromGroup>

                <FromGroup>
                    <Box>
                        <Typography
                            variant="caption"
                            sx={{ mb: 0.5, display: 'block', color: 'text.secondary' }}
                        >
                            Created Date
                        </Typography>

                        <TextField
                            variant="filled"
                            size="small"
                            fullWidth
                            name="createdAt"
                            value={groupItem.createdAt || ''}
                            onChange={(e) =>
                                _onChangeInput({
                                    target: {
                                        name: 'createdAt',
                                        value: e.target.value,
                                    },
                                })
                            }
                        />
                    </Box>
                </FromGroup>

                <FromGroup>
                    <Box>
                        <Typography
                            variant="caption"
                            sx={{ mb: 0.5, display: 'block', color: 'text.secondary' }}
                        >
                            Total Member
                        </Typography>

                        <TextField
                            variant="filled"
                            size="small"
                            fullWidth
                            name="totalMember"
                            value={groupItem.totalMember || ''}
                            onChange={(e) =>
                                _onChangeInput({
                                    target: {
                                        name: 'totalMember',
                                        value: e.target.value,
                                    },
                                })
                            }
                        />
                    </Box>
                </FromGroup>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        mt: 3,
                        textTransform: 'none',
                        borderRadius: 2,
                    }}
                >
                    {props.buttonText}
                </Button>
            </form>
        </div>
    )
}

const StyledFormGroupInfo = styled(FormGroupInfo)`
    .form-group-info {
        width: 500px;
        margin: auto;
        border: 1px solid rgba(0, 0, 0, .15);
        padding: 30px 60px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgb(0 0 0  / 14%);
        position: relative;
    }

    .icon-close {
        position: absolute;
        top: 6px;
        right: 6px;
        cursor: pointer;
    }

    h3 {
        text-align: center;
    }

    .form-group-info .btn-submit {
        display: flex;
        justify-content: flex-end;
    }

    .form-group-info .btn-submit button {
        background: transparent;
        border: 1px solid #39f;
        outline: none;
        padding: 5px 8px;
        border-radius: 3px;
        cursor: pointer;
    }

    .form-group-info .btn-submit button:hover {
        color: orange;
    }
`
const mapStateToProps = (state) => {
    return {
        closeFormGroup: state.userInfo.closeFormGroup
    }
}

const mapDispathToProps = (dispatch, props) => {
    return {
        toggleFormGroup: (isOpen) => {
            dispatch(viewActions.toggleFormGroup(isOpen))
        },
        creatingGroup: (groupItem) => {
            dispatch(userActions.creatingGroup(groupItem))
        },
        updateGroup: (groupItem) => {
            dispatch(userActions.updateGroup(groupItem))
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(StyledFormGroupInfo)