import React from 'react';
import { Pagination } from 'antd';

const Pagination = ({currentPage, totalResults, handlePageChange}) =>{
    return (
        <Pagination
        current={currentPage}
        total={totalResults} 
        onChange={handlePageChange}
        pageSize={20} 
        align="center" 
        showSizeChanger={false}
        />
    );
};

export default Pagination;