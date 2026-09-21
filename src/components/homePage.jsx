import { useNavigate } from 'react-router-dom';
import styles from '../styles/homes.module.css'

function HomePage() {
    const navigate = useNavigate();
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
                        <button onClick={()=>{navigate('/campaigns')}}>Explore Campaigns</button>
                        <button onClick={()=>{navigate('/donate')}} className={styles.secondaryButton}>Donate Now</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage;