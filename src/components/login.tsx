import { Button } from "@radix-ui/themes";
import { FiUser } from "react-icons/fi";
import { GrGoogle } from "react-icons/gr";
import { MdOutlineDraw } from "react-icons/md";

import useStore from "../ZustandStore";
import { useNavigate } from "react-router";

import Toastify from 'toastify-js';

function Login() {

    const navigate = useNavigate();
    //const setLoggedin = useStore((state: any) => state.setLoggedin);
    const setUserProfile = useStore((state: any) => state.setUserProfile);
    const setGuest = useStore((state: any) => state.setGuest);


 const handleGuestLogin = () => {

  async function StartAsGuest() {

    const generateRandomNumber = Math.floor(Math.random() * 1_000_000);
    const generatedPlaceholder = `https://api.dicebear.com/10.x/fun-emoji/svg?seed=${generateRandomNumber}`;


    try {
      const response = await fetch(generatedPlaceholder);

      if (!response) { 
        throw new Error('Error! cannot get avatar');
      }

      setUserProfile({

      id: 'GuestId',
      name: 'Guest' + generateRandomNumber,
      email: 'Guest@Guest.com',
      password: null,
      email_verified: false,
      picture: generatedPlaceholder,
    });


    } 
    catch(error) {
     console.log(error);
    }

  }

    StartAsGuest();
    setGuest(true);

            Toastify({
              
            text: 'Sucsessfully Logged in as guest.',
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
                display: 'flex',
                bacgkround: 'none !important',
                backgroundColor: 'var(--color-background) !important',
                borderRadius: '15px',
                boxShadow: 'none !important',
                color: 'white',
                marginTop: '10px',
            },

        }).showToast();

    navigate('/Dashboard');
    }

  return (
    <section className="login-container">

      <div className="login">

      <div className="login-box"> 

      <span className="login-header">
			<div className="logo"> 
      <MdOutlineDraw /> 
      </div> 
       <span> Login to start creating together.. </span>
		  </span>

       <div className="login-buttons">

        <Button> <GrGoogle/> Sign in with Google </Button>

        <p> or </p>

        <Button variant="outline"
        onClick={handleGuestLogin}
        > <FiUser/>  Create a temporary board as a Guest </Button>
        
       </div>

        </div>
      </div>

    </section>
  )
}

export default Login;
