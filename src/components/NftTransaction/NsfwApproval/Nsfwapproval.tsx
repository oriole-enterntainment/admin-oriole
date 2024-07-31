import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./NsfwApproval.module.css"
const Items = [
    {
        id: 1,
        token_id: 12345,
        price: "45,900",
        image: "nft.png",
        quantity: 30,
        creator_id: "@pratham",
        creator_name: "Pratham",
        tags: "art, bollywood",
        comment: "nft op",
        detail_link: "#",
    },
    {
        id: 2,
        token_id: 12345,
        price: "45,900",
        image: "nft.png",
        quantity: 30,
        creator_id: "@pratham",
        creator_name: "Pratham",
        tags: "art, bollywood",
        comment: "nft op",
        detail_link: "#",

    },
]
const Nsfwapproval = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.main}>
            <h2 className={styles.h2}>NSFW Approval</h2>

            <div className={styles.table}>
                <div className={styles.head}>
                    <div>Token Id</div>
                    <div>Price</div>
                    <div>Image</div>
                    <div>Quantity</div>
                    <div>Creator Id</div>
                    <div>Creator Name</div>
                    <div>Tags</div>
                    <div>Nft Status</div>
                    <div>Comments</div>
                    <div>View Details</div>
                </div>
                <div className={styles.body}>
                    {Items.map((e) => (
                        <div className={styles.row} key={e.id}>
                            <div className={styles.j}>{e.token_id}</div>
                            <div className={styles.j}>{e.price}</div>
                            <div className={styles.j}>{e.image}</div>
                            <div className={styles.j}>{e.quantity}</div>
                            <div className={styles.j}>{e.creator_id}</div>
                            <div className={styles.j}>{e.creator_name}</div>
                            <div className={styles.j}>{e.tags}</div>
                            <div className={styles.items}>
                                <button>Reject</button>
                                <button>Deny</button>
                            </div>
                            <td className={styles.items}>{e.comment}</td>
                            <td className={styles.items}><button onClick={() => navigate(e.detail_link)}>View</button></td>
                        </div>))}
                </div>

            </div>
            <button type="submit" className={styles.btn} ><p className={styles.p}>Load More</p></button>
        </div>
    );
};

export default Nsfwapproval;