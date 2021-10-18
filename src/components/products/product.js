import { useParams } from "react-router";
import { useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import { commerce } from '../../lib/commerce';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';





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
        
        <Grid container direction='row'>
            
            {  product &&
                
                <Grid item sm={12} md={6}> 

                    <ImageGallery items={
                        product.assets.map((picture) =>{

                            return  {original: picture.url };         
                            })
                        
                    } showPlayButton={false}/>
                
{/*                     {
                        product.assets.map((picture) =>{
                        return  <img key={picture.id} src={picture.url} alt={picture.id} width="350" />         
                        })
                    }  */}

                </Grid>
            }
            

            
            { product &&

                <Grid item sm={12} md={6}>
                
                    <h2>{product.name}</h2>
                
                    <h3>Price: {product.price.formatted_with_symbol}</h3>
                                    
                    <h3>Description:</h3> 
                    {product.description.replace(/(<([^>]+)>)/ig, ' ')} 
                                
                </Grid> 
                     
            } 
            
        </Grid>   
        
    )
}
export default Product;