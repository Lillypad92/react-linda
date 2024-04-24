import React, {useState, useEffect} from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import musicService from '../services/music-group-service';
import ListOfAlbum from '../components/album-list';

export function FetchAlbumsWebApi() {
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
    
    const [serviceData, setServiceData] = useState();
    const [currentPage, setCurrentPage] = useState(0);
  
    const itemsPerPage = 10; 
  
    useEffect(() => {
      readWebApi();
    }, [currentPage, service]); 
  
    const readWebApi = async () => {
      const data = await service.readMusicGroupsAsync(currentPage);
      setServiceData(data);
    };
    const handlePaginationClick = (page) => {
      setCurrentPage(page);
      
    };
  
    const totalPages = Math.ceil(serviceData?.totalItems / itemsPerPage); 
    const visiblePages = Math.min(totalPages, 10); 
  
    return (
      <>
        <ListOfAlbum serviceData={serviceData} />
  
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