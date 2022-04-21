import React from 'react';
import {useNavigate} from 'react-router-dom'
import useAuth from "../../utils/hooks/useAuth";


const ProfBtnsMod = () => {
    const navigate = useNavigate();
    const {auth} = useAuth();

    return(
        <div>
            <button className="btnUseHome" onClick={() => navigate("/allposts")}>See All Posts</button>
        </div>
    );
}

export default ProfBtnsMod;