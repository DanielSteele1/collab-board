import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { BiPlus } from 'react-icons/bi';
import { PiPlus } from 'react-icons/pi';
import { Button, TextField } from '@radix-ui/themes';
import { RxCross2 } from 'react-icons/rx';

interface CreateBoardModalProps {
  onCreate: (title: string, description: string) => void;
}

function CreateBoardModal({ onCreate }: CreateBoardModalProps) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const boardTitle = title.trim();
    if (!boardTitle) {
      return;
    }

    onCreate(boardTitle, description.trim());
    setTitle('');
    setDescription('');
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger > <BiPlus/> Create a new board </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay"/>
        <Dialog.Content className='modal'>
          <Dialog.Title className="modal-title"> Create a new whiteboard </Dialog.Title>
          <Dialog.Description className="modal-description"> Enter in the details below to create your new board. </Dialog.Description>
          <form className="fieldset" onSubmit={handleSubmit}> 

              <label className="label" defaultValue={"new-board"}> What should this board be called? </label>
              <TextField.Root maxLength={25} className="board-title-input" onChange={(e) => setTitle(e.target.value)} />

              <label className="label"> What will you use this board for? </label>
              <TextField.Root maxLength={50} className="board-description-input" onChange={(e) => setDescription(e.target.value)} />

            <div className="modal-buttons"> 
              <button type="submit" id="modal-button"> <PiPlus /> Create Board </button>
              <Button id="modal-button" variant="outline" > <RxCross2/> Exit </Button>
            </div>

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CreateBoardModal;
