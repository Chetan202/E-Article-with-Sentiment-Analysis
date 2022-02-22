
import { Box, makeStyles, Typography, Link } from '@material-ui/core';
import { GitHub, Instagram, Email } from '@material-ui/icons';

const useStyles = makeStyles({
    banner: {
        backgroundImage: `url(${'http://mrtaba.ir/image/bg2.jpg'})`,
        width: '100%',
        height: '50vh',
        backgroundPosition: 'left 0px top -100px',
        backgroundSize: 'cover'
    },
    wrapper: {
        padding: 20,
        '& > *': {
            marginTop: 50
        }
    },
    text: {
        color: '#878787'
    }
})


const Contact = () => {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.banner}></Box>
            <Box className={classes.wrapper}>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Typography variant="h5" className={classes.text}>
                    Reach out to US || send me an Email 
                    <Link href="mailto:pandeyrudresh74@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Typography>
            </Box>
        </Box>
    );
}

export default Contact;