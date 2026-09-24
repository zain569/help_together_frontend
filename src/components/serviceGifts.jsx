import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/serviceGifts.module.css'
import ServiceGifts from '../apis/gifts.get';

function ServiceAndGifts() {
    const [gifts, setGifts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const giftsPerPage = 8;

    useEffect(() => {
        ServiceGifts()
            .then((data) => setGifts(data))
            .catch((error) => console.error('Gifts fetch failed:', error));
    }, [])

    const totalPages = Math.ceil(gifts.length / giftsPerPage);
    const firstGiftIndex = (currentPage - 1) * giftsPerPage;
    const visibleGifts = gifts.slice(firstGiftIndex, firstGiftIndex + giftsPerPage);

    return (
        <>
            {/*Hero Section*/}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>Our Services</span>

                    <h1>Our <span>Services</span></h1>

                    <p>
                        We provide essential support and resources to help communities grow, thrive, and build a brighter future. Every service is a steptowards a better tomorrow.
                    </p>

                    <div className={styles.herobadges}>
                        <p>Real Help <br /> Real People</p>
                        <p>Sustainable <br /> Impact</p>
                        <p>Community <br /> Support</p>
                        <p>Lasting <br /> Changes</p>
                    </div>
                </div>
            </section>

            <section className={styles.causes}>
                <div className={styles.causesContent}>
                    <span className={styles.badge}>What we do</span>
                    <h1>Browse By Cause</h1>
                    <p>Choose a cause that matter to you and start making an impact.</p>
                </div>
            </section>

            {/*Service And Gifts Section*/}
            <section className={styles.services}>
                <div className={styles.giftsContainer}>
                    {visibleGifts.map((gift) => (
                        <div className={styles.giftContent} key={gift._id || gift.id || gift.name}>
                            <div className={styles.imgContainer}>
                                <img src={gift.imageUrl} alt={gift.name} />
                            </div>
                            <div className={styles.giftText}>
                                <h3>{gift.name}</h3>
                                <p className={styles.giftDescription}>{gift.description}</p>
                                <p className={styles.giftCost}><i>Cost:</i><span> {gift.price}</span></p>
                                <button onClick={() => { navigate(`/service-gifts/${gift.id}`) }}>🎁 Give Gift</button>
                            </div>
                        </div>
                    ))}

                </div>
                {totalPages > 1 && (
                    <div className={styles.pagination} aria-label="Service gifts pagination">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => page - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => page + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}

export default ServiceAndGifts;