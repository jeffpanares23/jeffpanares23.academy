import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Modal, Input, Select } from 'antd';
import Axios from 'axios';
import { AiOutlineUser, AiOutlineGoogle, AiOutlineDeploymentUnit, AiOutlineSafety, AiOutlineQq } from "react-icons/ai";


// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
];




// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (user) => user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

    // added by jm

    const [name, setName] = useState([]);
    const [codename, setCodename] = useState([]);
    const [teamname, setTeamname] = useState([]);
    const [interest, setInterest] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [status, setStatus] = useState([]);
    const [role, setRole] = useState([]);

    const submitNewUser = () => {
        Axios.post('http://localhost:3001/insert', {
            Name: name,
            Usercodename: codename,
            Userteamname: teamname,
            Userinterest: interest,
            Useremail: email,
            Userpassword: password,
            Userstatus: status,
            Userrole: role,
        })
    }


    // useEffect(()=>{
    //     getTowns()
    //   },[]);

    //     // function  
    //   const getTowns = () => {
    //     Axios.get('http://localhost:3001/fetchTowns').then((Response) => {
    //         // setTownList(Response.data);
    //     })
    //   };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    // const handleOk = () => {
    //   setIsModalOpen(false);
    // };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const options = [
        {
            value: 1,
            label: 'Active',
        },
        {
            value: 0,
            label: 'Inactive',
        },
    ];

    const optionRole = [
        {
            value: 1,
            label: 'Administrator',
        },
        {
            value: 0,
            label: 'Student',
        },
    ];

    const optionInterest = [
        {
            value: 'Marketing',
            label: 'Marketing',
        },
        {
            value: 'Sales',
            label: 'Sales',
        },
    ];


    //  end of jm's code


    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title> User | Minimal UI </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={showModal} >
                        New User
                    </Button>
                </Stack>

                {/ add table here  /}






                {/ end table here /}
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>

            {/ added code by jm /}
            <Modal title="Create User" open={isModalOpen} onOk={submitNewUser} onCancel={handleCancel}>
                <Input size="large" placeholder="Full name" prefix={<AiOutlineUser />} onChange={(event) => { setName(event.target.value) }} /> <br /><br />
                <Input size="large" placeholder="Code name" prefix={<AiOutlineQq />} onChange={(event) => { setCodename(event.target.value) }} /> <br /><br />
                <Input size="large" placeholder="Team" prefix={<AiOutlineDeploymentUnit />} onChange={(event) => { setTeamname(event.target.value) }} /> <br /><br />
                <Input size="large" placeholder="Email" prefix={<AiOutlineGoogle />} onChange={(event) => { setEmail(event.target.value) }} /> <br /><br />
                <Input.Password prefix={<AiOutlineSafety />}
                    placeholder="input password"
                    visibilityToggle={{
                        visible: passwordVisible,
                        onVisibleChange: setPasswordVisible,
                    }} onChange={(event) => { setPassword(event.target.value) }} /><br /><br />
                <Select
                    placeholder="Select Interest"
                    prefix={<AiOutlineSafety />}
                    options={optionInterest}
                    value={interest}
                    onChange={setInterest}
                />{' '}
                <Select placeholder="Select Status"
                    prefix={<AiOutlineSafety />}
                    options={options}
                    value={status}
                    onChange={setStatus}
                /> {' '}
                <Select placeholder="Select Role"
                    prefix={<AiOutlineSafety />}
                    options={optionRole}
                    value={role}
                    onChange={setRole} />
                {/* <button onClick={() => {dispatch(addUser({id: 0, name: name, username: username }))}}>Add User</button > */}
            </Modal>
            {/ end of code by jm /}
        </>
    );
}





