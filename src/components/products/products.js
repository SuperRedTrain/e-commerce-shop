
function ProductList({prods}){

    const ProductImg = ({product}) => {
        return (
            //<img src={product.image.url} alt={product.name} height="300" />  
            <a href={"http://localhost:3000/:" + product.id}><img src={product.image.url} alt={product.name} height="300" /></a>  
        ) 
    }

    return (
        <div>

        {
            prods.map((product) => {
            return  <ProductImg key={product.id} product={product} />       
            })
        }

    </div>
    ) 

}

export default ProductList;