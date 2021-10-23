import {Grid, Card, CardActionArea, CardMedia} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    media: {
        height: 200,
    }
});

function ProductsImg ({product}) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea href={"http://localhost:3000/products/" + product.id}>
                    <CardMedia className={classes.media} image={product.image.url} ></CardMedia>
                </CardActionArea>
            </Card>
            {/* <a href={"http://localhost:3000/products/:" + product.id}><img src={product.image.url} alt={product.name} width="300" /></a>   */}            
           
        </Grid>
         
    ); 
}



function ProductList({prods}){
    

    return (
        <Grid container spacing={2}>
            {
                prods.map((product) => {
                return  <ProductsImg key={product.id} product={product} />       
                })
            }
        </Grid>
    ) 

}

export default ProductList;