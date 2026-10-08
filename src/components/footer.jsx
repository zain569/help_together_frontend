import { Link } from "react-router-dom";
import styles from '../styles/footer.module.css'

function Footer() {
    const exploreLinks = [
        ['Home', '/'],
        ['About Us', '/about-us'],
        ['Our Impact', '/our-impact'],
        ['Our Values', '/our-values'],
        ['Our Story', '/our-story'],
        ['Our Partners', '/our-partners'],
        ['Success Stories', '/our-success-story'],
    ];

    const actionLinks = [
        ['Campaigns', '/campaigns'],
        ['Funded Campaigns', '/funded_Campaigns'],
        ['Service Gifts', '/service-gifts'],
        ['Campaign Updates', '/campaigns-updates'],
        ['Quick Donate', '/quick-donate'],
        ['How It Works', '/how-it-work'],
        ['What We Do', '/what-we-do'],
        ['Why HelpTogether', '/why-helptogether'],
    ];

    const supportLinks = [
        ['FAQ', '/faq'],
        ['Contact', '/contact'],
        ['Privacy Policy', '/privacy-policy'],
        ['Terms & Conditions', '/term-condition'],
    ];

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
                    <div className={styles.footerLinkGroup}>
                        <h3>Explore</h3>
                        <ul>
                            {exploreLinks.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}
                        </ul>
                    </div>
                    <div className={styles.footerLinkGroup}>
                        <h3>Get Involved</h3>
                        <ul>
                            {actionLinks.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}
                        </ul>
                    </div>
                    <div className={styles.footerLinkGroup}>
                        <h3>Support</h3>
                        <ul>
                            {supportLinks.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}
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
