import { useNavigate } from 'react-router-dom';
import styles from '../styles/paymentFailed.module.css';

function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <section className={styles.failedPage}>
            <div className={styles.failedCard}>
                <div className={styles.failedIcon}>
                    <span>×</span>
                </div>

                <h1>Payment Failed</h1>

                <p className={styles.mainText}>
                    We couldn't complete your donation.
                </p>

                <p className={styles.subText}>
                    Your payment was not processed successfully.
                    Please try again or return to the homepage.
                </p>

                <div className={styles.helpBox}>
                    <span>💙</span>
                    <p>
                        Don't worry, no donation was completed.
                        You can try again whenever you're ready.
                    </p>
                </div>

                <button
                    className={styles.homeButton}
                    onClick={() => navigate('/')}
                >
                    ← Return to Home
                </button>
            </div>
        </section>
    );
}

export default PaymentFailed;