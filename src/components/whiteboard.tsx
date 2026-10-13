
import Room from './Room';
import { Canvas } from './Canvas';
import { useParams } from 'react-router';
import FourOFour from './FourOFour';

function Whiteboard() {
    const { boardId } = useParams();

    if (!boardId) {
        return <FourOFour />;
    }

    return (

        <section className="whiteboard-container">

                <Room boardId={boardId}>
                    <Canvas />
                </Room> 
        </section>
    )
}

export default Whiteboard;