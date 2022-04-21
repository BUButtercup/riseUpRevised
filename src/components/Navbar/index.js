import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../utils/hooks/useAuth";
import './style.css'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/images/logo/riseup.png'
import { SignalCellularNull } from '@mui/icons-material';

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}



ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

export default function Navbar(props) {
    const { auth, setAuth } = useAuth();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();


  const logMeOut = () => {
    localStorage.removeItem("token");
    setAuth({
      userId: "",
      userName: "",
      role: "",
      token: "",
    });
    console.log("you're logged out!");
  };

  const settings = [{
    title: 'Profile',
    path: '/',
    task: null
}, {
    title: 'Account',
    path:'#',
    task: null
}, {
    title: 'Dashboard',
    path: '#',
    task: null
}, {
    title:'Logout',
    path:'/',
    task: logMeOut
}];


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            {/* <CssBaseline /> */}
            <ElevationScroll {...props}>
                <AppBar>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block' },
                                    }}
                                >
                                    {auth.token ? null
                                        :
                                        <div><MenuItem key="login" onClick={handleCloseNavMenu}>
                                            <Link to='/login'><Typography textAlign="center">Login</Typography></Link>
                                        </MenuItem>
                                            <MenuItem key="signup" onClick={handleCloseNavMenu}>
                                                <Link to='/signup'><Typography textAlign="center">Sign Up</Typography></Link>
                                            </MenuItem>
                                        </div>}

                                    <MenuItem key="horoscope" onClick={handleCloseNavMenu}>
                                        <Link to='/horoscope'><Typography textAlign="center">Horoscope</Typography></Link>
                                    </MenuItem>
                                    <MenuItem key="crisis" onClick={handleCloseNavMenu}>
                                        <Link to='/crisis'><Typography textAlign="center">Crisis Links</Typography></Link>
                                    </MenuItem>
                                    <MenuItem key="about" onClick={handleCloseNavMenu}>
                                        <Link to='/about'><Typography textAlign="center">About</Typography></Link>
                                    </MenuItem>

                                </Menu>
                            </Box>
                     
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80rem' }}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'flex' } }}
                                >
                                    <Link to='/'><img className="photoHeader" src={Logo} alt="rise up" /></Link>
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                                    {auth.token ?
                                        null
                                        :
                                        <><Link to='/login'><Button
                                            key='login'
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            Login
                                        </Button></Link>
                                            <Link to='/signup'><Button
                                                key='signup'
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: 'white', display: 'block' }}
                                            >
                                                Sign Up
                                            </Button></Link></>}
                                    <Link to='/horoscope'><Button
                                        key='horoscope'
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Horoscope
                                    </Button></Link>
                                    <Link to='/crisis'><Button
                                        key='crisis'
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Crisis Links
                                    </Button></Link>
                                    <Link to='/about'><Button
                                        key='about'
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        About
                                    </Button></Link>

                                </Box>
                            </Box>

                            {auth.token ? <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar sx={{backgroundColor:'rgb(240, 238, 195);', color:' rgb(248, 101, 2)', border:'3px solid  rgb(248, 101, 2)'}} alt={auth.userName} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                                            <Link to={setting.path} onClick={setting.task}><Typography textAlign="center">{setting.title}</Typography></Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box> : null}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </>
    );
}
