import { BlogSection, FooterContact, FooterHeader, Hero, ProductsSection, Trends } from "../components"

function Homepage() {
    return (
      <>
        <Hero/>
        <ProductsSection/>
        {/* <Trends/>
        <BlogSection/> */}
        <FooterContact/>  
        <FooterHeader/>
      </>
    )
  }
  
  export default Homepage