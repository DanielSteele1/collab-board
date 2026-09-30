import { Button } from "@radix-ui/themes";
import { AiOutlineBlock } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { GrGoogle } from "react-icons/gr";

function Login() {

  return (
    <section className="login-container">

      <div className="login">

      <div className="login-box"> 

      <span className="login-header">
			<div className="logo"> 
      <AiOutlineBlock />  
      </div> 
       Login to start creating together..
		  </span>

       <div className="login-buttons">

        <Button> <GrGoogle/> Sign in with Google </Button>

        <p> or </p>

        <Button variant="outline"> <FiUser/>  Create a temporary board as a Guest </Button>
        
       </div>

        </div>
      </div>

    </section>
  )
}

export default Login;
