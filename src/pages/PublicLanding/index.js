import React, {useState} from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import HappyFlower from '../../assets/images/general/happyFlower.png'
import BfSf from '../../assets/images/general/ButterflySunflower.png'
import PLModal from '../../components/PLModal'
import { Button } from '@mui/material'


const ServiceList = () => {
  return (
    <>
    <ul style={{ marginTop: '10px', marginBottom: '0' }}>
      <li style={{ marginBottom: '10px' }}>
        Spontaneous inspiration
      </li>
      <li style={{ margin: '10px 0px' }}>
        Help organizing self-care
      </li>
      <li style={{ margin: '10px 0px' }}>
        A safe place to seek out the perspective and support of others
      </li>
    </ul>
    <p>Visit our <span style={{ textAlign: "center", color: "whitesmoke", fontFamily: "sansita swashed", textShadow: "1px 1px 5px black", fontSize: "1rem", cursor: 'pointer' }} >About Us</span> page to learn more!</p>
    </>
  )
}

const QuoteButtons = () => {
  const [open, setOpen] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState(null)
  const [dispText, setDispText] = React.useState(null)
  const [descriptionText, setDescriptionText] = React.useState(null)
  const handleOpen = (e) => {
    setOpen(true);
    setTitleValue(e.target.textContent)
    setDescriptionText(descriptions[e.target.id])
  }
  const handleClose = () => {
    setOpen(false)
  };

  const descriptions = [
    'Motivation is very important! Figuring out what motivates us and leveraging it helps us strive for change, learn new skills, set and achieve goals, and be more creative and curious about the world around us. It helps us build resiliency for when trouble finds us.',
    'Philosophy helps provide us with unique perspectives and different ways of thinking. In pondering philosophy, we can gain better insight into ourselves.',
    'Affirmation trains us to allow our minds to accept the good that others see in us. To create positive changes within ourselves, we need to accept both the good and the bad that lives within us all.',
    'Dreams and goals are the foundation of all positive change in our lives. If we cannot or have not taken the time to picture the change we want to make, it is very unlikely that we will ever achieve it.'
  ]

  return (
    <div style={{ width: '300px', height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-10px' }}>
      <div className='quote-btn' id={0} onClick={handleOpen}>
        <p id={0}>Motivation</p>
      </div>
      <div className='quote-btn' id={1} onClick={handleOpen}>
        <p id={1}>Philosophy</p>
      </div>
      <div className='quote-btn' id={2} onClick={handleOpen}>
        <p id={2}>Affirmation</p>
      </div>
      <div className='quote-btn' id={3} onClick={handleOpen}>
        <p id={3}>Aspirations</p>
      </div>
      <PLModal handleClose={handleClose} title={titleValue} description={descriptionText} setDispText={setDispText} dispText={dispText} open={open}/>
    </div>
  )
}

const ForumPic = () => {
  return(
  <div className="forum-pic"></div>
  )
}

const SCChecklist = () => {
  return (
    <div className="checklist-pic"></div>
  )
}

const CrisisLinks = () => {
  return(
    <div className="crisis-pic"></div>
  )
}

const HoroscopeBtn = (props) => {
  // const navigate=useNavigate();
  return(
    <Button onClick={(e)=>props.handleClick(e, 'horoscope')} sx={{fontFamily: 'Sansita Swashed, Verdana', color: 'whitesmoke', background: 'linear-gradient(rgb(174, 0, 255), black)', margin: '20px'}}>
      Horoscope
    </Button>
  )
}

const PublicLanding = () => {

  // const [open, setOpen] = React.useState(false);
  // const [titleValue, setTitleValue] = React.useState(null)
  // const handleOpen = (e) => {
  //   console.log('value',e.currentTarget.value)
  //   setOpen(true);
  //   setTitleValue(e.currentTarget.value)
  // }
  // const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const homeTopics = [
    {
      title: 'Who We Are & What We Do',
      description: 'Our goal is to bring people together to lift each other up. We provide:',
      component: <ServiceList />,
      path: '/about'
    },
    {
      title: 'Find Instant Inspiration',
      description: 'We like to provide a "spark" to light your fire in the form of quotes! Get a quick pick-me-up by clicking the buttons below and try out what we have to offer!',
      component: <QuoteButtons />
    },
    {
      title: 'Visit the Forums',
      description: 'The goal of RiseUp is to help you turn to positivity in troubled times. Visit the forums to seek or give different perspective and advice on life\'s problems.',
      component:<ForumPic/>,
    },
    {
      title: 'Prioritize Self-Care',
      description: 'Come try our tools to help you fill your emotional bucket!',
      component: <SCChecklist/>
    },
    {
      title: 'Find Support Now',
      description: 'If you would like to seek professional mental health care or are experiencing a crisis, access national crisis hotlines and links to find support from the nav bar above anywhere on the site.',
      component: <CrisisLinks/>,
      id:'crisis-box',
      path: '/crisis'
    },
    {
      title: 'Have Fun!',
      description: 'Having fun and enjoying each other are great ways to access the positivity within ourselves. We\'re adding new features all the time for our members to enjoy. Try out our Horoscope service to see what we mean!',
      component: <HoroscopeBtn />,
      path: '/horoscope'
    }
  ]

  return (
    <div style={{width: '100%'}}>
      <div style={{ marginTop: '7rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img className="flowerImg" src={HappyFlower} />
        <h1 style={{ textAlign: "center", color: "whitesmoke", fontFamily: "sansita swashed", textShadow: "1px 1px 7px slategrey", fontSize: "5rem" }} >Welcome!</h1>
        <img className="flowerImg" src={HappyFlower} />
      </div>
      <div style={{ margin: '0px', padding: '0px', width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {homeTopics.map(topic =>
          <div className="PHpost-cursor " key={topic.title} id={topic.id || null} onClick={()=>navigate(topic.path || '#')}>
            <div className="PHtitle-box">
              <span className="PHpostTitle">{topic.title}</span>
            </div>
            <p className="PHpostSub">{topic.description}</p>
            {topic.component}
          </div>
        )}
      </div>

      {/* <PLModal handleClose={handleClose} title={titleValue} open={open}/> */}
    </div>
  )
}

export default PublicLanding