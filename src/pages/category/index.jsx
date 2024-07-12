import { Button } from "@mui/material";
import { Pagination } from '@mui/material'
import { CategoryModal } from "@modal";
import { CategoryTable } from "@ui";
import { useEffect, useState } from "react";
import { category } from "../../service";

const Index = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [params, setParams] = useState({
    page: 1,
    limit: 5
  })

  const fetchCategories = async () => {
    const response = await category.get(params)
    if (response.status === 200 && response?.data?.categories) {
      setData(response?.data?.categories)
      let total = Math.ceil(response?.data?.total_count / params.limit)
      setCount(total)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [params])

  const handlePageChange = (event, value) => {
    setParams({
      ...params,
      page: value
    })
  };

  return (
    <>
      <CategoryModal open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button 
            variant="contained" 
            onClick={() => setOpen(true)}
            sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "gray" } }}
          >
            ADD
          </Button>
        </div>
        <CategoryTable data={data} />
        <Pagination count={count} page={params.page} onChange={handlePageChange} />
      </div>
    </>
  );
};

export default Index;
