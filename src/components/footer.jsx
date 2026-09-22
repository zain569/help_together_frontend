import { useNavigate } from "react-router-dom";
import styles from '../styles/footer.module.css'

function Footer() {
    const navigate = useNavigate()
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerlogoContent}>
                        <div className={styles.footerLogo}>
                            <img src="favicon.png" alt="logo" />
                            <h1>
                                Help<span>Together</span>
                                <p>Small Acts . Bigs Changes</p>
                            </h1>
                        </div>
                        <div className={styles.footerdescription}>
                            <p>HelpTogether is a trusted donation platform
                                connecting people with meaningful causes.
                            </p>
                        </div>
                    </div>
                    <div className={styles.quickLinks}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li onClick={() => { navigate('/') }}>Home</li>
                            <li onClick={() => { navigate('/about-us') }}>About Us</li>
                            <li onClick={() => { navigate('/campaigns') }}>Campaigns</li>
                            <li onClick={() => { navigate('/donate') }}>Donate</li>
                            <li onClick={() => { navigate('/contact') }}>Contact</li>
                        </ul>
                    </div>
                    <div className={styles.support}>
                        <h3>Support</h3>
                        <ul>
                            <li onClick={() => { navigate('/how-it-work') }}>How it Work</li>
                            <li onClick={() => { navigate('/faq') }}>FAQ</li>
                            <li onClick={() => { navigate('/privacy-policy') }}>Privacy Policy</li>
                            <li onClick={() => { navigate('/term-condition') }}>Term & Condition</li>
                        </ul>
                    </div>
                    <div className={styles.contactus}>
                        <h3>Contact Us</h3>
                        <ul>
                            <li>🗺️ Tobs Tek Singh ,Punjab ,Pakistan</li>
                            <li>📧 zainnaveed359@gmail.com</li>
                            <li>📞 +92 310-6189606</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footerCopyright}>
                    <p>© 2026 HelpTogether. All rights reserved.</p>
                    <p>Small Acts . Big Change 💝</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;