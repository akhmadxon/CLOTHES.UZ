import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PersonIcon from '@mui/icons-material/Person';
const routes = [
  {
    path: "/",
    content: "Category",
    icon: <CategoryIcon />,
  },
  {
    path: "/products",
    content: "Products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    path: "/workers",
    content: "Workers",
    icon: <PersonIcon />,
  },
];

export default routes;
