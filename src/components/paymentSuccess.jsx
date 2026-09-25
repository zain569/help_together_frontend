import { useNavigate } from 'react-router-dom';
import styles from '../styles/paymentSuccess.module.css';

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <section className={styles.successPage}>
            <div className={styles.successCard}>
                <div className={styles.successIcon}>
                    <span>✓</span>
                </div>

                <h1>Payment Successful!</h1>

                <p className={styles.mainText}>
                    Thank you for your generous donation.
                </p>

                <p className={styles.subText}>
                    Your contribution has been received successfully and
                    will help make a positive difference.
                </p>

                <div className={styles.thankYouBox}>
                    <span>💚</span>
                    <p>
                        Every contribution counts. Thank you for being
                        part of the HelpTogether community.
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

export default PaymentSuccess;