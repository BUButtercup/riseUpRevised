import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { ThemeProvider } from '@mui/material/styles';
// import { theme } from './components/ThemeProvider'
import useAuth from "./utils/hooks/useAuth";
import RequireAuth from './components/RequireAuth'
import Container from '@mui/material/Container';
import PublicLanding from "./pages/PublicLanding";
import UserLanding from "./pages/UserLanding";
import Navbar from "./components/Navbar";
import Horoscope from "./components/Horoscope";
import Crisis from "./pages/Crisis";
import About from './pages/About';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForumHome from './pages/ForumHome'
import ForumTopic from './pages/ForumTopic'
import PostNew from './pages/PostNew'
import PostPage from './pages/PostPage'
import PostEdit from "./pages/PostEdit";
import PostsAll from "./pages/PostsAll";


import './App.css';


function App() {
  const { auth, setAuth } = useAuth();
  return (
    <Container maxWidth='xl' className="app">
      <Navbar />

      <Routes>
        {/* <Route path='/' element={<App />}> */}

          {/* public routes */}
          <Route path="/" element={
            auth.token ?
            <UserLanding />
            :
            <PublicLanding />
          } />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/horoscope' element={<Horoscope />} />
          <Route path='/crisis' element={<Crisis />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/terms' element={<TermsCond />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/cookie' element={<CookiePolicy />} />
          <Route path={`/MotPages`} element={<MotPage />} />
          <Route path={`/Phil`} element={<Phil />} />
          <Route path={`/InspirPage`} element={<InspirPage />} />
          <Route path={`/AspirationPage`} element={<Asp />} />  */}


          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={['user', 'mod', 'admin']} />}>
            <Route path={`/profile`} element={<UserLanding />} />
           
            <Route path='/forums' element={<ForumHome />} />
            <Route path='/forums/:topic' element={<ForumTopic />} />
            <Route path='/forums/post/:id' element={<PostPage />} />
            <Route path='/forums/edit/post/:id' element={<PostEdit />} />

            <Route path='/forums/post/:topic/new' element={<PostNew />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['mod']} />}>
            <Route path='/allposts' element={<PostsAll/>}/>
          </Route>
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            {/* <Route path='/adduser' element={<AddUser />} /> */}
          </Route>

          {/* error route */}
          {/* <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<Missing />} /> */}
        {/* </Route> */}

      </Routes>

    </Container>
  );
}

export default App;
