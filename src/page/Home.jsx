import { use, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./style.css"
import Pagination from "../components/Pagination";
const Home = () => {
    const [currentPage, setCurrentPage] = useState(() => {
        const saved = localStorage.getItem("currentPage");
        return saved !== null ? Number(saved) : 0;
    });

    const [product, setProducts] = useState(() => {
        const savedProduct = localStorage.getItem("data");
        return (savedProduct) ? JSON.parse(savedProduct) : [];
    })

    const fetchData = async() => {
        const savedProduct = localStorage.getItem("data");
        if(savedProduct) return;

        const response = await fetch(import.meta.env.VITE_BASE_URL);
        console.log("API CALLED")
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data.products));
        setProducts(data.products);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage])

    const handlePrev = () => {
        setCurrentPage( (prev) => prev - 1 )
    }

    const handleNext = () => {
        setCurrentPage( (prev) => prev + 1 )
    }

    const handlePageChange = (n) => {
        setCurrentPage(n);
    }

    const PAGE_SIZE = 10;
    const totalProducts = product.length;
    const total = Math.ceil(totalProducts / PAGE_SIZE);
    const start = currentPage * 10;
    const end = start + 10;

  return (
    <div>
        <h1>Products Management</h1>
        <div className="container">
            <div className="product-container">
                {product.slice(start,end).map((item) => {
                    return (
                        <ProductCard key = {item.id} 
                            title = {item.title}
                            image = {item.thumbnail}
                            brand = {item.brand}
                            price = {item.price}
                        />
                    )
                })}
            </div>
        </div>
        <Pagination
            handlePrev = {handlePrev}
            handlePageChange = {handlePageChange}
            handleNext = {handleNext}
            currentPage= {currentPage}
            total = {total}
        />
    </div>

  )
}

export default Home