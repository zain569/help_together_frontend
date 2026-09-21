import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OurUsers from '../apis/getOurUser.get';
import styles from '../styles/homes.module.css'

function HomePage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        OurUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error('Users fetch failed:', error));
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
                        <h3><i>{users.totalDonations}</i><span>Total Donations</span></h3>
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
        </>
    )
}

export default HomePage;