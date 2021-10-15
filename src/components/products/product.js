import { useParams } from "react-router";
import { useState, useEffect} from "react";
import { commerce } from '../../lib/commerce';


function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        commerce.products.retrieve(productId).then(result => {
            console.log(result);
            setProduct(result);
        });
    }, [productId]) 

   
    return(
        
        <div>  
            {  product &&
                <div>                  
            <h2>{product.name}</h2>
        
            <h3>price: {product.price.formatted_with_symbol}</h3>

            <div>
{/*                 <img src={product.image.url} alt={product && product.name} height="300" /> 
                <img src={product.assets[1].url} alt='image1' height="300" />  */}
                {
                    product.assets.map((picture) =>{

                    return  <img key={picture.id} src={picture.url} alt={picture.id} height="300" />         
                    })

                } 
               
            </div> 
            
            <div>
                <h3>Description:</h3> 
                {product && product.description.replace(/(<([^>]+)>)/ig, ' ')} 
            </div>  


            </div>  
            } 
        </div>
    )
}
export default Product;