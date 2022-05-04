import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {getPurchases} from '../features/purchases/purchaseSlice'
import {useSelector, useDispatch} from 'react-redux'
import { Button } from '@mui/material'
import {deletePurchase} from '../features/purchases/purchaseSlice'

const TableForm = () => {

  const [pageSize, setPageSize] = useState(10);
  
  const dispatch = useDispatch()
  const {purchase, purchases, isError, message} = useSelector((state) => state.purchases)

  useEffect(() => {

    if (isError) {
      console.log(message);
    }

    dispatch(getPurchases());

  }, [isError, dispatch, message]);

  const renderDetailsButton = () => {
    return (
        <strong>
            <Button
                className="delete"
                variant="contained"
                color="primary"
                size="small"
                style={{ margin: 0}}
                onClick={() => {dispatch(deletePurchase())}}
            >
                 X           
            </Button>
        </strong>
    )
}

    
  const columns = [
    {field: '_id', headerName: 'ID', sortable: 'false', filterable: 'false', disableColumnMenu: 'true', visibility: 'false'},
    {field: 'title', headerName: 'Title', editable: true},
    {field: 'producer', headerName: 'Producer'},
    {field: 'director', headerName: 'Director'},
    {field: 'platform', headerName: 'Platform'},
    {field: 'year', headerName: 'Year of Release', maxwidth: 75},
    {field: 'price', headerName: 'Price', maxwidth: 75},
    {field: 'length', maxwidth: 75},
    {field: 'requesterName', headerName: 'Requester Name'},
    {field: 'requesterEmail', headerName: 'Requester Email'},
    {field: 'requesterDepartment', headerName: 'Requester Department'},
    {field: 'notes', headerName: 'Notes/Comments'},
    {field: 'createdAt', headerName: 'Created On', type: 'date' },
    {
        field: 'col5',
        headerName: 'Edit',
        width: 150,
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true,
    },
    /*{
        field: 'col6',
        headerName: 'Delete',
        width: 150,
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true,
    },*/
  ];


  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid experimentalFeatures={{ newEditingApi: true }} getRowId={row => row._id}
        sx={{
          boxShadow: 1,
          border: 1,
          borderColor: 'lightgrey',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        initialState={{
          columns:{
            columnVisibilityModel: {_id: false}
          },
        pagination: {
          pageSize: 10,
          },
        }}
        rows={purchases}
        columns= {columns}
        components={{Toolbar: GridToolbar}}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  )
}

export default TableForm