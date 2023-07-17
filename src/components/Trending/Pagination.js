import React from 'react';
import Pagination from "@mui/material/Pagination";


export default function CustomPagination({ setPage, numOfPages = 5 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div style={{ 
      width: "100%", 
      display: "flex", 
      justifyContent: "center", 
      marginTop: 20 
      }}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          shape="rounded"
          size="large"
          color="secondary"
          variant="filled"
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "#2d3a93", 
              color: "white", 
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#ff00e9", 
            },
          }}
        />
    </div>
  );
}