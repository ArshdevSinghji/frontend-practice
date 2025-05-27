import "../page/style.css"

const ProductCard = ({
    title, image, brand, price
}) => {
    return(
        <div className = "product">
            <img src = {image} alt = {title}/>
            <div className="product-brand">{brand}</div>
            <div className="product-detail">
                <div>{title}</div>
                <div>${price}</div>
            </div>
        </div>
    )
}

export default ProductCard