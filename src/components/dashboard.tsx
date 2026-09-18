



function Dashboard() {

  return (
    <section className="dashboard-container">

      <div className="dashboard">
        <h1> Here, the user will be able to create, sort, filter and delete a whiteboard.</h1>

        <h2> Using liveblocks, the idea is to build a real time whiteboard where users can drag an element, or resize something,
          and basically someone else also inside that board can see it being moved in real time. 
        </h2>

        <h2> hopefully, liveblocks will let us do the core feature, and then we can build a dashboard around it.</h2>

        <h2> with the canvas, making lots of tools such as resizing, brush sizes, dragging and saving that element into place,
           as well as having different options like test sizes etc will be the biggest challange. 
        </h2>

        <h2> we'll use zustand for client and server syncing, and for the server, we'll use Supabase. </h2>

        <h2> 1. priority is to get the real time feature working  FIRST. dont spend 5 days making a frontpage.</h2>

        <h2> and remember use Radix UI for most things like signing up, and just use Supabase Auth for the Auth.  dont need to overcomplicate it.</h2>

        <ul className="notes-list">
          <li>
            <h2> So to summarise: use Liveblocks to implement the real time features. Whiteboard, Chat etc.</h2>
          </li>
          <li>
            <h2> Make sure to add in the dashboard around it. no account required for a temporary board but just use LocalStorage for them.</h2>
          </li>
          <li>
            <h2> For someone who logs in, let them make multiple boards. Zustand sync everything but also use localStorage for simplicity.</h2>
          </li>
        </ul>


      </div>

       

    </section>
  )
}

export default Dashboard;
