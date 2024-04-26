import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import '../style/styles.css';


export default function ListOfAlbum(props)
{
    const albums = props.serviceData?.pageItems;
    const totalAmountAlbums = props.serviceData?.dbItemsCount;

    return (
        <>
        <ListGroup>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key="0" variant='info'>
                <div className="ms-2 me-auto">
                <h6>There are currently {totalAmountAlbums} music groups in the list.</h6>
                </div>
            </ListGroup.Item>
        </ListGroup>
        
        {albums?.map((albumItems) => (
            <ListGroup >
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={albumItems.albumId} data-rowitemid={albumItems.albumId} variant='info'>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold" >{albumItems.name}</div>
                        {albumItems.strGenre}
                    </div>
                    <Badge bg="primary" pill>
                        {albumItems.establishedYear}
                    </Badge>
                    <Button id="detailBtn" data-albumid={albumItems.musicGroupId} onClick={props.onClick}>Detail</Button>
                </ListGroup.Item>
            </ListGroup>
        ))}
     </>
    );
}