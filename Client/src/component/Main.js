import React, { useEffect, useState } from "react";

import Styles from "./main.module.css";

import axios from "axios";

import Statistics from "./Statistics";


const Main = (props) => {

    const [products, setProducts]= useState([])

    const [isStatisticsOpen, setStatisticsOpen] = useState(false)

    const [page, setPage] = useState(0)

    // function to open statistics
    const statistics = () =>{

       setStatisticsOpen(prevState => !prevState)

    }
    // fucntion to go next page
    const nextPage = () =>{

        setPage((prevState)=>prevState+1)

        return;

    }
    // function to go previous page
    const previousPage = () =>{

        setPage((prevState)=>prevState-1)

    }

    useEffect(()=>{

        async function fetchProducts(){
            // fetching data from 3rd party API
            await axios.get("/roxiler.com/product_transaction.json")
            .then(res=>{
                    // seed the data into database also communicating with backend
                    axios.post("https://salemaster.onrender.com/seed_database",{products:res.data})
                    .then(console.log("Data added"))
                    .catch(err=>console.log(err))
                }
            )
            .catch(err=>console.log(err))   
        }

        fetchProducts()

    },[])

    useEffect(()=>{
        // getting the data from mongodb and set to local state
        axios.get("https://salemaster.onrender.com/get_products")
        .then(res => setProducts(res.data["0"].products))
        .catch(err=>console.log(err))

    },[])
    // conditional rendering the Statistics component
    if(isStatisticsOpen===true){

        return(

            <Statistics products={products} closeStats={setStatisticsOpen}/>

        )

    }

    return (
        <>
            <div className={Styles.main_div}>

                <div className={Styles.statistics}>

                    <span className={Styles.dashboard}>Dashboard</span>

                    <button onClick={statistics} >📈 Statistics</button>

                </div>

                <table>

                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Status</th>
                    </tr>

                    { products.length >0?
                        products[page].map((item,i)=>(
                            <tr>
                                <td>{item.id}</td>
                                <td><img src={item.image}/></td>
                                <td>{item.title}</td>
                                <td>₹{item.price}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td>{item.sold?"SOLD":"UN SOLD"}</td>
                                
                            </tr>
                        )):null
                    }
                    
                </table>
                
            </div>

            <div className={Styles.page_navigation}>

                <button onClick={page !==0?previousPage:null}>⏪ Previous</button>

                <button onClick={page !==5?nextPage:null}>Next ⏩</button>

            </div>
            
        </>
    )
};

export default Main;
