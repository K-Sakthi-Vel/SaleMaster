import React, { useEffect } from 'react';
import Styles from "./navbar.module.css";
import axios from "axios"
const Navbar = (props) => {
    // useEffect(()=>{        
    //   },[])
    
    return (
        <div className={Styles.nav}>
            <p className={Styles.appname}>
                SaleMaster
            </p>
        
        </div>
    )
};

export default Navbar;
