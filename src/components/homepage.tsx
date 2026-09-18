
import { Link } from "react-router";
import TextType from "../react-bits/TextType";
import { AspectRatio, Card } from "@radix-ui/themes";

function Home() {

  return (
    <section className="homepage-container">

        <div className="landing-area">
            <h1 className="main-heading"> Real Time Collaborative Whiteboard </h1>
            <TextType 
            className="sub-heading"
            text={['Create Your Workspace', 'Plan Your Project','Collaborate with others']}>
            </TextType>

           <div className="cta-homepage">
            <Link to='./dashboard'> 
            <button>
              Sign up to start creating 
            </button>
             </Link>
             </div>
        </div>

        <div className="cards-container">
        <div className="cards">

          <Card className="card">

            <span className="card-title"> Create multiple private boards and start designing. </span>
             
             <AspectRatio ratio={16 / 9} >
              <img src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"

                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--radius-2)",
                }}

              />

             </AspectRatio>

          </Card>

          <Card className="card">

            <span className="card-title">  Share a unique code to start collaborating. </span>

             <AspectRatio ratio={16 / 9}>
               <img src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"

                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--radius-2)",
                }}

              />
             </AspectRatio>

          </Card>  

          <Card className="card">

            <span className="card-title"> Chat with others to discuss your ideas </span>

             <AspectRatio ratio={16 / 9}>
               <img src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"

                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--radius-2)",
                }}

              />
             </AspectRatio>


          </Card>

        </div>
        </div>

    </section>
  )
}

export default Home;
