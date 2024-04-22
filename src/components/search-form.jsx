import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function SearchForm(props) {

  const [searchMusicGroupFilter, setSearchMusicGroupFilter] = useState(props.searchMusicGroupFilter || "");

  const handleChange = (e) => {
    const musicId = e.target.id;
    const value = e.target.value;
    let search = searchMusicGroupFilter;

    switch(musicId) {
      case 'search':
        search = value;
        break;
        default:
        return;
    }
    setSearchMusicGroupFilter(search);
  }
  const closeDetailModal = (e) => {
    props.setShow(false);

    if(props.onClose) props.onClose(e);
  }

  return (
    <>
    <p>Test</p>
    <p>Test two</p>
    <p>Test two</p>
    <p>Test four</p>
        <Modal show={props.show} onHide={closeDetailModal} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Search with modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
            <div className="col-md-7 col-lg-8">
              <form>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="name" className="form-label">Search</label>
                    <input type="text" className="form-control" id="search" value={searchMusicGroupFilter} onChange={handleChange}/>
                  </div>
                </div>
              </form>            
            </div>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDetailModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
      {/* <Button variant="primary" onClick={handleShow}>
        Details
      </Button>
      {albums?.map((row, idx) => (
        <Modal show={show} onHide={handleClose} key={row.albumId} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{row.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Genre : {row.strGenre}</p>
            <p>Established year: {row.establishedYear}</p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ))} */}


      {/* <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

