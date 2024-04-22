import React, {useState, useEffect} from 'react';
import { Outlet, useParams, useNavigate, useOutletContext } from 'react-router-dom';
import musicService from '../services/music-group-service';
import AlbumList from '../components/album-list';
import {SearchForm} from '../components/search-form';


export function AlbumsWebApi() {
    const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
    return (
      <div className="container px-4 py-4 text-start">
        <h2 className="pb-2 border-bottom">List of music bands</h2>
        <Outlet context={service} />
      </div>
    );
  }
  
    export function AlbumsWebApiList() {
    const service = useOutletContext();
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
  
    const itemsPerPage = 10; // Set the limit of items per page
  
    useEffect(() => {
      readWebApi();
    }, [currentPage, service]); // Update when currentPage or service changes
  
    const readWebApi = async () => {
      const data = await service.readMusicGroupsAsync(currentPage);
      setServiceData(data);
    };
  
    const onView = (id) => {
      navigate(`/albums-webapi/${id}`);
    };
  
    const handlePaginationClick = (page) => {
      setCurrentPage(page);
    };
  
    const totalPages = Math.ceil(serviceData?.totalItems / itemsPerPage); // Calculate total pages based on total items and items per page
    const visiblePages = Math.min(totalPages, 10); // Limit to 10 pages
  
    return (
      <>
        <AlbumList serviceData={serviceData} onClick={onView} />
  
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
                  className={`page-link ${currentPage === index ? 'active' : ''}`}
                  onClick={() => handlePaginationClick(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {/* Next Button */}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePaginationClick(currentPage + 1)}
                disabled={currentPage >= 9 || currentPage === totalPages - 1}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }

export function AlbumDetail(props) {

    const { searchMusicFilter } = useParams();
    const [albums, setAlbums] = useState({});
    const [filter, setFilter] = useState(searchMusicFilter || "");
  
    useEffect(() => {
      (async() => {
        const service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
        const data = await service.readAlbumsAsync(0, true, searchMusicFilter);
        setAlbums(data);
      })();
      setFilter(searchMusicFilter);
    }, [searchMusicFilter]);
  
    return (
      <SearchForm searchMusicFilter={filter} />
    );
}