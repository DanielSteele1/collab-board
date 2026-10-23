
import { BiTrash } from "react-icons/bi";
import type {WhiteboardCollection} from "../Types";
import { Link } from "react-router";

import { Table } from '@radix-ui/themes';
import { FaArrowRight } from "react-icons/fa";

import {formatDistance} from 'date-fns';

interface WhiteboardCardProps {

    boards: WhiteboardCollection;
    onDelete: (boardId: string) => void;
}

function WhiteboardTable({boards, onDelete}:WhiteboardCardProps){
    return (
        <div className="whiteboard-table">

            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell className="table-column-title"> Color </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="table-column-title"> Title </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="table-column-title"> Description </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="table-column-title"> Date Created </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {boards.map((board) => (
                    <Table.Row className="table-row" key={board.id}>
                        <Table.Cell> <div className="table-color" style={{backgroundColor: board.color}}> </div> </Table.Cell>
                        <Table.Cell className="table-title"> {board.title} </Table.Cell>
                        <Table.Cell className="table-description"> {board.description} </Table.Cell>
                        <Table.Cell className="table-date"> {formatDistance(new Date(board.createdAt), new Date(), {addSuffix: true})} </Table.Cell>
                        <Table.Cell>
                            <Link className="table-link" to={board.boardURL}> <button> Open Whiteboard <FaArrowRight /></button> </Link>
                        </Table.Cell>
                        <Table.Cell>
                        <button className="table-delete" onClick={() => onDelete(board.id)}> <BiTrash/> Delete </button>
                        </Table.Cell>
                    </Table.Row>
                    ))}
                   
                </Table.Body>

            </Table.Root>

          </div>
    );
}

export default WhiteboardTable;