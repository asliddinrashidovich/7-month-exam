import ProductCards from "./cards"
import Categoryies from "./categoryies"

function ProductsSection() {
  return (
    <div className="max-w-[1200px] mx-auto flex gap-[50px] px-[20px] sm:px-[40px]">
        <Categoryies/>
        <ProductCards/>
    </div>
  )
}

export default ProductsSection