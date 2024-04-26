import React, { useState, useEffect } from "react";
import {Outlet, useOutletContext, useNavigate, useParams,} from "react-router-dom";
import musicService from "../services/music-group-service";
import ListOfAlbum from "../components/album-list";
import { FormSearch } from "../components/form-search";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import '../style/styles.css';

/* Note to myself
  For future reference, breakup the code into smaller components.
*/

export function FetchAlbumsWebApi() {
  const service = new musicService(
    `https://appmusicwebapinet8.azurewebsites.net/api`
  );
  return (
    <div className="container px-4 py-4 text-start">
      <h2 className="pb-2 border-bottom">List of music bands</h2>
      <Outlet context={service} />
    </div>
  );
}

export function AlbumsWebApiList() {

  const navigate = useNavigate();
  const service = useOutletContext();

  const [searchFilter, setSearchFilter] = useState("");
  const [serviceData, setServiceData] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    readWebApi();
  }, [currentPage, service]);

  const readWebApi = async () => {
    const data = await service.readMusicGroupsAsync(
      currentPage,
      true,
      searchFilter
    );
    setServiceData(data);
  };
  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };
  const onView = (e) => {
    const id = e.currentTarget.dataset.albumid;
    navigate(`/albums-webapi/${id}`);
  };
  const onSave = async (e) => {
    const data = await service.readMusicGroupsAsync(
      currentPage,
      true,
      e.searchFilter
    );
    setServiceData(data);
    setSearchFilter(e.searchFilter);
  };

  const totalPages = Math.ceil(serviceData?.totalItems / itemsPerPage);
  const visiblePages = Math.min(totalPages, 10);

  return (
    <>
      <FormSearch onSave={onSave} />
      <ListOfAlbum serviceData={serviceData} onClick={onView} />

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* Previous Button */}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePaginationClick(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {/* Pagination Buttons */}
          {Array.from({ length: visiblePages }, (_, index) => (
            <li key={index} className="page-item">
              <button
                className={`page-link ${currentPage === index ? "active" : ""}`}
                onClick={() => handlePaginationClick(index)}>
                {index + 1}
              </button>
            </li>
          ))}
          {/* Next Button */}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePaginationClick(currentPage + 1)}
              disabled={currentPage >= 9 || currentPage === totalPages - 1}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export function AlbumWebApiView() {

  const service = useOutletContext();
  const { albumId } = useParams();
  const [album, setAlbum] = useState();

  useEffect(() => {
    async function readWebApi() {
      const data = await service.readMusicGroupAsync(albumId, false);
      setAlbum(data);
    }
    readWebApi(albumId);
  }, [service, albumId]);

  return (
    <div className="container px-4 py-4" id="home-text-area" bg="dark" data-bs-theme="dark">
      <div className="bg-body-tertiary p-5 rounded">
        <div className="col-sm-8 py-5 mx-auto">
          <h1 className="display-5 fw-normal">{album?.name}</h1>
          <p className="fs-5">Established year : {album?.establishedYear}</p>
          <Badge bg="primary" pill>
            {album?.strGenre}
          </Badge>

          <Accordion flush id="accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Albums</Accordion.Header>
              <Accordion.Body>
              {album?.albums && album.albums.map((albums) => (
                <h6>{albums.name}</h6>
              ))}          
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Artists</Accordion.Header>
              <Accordion.Body>
              {album?.artists && album.artists.map((artists) => (
                <h6>{`${artists.firstName} ${artists.lastName}`}</h6>
              ))}          
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
