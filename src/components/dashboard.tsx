import { Link } from 'react-router'
import { BiPlus } from "react-icons/bi";
import { MdOutlineGridView, MdOutlinePassword } from "react-icons/md";
import { LuTable2 } from 'react-icons/lu';

function Dashboard() {

  return (
    <section className="dashboard-container">

      <div className="dashboard">
    
      <div className="dashboard-main">

        <div className="dashboard-welcome">

         <span className="heading"> Weclome, User!</span>
         <div className="dashboard-sub-heading"> Click on the options below to get started.  </div>
         <div className="dashboard-sub-heading"> Either create a new board, join an existing board or search through your current workspaces.</div>
         
         <div className="dashboard-toolbar">

          <div className='toolbar-left'>

          <button> <BiPlus /> Create a new workspace </button>
          <button> <MdOutlinePassword /> Join a workspace via a code </button>
          <input type="search" placeholder="Search for a whiteboard..." className="whiteboard-search" />

          </div>

          <div className="switch-views">
            <button className="grid-toggle">
             <MdOutlineGridView /> Grid 
            </button>

            <button className="table-toggle">
              <LuTable2 /> Table
            </button>
          </div>

         </div>

        </div>

      <div className="whiteboards">

        <div className="whiteboard-grid">

           <Link to='/whiteboard'>
          <div className="whiteboard">

            <div className="whiteboard-img">
            </div>

            <div className="whiteboard-title">

               <span> Example Board </span>
               <span className="whiteboard-subheading"> Example Board Description </span>

            </div>

          </div>
           </Link>
           
          <div className="whiteboard">

            <div className="whiteboard-img">
            </div>

            <div className="whiteboard-title">

               <span> Example Board </span>
               <span className="whiteboard-subheading"> Example Board Description </span>

            </div>

          </div>

          <div className="whiteboard">

            <div className="whiteboard-img">
            </div>

            <div className="whiteboard-title">

               <span> Example Board </span>
               <span className="whiteboard-subheading"> Example Board Description </span>

            </div>

          </div>

          <div className="whiteboard">

            <div className="whiteboard-img">
            </div>

            <div className="whiteboard-title">

               <span> Example Board </span>
               <span className="whiteboard-subheading"> Example Board Description </span>

            </div>

          </div>

          <div className="whiteboard">

            <div className="whiteboard-img">
            </div>

            <div className="whiteboard-title">

               <span> Example Board </span>
               <span className="whiteboard-subheading"> Example Board Description </span>

            </div>

          </div>

          <div className="whiteboard">

            <div className="whiteboard-img">
            </div>

            <div className="whiteboard-title">

               <span> Example Board </span>
               <span className="whiteboard-subheading"> Example Board Description </span>

            </div>

          </div>

          <div className="whiteboard">

            <div className="whiteboard-img">
            </div>

            <div className="whiteboard-title">

               <span> Example Board </span>
               <span className="whiteboard-subheading"> Example Board Description </span>

            </div>

          </div>

        </div>

       </div>

      </div>

      </div>


    </section>
  )
}

export default Dashboard;
