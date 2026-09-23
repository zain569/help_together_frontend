import styles from "../styles/privacypolicy.module.css";

const PrivacyPolicy = () => {
    return (
        <main className={styles.page}>

            {/* Header */}
            <section className={styles.hero}>
                <div>
                    <span className={styles.badge}>
                        🔒 PRIVACY
                    </span>

                    <h1>
                        Privacy
                        <span> Policy</span>
                    </h1>

                    <p>
                        We respect your privacy and are committed to protecting
                        the information you provide while using HelpTogether.
                    </p>

                    <small>
                        Last updated: September 23, 2026
                    </small>
                </div>
            </section>

            {/* Content */}
            <section className={styles.content}>

                <aside className={styles.sidebar}>
                    <h3>On this page</h3>

                    <a href="#information">Information We Collect</a>
                    <a href="#use">How We Use Information</a>
                    <a href="#sharing">Information Sharing</a>
                    <a href="#security">Data Security</a>
                    <a href="#cookies">Cookies</a>
                    <a href="#rights">Your Rights</a>
                    <a href="#contact">Contact Us</a>
                </aside>

                <article className={styles.policy}>

                    <section id="information">
                        <span>01</span>
                        <h2>Information We Collect</h2>

                        <p>
                            When you use HelpTogether, we may collect
                            information that you provide directly to us,
                            such as your name, email address, account
                            information, and information related to donations.
                        </p>

                        <p>
                            We may also collect basic technical information
                            required to operate, maintain, and improve the
                            website.
                        </p>
                    </section>

                    <section id="use">
                        <span>02</span>
                        <h2>How We Use Information</h2>

                        <p>
                            Information may be used to provide and maintain
                            our services, manage user accounts, process
                            donations, communicate with users, and improve
                            the HelpTogether experience.
                        </p>

                        <ul>
                            <li>To manage your account.</li>
                            <li>To provide donation-related services.</li>
                            <li>To communicate important service information.</li>
                            <li>To improve website functionality.</li>
                            <li>To help protect the security of our platform.</li>
                        </ul>
                    </section>

                    <section id="sharing">
                        <span>03</span>
                        <h2>Information Sharing</h2>

                        <p>
                            We do not intend to sell your personal information.
                            Information may be shared with service providers
                            when necessary to operate specific website
                            functions or process services on our behalf.
                        </p>

                        <p>
                            We may also disclose information when required by
                            applicable law or when necessary to protect the
                            rights, safety, or security of HelpTogether,
                            our users, or others.
                        </p>
                    </section>

                    <section id="security">
                        <span>04</span>
                        <h2>Data Security</h2>

                        <p>
                            We take reasonable measures to protect information
                            against unauthorized access, alteration,
                            disclosure, or destruction.
                        </p>

                        <div className={styles.notice}>
                            <strong>🔐 Security Notice</strong>
                            <p>
                                No internet-based service can guarantee
                                absolute security. Users should also take
                                reasonable steps to protect their account
                                credentials.
                            </p>
                        </div>
                    </section>

                    <section id="cookies">
                        <span>05</span>
                        <h2>Cookies</h2>

                        <p>
                            HelpTogether may use cookies or similar technologies
                            to support website functionality, remember
                            preferences, and understand how users interact with
                            the website.
                        </p>

                        <p>
                            You may be able to control cookies through your
                            browser settings. Disabling certain cookies may
                            affect some website functionality.
                        </p>
                    </section>

                    <section id="rights">
                        <span>06</span>
                        <h2>Your Rights</h2>

                        <p>
                            Depending on applicable law, you may have rights
                            concerning your personal information, including
                            requesting access, correction, or deletion of
                            certain information.
                        </p>

                        <p>
                            Requests can be submitted through the contact
                            information provided below.
                        </p>
                    </section>

                    <section id="contact">
                        <span>07</span>
                        <h2>Contact Us</h2>

                        <p>
                            If you have questions about this Privacy Policy or
                            how your information is handled, please contact
                            HelpTogether.
                        </p>

                        <div className={styles.contactBox}>
                            <strong>HelpTogether</strong>
                            <p>Email: support@helptogether.org</p>
                            <p>Location: Toba Tek Singh, Punjab, Pakistan</p>
                        </div>
                    </section>

                </article>
            </section>

        </main>
    );
};

export default PrivacyPolicy;