

import { BiArrowBack, BiX } from 'react-icons/bi';
import '../CSS/Accounts.css';

import useStore from "../ZustandStore"
import { MdDashboardCustomize, MdPassword } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';

import { Link, useNavigate } from 'react-router';
import Toastify from 'toastify-js';
import { Button } from '@radix-ui/themes';

function Accounts() {

const navigate = useNavigate();

 const userProfile = useStore((state: any) => state.userProfile);
 const setLoggedin = useStore((state: any) => state.setLoggedin);
 const setGuest = useStore((state: any) => state.setGuest);
 const setUserProfile = useStore((state: any) => state.setUserProfile);

 function signOut() {
    setGuest(false);
    setLoggedin(false);

    setUserProfile({
        id: '',
        name: '',
        email: '',
        email_verified: '',
        picture: '',
    });

    Toastify({
        text: 'Successfully Signed Out',
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        style: {
            display: 'flex',
            background: '#261938',
            borderRadius: '15px',
            color: 'white',
            marginTop: '10px',
        },

    }).showToast();
    navigate('/login');
 }

    return(
        
        <div className='accounts-backing'> 

         <div className="accounts">
            <Link to="/dashboard" className='back-to-dash'> <BiArrowBack/> Back to Dashboard   <MdDashboardCustomize /> </Link>

            <div className="user-info">

             <span className='user-name'> {userProfile.name} </span> 
                <img src={userProfile.picture} />
            
            <div className='user-id'>
             User ID: <span> {userProfile.id} </span>   
            </div>

            <div className='user-email'> 
             Email: <span> {userProfile.email}</span> 
            </div>

            </div>
            
            <div className='user-operations'>

                <h2> Account Operations </h2>

                <div className="accounts-name"> 
                <span> <BsPerson /> </span> 
                <input className='accounts-name-input' placeholder="Change Username" />
                </div>

                <div className="accounts-name"> 
                <span> <MdPassword /> </span>
                <input className='accounts-password-input' placeholder="Change Password" />
                </div>

                <Button 
                className='sign-out' 
                onClick={signOut}
                variant="soft"

                style={{

                    height: '40px',
                    borderRadius: '10px',
                    color: 'var(--text-color)',
                    fontSize: '1.0rem',
                    fontWeight: '400'

                }}
                > 
                Sign Out
                </Button>

                <button 
                className='delete-account' 
                style={{backgroundColor: '#fa2828' }}
                > 

                <BiX />
                Delete Account 
                </button>

            </div>

         </div>
        </div>
        
    )
}

export default Accounts;