import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OurUsers from '../apis/getOurUser.get';
import styles from '../styles/homes.module.css'
import ServiceGifts from '../apis/gifts.get';

function HomePage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        OurUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error('Users fetch failed:', error));
        
        ServiceGifts()
            .then((data) => setGifts(data))
            .catch((error) => console.error('Gifts fetch failed:', error));
    }, []);

    return (
        <>
            {/*Hero Section*/}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>❤️ Together for a Brighter Future</span>

                    <h1>Together, We Can <span> Make a Difference</span></h1>

                    <p>
                        HelpTogether connects kind hearts with people in need.
                        Your support can bring hope, create opportunities and
                        change lives.
                    </p>
                    <div className={styles.button}>
                        <button onClick={() => { navigate('/campaigns') }}>Explore Campaigns</button>
                        <button onClick={() => { navigate('/donate') }} className={styles.secondaryButton}>Donate Now</button>
                    </div>
                </div>
            </section>

            {/*Our Users*/}
            <section className={styles.ourUsers}>
                <div className={styles.users}>
                    <div className={styles.user}>
                        <h3>PKR: <i>{users.totalDonations}</i><span>Total Donations</span></h3>
                    </div>
                    <div className={styles.user}>
                        <h3><i>{users.totalActiveCampaigns}</i><span>Active Campaigns</span></h3>
                    </div>
                    <div className={styles.user}>
                        <h3><i>{users.peoplesHelped}</i><span>Peoples Helped</span></h3>
                    </div>
                    <div className={styles.user}>
                        <h3><i>{users.ourUsers}</i><span>Registered Donors</span></h3>
                    </div>
                </div>
            </section>

            {/*Service And Gifts Section*/}
            <section className={styles.services}>
                <div className={styles.serviceContent}>
                    <span className={styles.serviceBadge}>🎁 Our Service Gifts</span>
                    <h3 className={styles.serviceTitle}>Service Gifts</h3>
                    <p className={styles.servicePara}>Support meaningfull causes with our special service gifts.<span>Each gift helps someone in need and spreads kindness.</span></p>
                    <button className={styles.serviceButton}>View All Service Gifts</button>
                </div>
                <div className={styles.giftsContainer}>
                    {gifts.map((gift) => (
                        <div className={styles.giftContent} key={gift._id || gift.id || gift.name}>
                            <div className={styles.imgContainer}>
                                <img src={gift.imageUrl} alt={gift.name} />
                            </div>
                            <div className={styles.giftText}>
                                <h3>{gift.name}</h3>
                                <p className={styles.giftDescription}>{gift.description}</p>
                                <p className={styles.giftCost}><i>Cost:</i><span> {gift.price}</span></p>
                                <button onClick={()=> {navigate(`/service-gifts/${gift.id}`)}}>🎁 Give Gift</button>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </section>
        </>
    )
}

export default HomePage;