
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyle = makeStyles({
    image: {
        width: '100%',
        background: `url(${'http://mrtaba.ir/image/bg2.jpg'}) center/55% `,
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& :first-child': {
            fontSize: 70,
            color: '#FFFFFF',
            lineHeight: 1
        }
    }
})

const Banner = () => {
    const classes = useStyle();
    const url = 'https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_960_720.jpg';
    return (
        <>
            <Box className={classes.image}>
                <Typography>E-Article</Typography>
            </Box>
        </>
    )
}

export default Banner;