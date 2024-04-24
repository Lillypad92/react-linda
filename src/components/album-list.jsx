import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import '../style/styles.css';


export default function ListOfAlbum(props)
{
    const albums = props.serviceData?.pageItems;
    return (
        <>
        {albums?.map((row, idx) => (
            <ListGroup>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={row.albumId} data-rowitemid={row.albumId}  variant='info'>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{row.name}</div>
                        {row.strGenre}
                    </div>
                    <Badge bg="primary" pill>
                        {row.establishedYear}
                    </Badge>
                </ListGroup.Item>
            </ListGroup>
        ))}
     </>
    );
}