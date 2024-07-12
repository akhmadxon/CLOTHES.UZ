import { Pagination, TextField, Button } from '@mui/material'
import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from 'react'
import { ProductModal, UploadFileModal } from "@modal"
import { ProductTable } from "@ui"
import { product } from "@service"

const Index = () => {
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openUploadFileModal, setOpenUploadFileModal] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  })

  const getData = async () => {
    try {
      const response = await product.get(params)
      if (response.status === 200 && response?.data?.products) {
        setData(response?.data?.products)
        let total = Math.ceil(response?.data?.total_count / params.limit)
        setCount(total)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getData()
  }, [params])

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value
    })
  };

  return (
    <div className="flex flex-col items-center my-5">
      <div className="w-[400px]">
        <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <Search className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
            ),
            disableUnderline: true,
            style: {
              padding: "4px 36px 4px 12px",
              fontSize: "12px",
              height: "35px",
            },
          }}
        />
      </div>
      <div className='w-full flex justify-end mb-3'>
        <Button variant="contained" onClick={() => setOpenProductModal(true)} sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "gray" } }}>Add</Button>
      </div>
      <UploadFileModal open={openUploadFileModal} data={data} handleClose={() => setOpenUploadFileModal(false)} />
      <ProductModal open={openProductModal} handleClose={() => setOpenProductModal(false)} />
      <ProductTable data={data} />
      <Pagination count={count} page={params.page} onChange={handleChange} />
    </div>
  )
}

export default Index
