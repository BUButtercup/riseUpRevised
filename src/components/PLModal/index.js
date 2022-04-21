import * as React from 'react';
import './style.css'
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// web.cjs is required for IE11 support
// import { useSpring, animated } from 'react-spring/web.cjs';
import API from '../../utils/API';

// const Fade = React.forwardRef(function Fade(props, ref) {
//   const { in: open, children, onEnter, onExited, ...other } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter();
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited();
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {children}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element,
//   in: PropTypes.bool.isRequired,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
// };

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(235, 211, 167)',
    border: '2px solid rgb(248, 101, 2)',
    boxShadow: 24,
    p: 4,
};

export default function PLModal(props) {
    // const [dispText, setDispText] = React.useState(null)
    const title = props.title
    React.useEffect(() => {
        const ranNum = Math.floor(Math.random() * 11 + 1)
        console.log('modal title', title)
        if (title === 'Motivation') {
            API.getMotiv(ranNum)
                .then(res => { props.setDispText(res.body) })
                .catch((err) => {
                    console.log(err);
                    alert(`There was an error: ${err}`);
                });
        } else if (title === 'Philosophy') {
            API.getPhil(ranNum)
                .then(res => { props.setDispText(res.body) })
                .catch((err) => {
                    console.log(err);
                    alert(`There was an error: ${err}`);
                });
        } else if (title === 'Affirmation') {
            API.getAff(ranNum)
                .then(res => { props.setDispText(res.body) })
                .catch((err) => {
                    console.log(err);
                    alert(`There was an error: ${err}`);
                });
        } else {
            API.getQuote(ranNum)
                .then(res => { props.setDispText(res.body) })
                .catch((err) => {
                    console.log(err);
                    alert(`There was an error: ${err}`);
                });
        }
    }, [props.open])

    return (
        <div>
            {/* <Button onClick={props.handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={props.open}
                onClose={props.handleClose}
                // closeAfterTransition
                BackdropComponent={Backdrop}
            // BackdropProps={{
            //     timeout: 500,
            // }}
            >
                {/* <Fade in={open}> */}
                <Box sx={style}>
                    <Typography className="plmodal-title" sx={{fontFamily: "Sansita Swashed, Verdana", fontSize: '2rem'}}>
                        {props.title || 'Title'}
                    </Typography>
                    <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                        {props.description || 'Description'}
                    </Typography>
                    <Typography className="plmodal-text" sx={{ mt: 2, fontSize:'1.5rem', fontFamily: 'Arima Madurai, Verdana' }}>
                        "{props.dispText || 'Loading...'}"
                    </Typography>
                </Box>
                {/* </Fade> */}
            </Modal>
        </div>
    );
}
