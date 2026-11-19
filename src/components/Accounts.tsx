

import '../CSS/Accounts.css';

import useStore from "../ZustandStore"

function Accounts() {

 const userProfile = useStore((state: any) => state.userProfile);

    return(
        
        <div className='accounts-backing'> 
         <div className="accounts">

            <div className="user-name">   
                {userProfile.name}  <img src={userProfile.picture} />
            </div>

                 <div className='user-id'>
                 {userProfile.id}
            </div>

            <div className='user-email'> 
            {userProfile.email}
            </div>

         </div>
        </div>
        
    )
}

export default Accounts;