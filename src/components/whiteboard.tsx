
import Room from './Room';
import { Canvas } from './Canvas';

function Whiteboard() {

    return (

        <section className="whiteboard-container">

                <Room>
                    <Canvas />
                </Room> 
        </section>
    )
}

export default Whiteboard;