import React, { useEffect, useState } from "react";

import Styles from "./statistics.module.css";

const Statistics = (props) => {

    const {products,closeStats} = props;

    const [stats,setStats]=useState()

    const [currentMonthSelection,setCurrentMonthSelection]=useState()

    // function for show statistics of a particular month
    function selectMonth(mn){
        // getting flat the products array
        let flatted = products.flat(Infinity)
        // initial stats object
        let currStats = {
            "NOT_YET":{
                "total_sale":0,
                "sold":0,
                "unsold":0
            }
        }

        let months_and_num = {
            "JAN":"01",
            "FEB":"02",
            "MAR":"03",
            "APR":"04",
            "MAY":"05",
            "JUN":"06",
            "JUL":"07",
            "AUG":"08",
            "SEP":"09",
            "OCT":"10",
            "NOV":"11",
            "DEC":"12"
        }
        // changing the Key value with desired Month name
        if (mn !== "NOT_YET"){

            Object.defineProperty(currStats, mn,

                Object.getOwnPropertyDescriptor(currStats, "NOT_YET"));

            delete currStats["NOT_YET"];

        }
        // running  a loop in flatted array and calculating details
        for(let i of flatted){
            // slicing the month in numbers(01,02,03....12)
            const month = i.dateOfSale.slice(5,7);
            // if items month and desired month is equal
            if(months_and_num[mn] === month){
                // if item is sold
                if (i.sold === true){
                    // update price as total sold amount
                    currStats[mn].total_sale += i.price;
                    // also increase items sold
                    currStats[mn].sold += 1;
                }
                else if(i.sold === false){
                    // count for unsold items
                    currStats[mn].unsold += 1;
                } 
                    
            }
                
        }
        // setting stats state
        setStats(currStats);
        // setting current month upon user selection
        setCurrentMonthSelection(mn);

    }
         
    return (
        
        <div className={Styles.months_statistics}>

            <button className={Styles.getback} onClick={()=>closeStats(false)}>Back</button>

            <div className={Styles.month_selection}>

                <span onClick={()=>selectMonth("JAN")}>JAN</span>
                <span onClick={()=>selectMonth("FEB")}>FEB</span>
                <span onClick={()=>selectMonth("MAR")}>MAR</span>
                <span onClick={()=>selectMonth("APR")}>APR</span>
                <span onClick={()=>selectMonth("MAY")}>MAY</span>
                <span onClick={()=>selectMonth("JUN")}>JUN</span>
                <span onClick={()=>selectMonth("JUL")}>JUL</span>
                <span onClick={()=>selectMonth("AUG")}>AUG</span>
                <span onClick={()=>selectMonth("SEP")}>SEP</span>
                <span onClick={()=>selectMonth("OCT")}>OCT</span>
                <span onClick={()=>selectMonth("NOV")}>NOV</span>
                <span onClick={()=>selectMonth("DEC")}>DEC</span>

            </div>
            {
                stats !== undefined?
                <div className={Styles.stats_on_month}>
                <p className={Styles.month_name}>{currentMonthSelection}</p>
                <div className={Styles.details_div}>
                    <div className={Styles.details}>
                        <span className={Styles.category}>Total Sale</span>
                        <span className={Styles.value}>₹ {stats[currentMonthSelection].total_sale.toFixed(2)}</span>
                    </div>
                    <div className={Styles.details}>
                        <span className={Styles.category}>Sold items</span>
                        <span className={Styles.value}>{stats[currentMonthSelection].sold}</span>
                    </div>
                    <div className={Styles.details}>
                        <span className={Styles.category}>Unsold items </span>
                        <span className={Styles.value}>{stats[currentMonthSelection].unsold}</span>
                    </div>
                </div>
            </div>
            :<h1>Select month to view statistics!!!</h1>
            }
            

        </div>
    )
}
export default Statistics;

