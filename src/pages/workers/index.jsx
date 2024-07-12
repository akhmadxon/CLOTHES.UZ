import { Pagination } from '@mui/material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { WorkersModal } from "@modal"
import { WorkersTable } from "@ui"
import { workers } from "@service"

const Index = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [params, setParams] = useState({
    page: 1,
    limit: 5
  })

  const fetchWorkers = async () => {
    const response = await workers.get(params)
    console.log(response);
    if (response.status === 200 && response?.data?.user) {
      setData(response?.data?.user)
      let total = Math.ceil(response?.data?.total_count / params.limit)
      setCount(total)
    }
  }

  useEffect(() => {
    fetchWorkers()
  }, [params])

  const handlePageChange = (event, value) => {
    setParams({
      ...params,
      page: value
    })
  }

  return (
    <>
      <WorkersModal open={open} handleClose={() => setOpen(false)} />
      <div className='w-full flex justify-end mb-3'>
        <Button variant="contained" onClick={() => setOpen(true)}
          sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "gray" } }}>Add</Button>
      </div>
      <WorkersTable data={data && data} />
      <Pagination count={count} page={params.page} onChange={handlePageChange} />
    </>
  )
}

export default Index
