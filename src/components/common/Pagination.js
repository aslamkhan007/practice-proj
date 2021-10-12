import React, { useState } from 'react'
import Pagination from "react-js-pagination";
/**
 * @author prabhakar sarkar 
 * @description This is pagination function 
 */
const Pagination1 = (props) => {
    const { paginationFun, allDataCount,pageLimit } = props
    const [activePage, setActivePage] = useState()
    // This is set pagination function
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
        paginationFun(pageNumber)
    }
    return (
        <div>
            <Pagination
                className="text-left"
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="Previous"
                nextPageText="Next"
                activePage={activePage}
                itemsCountPerPage={pageLimit}
                totalItemsCount={allDataCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default Pagination1
