
import { Box, makeStyles, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles({
    banner: {
        backgroundImage: `url(${'https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg'})`,
        width: '100%',
        height: '50vh',
        backgroundPosition: 'left 0px bottom 0px',
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

const About = () => {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.banner}></Box>
            <Box className={classes.wrapper}>
                <Typography variant="h3">Rudra</Typography>
                <Typography variant="h5" className={classes.text}>This Website is developed for sharing the ideas among Global level <br />
                    If you are interested, to write a blog you can use our Platform to do so.
                </Typography>
                <Typography variant="h5" className={classes.text}>
                   Dont forget to Supoort us and author on this website.
                </Typography>
            </Box>
        </Box>
    )
}

export default About;