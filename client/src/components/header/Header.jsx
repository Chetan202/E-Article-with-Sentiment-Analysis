
import { AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

const useStyle = makeStyles({
    component: {
        background: '#FFFFFF',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '&  >*': {
            padding: 20,
            color: 'black',
            textDecoration: 'none'
        }
    }
})



const Header = () => {
    const classes = useStyle();

    const history = useHistory();

    const logout = () => {
        window.location.reload();
        history.push(`/`)
    }

    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link>LOGIN</Link>
                <Link onClick={logout}>LOGOUT</Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header;