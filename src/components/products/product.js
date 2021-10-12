import { useParams } from "react-router";
import { useState, useEffect} from "react";
// import {stripHtml} from "string-strip-html";
import { commerce } from '../../lib/commerce';



function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState([]);
 //   const {prodDespcription} = stripHtml(product.description);




    useEffect(() => {
        commerce.products.retrieve(productId).then(result => {
            console.log(result);
            setProduct(result);
        });

    }, [productId]) 

    return(
        <div>
           
            <h2>{product.name}</h2>
{/*             <div>
                <img src={product.image.url} alt={product.name} height="300" /> 
            </div> */}
            
            <div>Description: {product.description}</div>
        </div>
    )


}
export default Product;