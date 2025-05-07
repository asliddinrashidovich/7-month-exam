import ProductCards from "./cards"
import Categoryies from "./categoryies"

function ProductsSection() {
//   const [age, setAge] = useState('default-sorting');
//   const [value, setValue] = useState([0, 1000]);
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const dispatch = useDispatch()

//   // useSearchparams

//   // sort by category
//   const [searchParams, setSearchParams] = useSearchParams()
//   const categoryBy  = searchParams.get('category') || 'house-plants'
  
//   const updateParams = (categorytype) => {
//     searchParams.set('category', categorytype)
//     setSearchParams(searchParams)
//     handleClose()
//   }

//   // sort by type
//   const typeSort  = searchParams.get('type') || 'all-plants'
  
//   const updateTypeSort = (sortType) => {
//     searchParams.set('type', sortType)
//     setSearchParams(searchParams)
//   }
  
//   // sort by sort
//   const sortBy  = searchParams.get('sort') || 'default-sorting'
  
//   const updateSortBy = (sort) => {
//     setAge(sort);
//     searchParams.set('sort', sort)
//     setSearchParams(searchParams)
//   }
  
//   // filter by amount
//   const rangeMin  = searchParams.get('range_min') || 0
//   const rangeMax  = searchParams.get('range_max') || 1000
  
//   const handleSliderFilter = () => {
//     searchParams.set('range_min', value[0])
//     searchParams.set('range_max', value[1])
//     setSearchParams(searchParams)
//     handleClose()
//   }
  
  
    // // getting APIs
    // const fetchCategory = async () => {
    //   const res = await axios.get(`https://green-shop-backend.onrender.com/api/flower/category?access_token=6506e8bd6ec24be5de357927`);
    //   return res.data;
    // };
    // const fetchDiscount = async () => {
    //   const res = await axios.get(`https://green-shop-backend.onrender.com/api/features/discount?access_token=6506e8bd6ec24be5de357927`);
    //   return res.data;
    // };
    // const fetchFlowersByCategory = async ({categoryBy, typeSort, sortBy, rangeMin, rangeMax}) => {
    //   const res = await axios.get(`https://green-shop-backend.onrender.com/api/flower/category/${categoryBy}?access_token=6506e8bd6ec24be5de357927&type=${typeSort}&sort=${sortBy}&range_min=${rangeMin}&range_max=${rangeMax}`);
    //   return res.data;
    // };

    // const { data: categoryData, isLoading: loading1} = useQuery({
    //   queryKey: ["category"],
    //   queryFn: fetchCategory,
    // });
    // const { data: discountData, isLoading: loading2 } = useQuery({
    //   queryKey: ["discount"],
    //   queryFn: fetchDiscount,
    // });
    // const { data: flowersData , isLoading: loading3} = useQuery({
    //   queryKey: ["flowers", {categoryBy, typeSort, sortBy, rangeMin, rangeMax}],
    //   queryFn: () => fetchFlowersByCategory({categoryBy, typeSort, sortBy, rangeMin, rangeMax}),
    // });

    // function handleAddToCard(itemData) {
    //   toast.success('Added to you shopping card!')
    //   dispatch(addDataToShopping(itemData))
    // }

    // const handleChangeSlider = (event, newValue) => {
    //   setValue(newValue);
    // };
    // console.log(flowersData)
    // // if(loading1, loading2, loading3) {
    // //     return (
    //         <CardSkleton/>
    //     )
    // }
  return (
    <div className="max-w-[1200px] mx-auto flex gap-[50px] px-[20px] sm:px-[40px]">
        <Categoryies/>
        <ProductCards/>
    </div>
  )
}

export default ProductsSection