import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Header.module.css"

const Header = () => {
    return (
        <div className={styles.body}>
            <div className={styles.logo}>
                <img className={styles.img} src="./images/logo.png" alt="logo" />
            </div>
            {/* <div className={styles.text}>
                <Link to="/" className="styles.link">NFT</Link>
            </div>
            <div className={styles.text}>
                <Link to="/creator" className="styles.link">Creator</Link>
            </div> */}
            <div className={styles.text}>
                <Link to="/home" className="styles.link">Help</Link>
            </div>
            <div className={styles.text}>
                <Link to="/logout" className="styles.link">logout</Link>
            </div>

        </div>
    );
};

export default Header;