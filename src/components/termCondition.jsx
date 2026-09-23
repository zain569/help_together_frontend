import styles from "../styles/termCondition.module.css";

const TermsConditions = () => {
    return (
        <main className={styles.page}>

            {/* Hero */}
            <section className={styles.hero}>
                <div>
                    <span className={styles.badge}>
                        📄 TERMS & CONDITIONS
                    </span>

                    <h1>
                        Terms &
                        <span> Conditions</span>
                    </h1>

                    <p>
                        Please read these terms carefully before using the
                        HelpTogether website and its services.
                    </p>

                    <small>
                        Last updated: September 23, 2026
                    </small>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.content}>

                <aside className={styles.sidebar}>
                    <h3>Quick Navigation</h3>

                    <a href="#acceptance">Acceptance</a>
                    <a href="#accounts">User Accounts</a>
                    <a href="#donations">Donations</a>
                    <a href="#campaigns">Campaigns</a>
                    <a href="#conduct">User Conduct</a>
                    <a href="#content">Content</a>
                    <a href="#liability">Limitation of Liability</a>
                    <a href="#changes">Changes</a>
                    <a href="#contact">Contact</a>
                </aside>

                <article className={styles.terms}>

                    <section id="acceptance">
                        <span>01</span>
                        <h2>Acceptance of Terms</h2>

                        <p>
                            By accessing or using HelpTogether, you agree to
                            comply with these Terms and Conditions and any
                            applicable laws and regulations.
                        </p>

                        <p>
                            If you do not agree with these terms, please do not
                            use the website or its services.
                        </p>
                    </section>

                    <section id="accounts">
                        <span>02</span>
                        <h2>User Accounts</h2>

                        <p>
                            Some features of HelpTogether may require you to
                            create an account. You are responsible for
                            providing accurate information and keeping your
                            account credentials secure.
                        </p>

                        <ul>
                            <li>Provide accurate account information.</li>
                            <li>Keep your password confidential.</li>
                            <li>Do not share your account credentials.</li>
                            <li>Notify us of unauthorized account activity.</li>
                        </ul>
                    </section>

                    <section id="donations">
                        <span>03</span>
                        <h2>Donations</h2>

                        <p>
                            Donations made through HelpTogether are intended
                            to support the campaign selected by the donor.
                        </p>

                        <p>
                            Before completing a donation, users should review
                            the campaign information and donation amount
                            carefully.
                        </p>

                        <div className={styles.infoBox}>
                            <strong>Important</strong>
                            <p>
                                Donation processing, payment methods,
                                refunds, and other financial terms may also
                                be subject to the policies of the payment
                                service used for a transaction.
                            </p>
                        </div>
                    </section>

                    <section id="campaigns">
                        <span>04</span>
                        <h2>Campaigns</h2>

                        <p>
                            Campaign information should be presented accurately
                            by campaign administrators. Users should review
                            campaign details before making a contribution.
                        </p>

                        <p>
                            HelpTogether may review, modify, suspend, or
                            remove campaign content when necessary to operate
                            the platform or address violations of applicable
                            rules.
                        </p>
                    </section>

                    <section id="conduct">
                        <span>05</span>
                        <h2>User Conduct</h2>

                        <p>
                            Users must use HelpTogether responsibly and must
                            not use the platform for unlawful, fraudulent, or
                            abusive activities.
                        </p>

                        <ul>
                            <li>Do not provide intentionally false information.</li>
                            <li>Do not attempt to access another user's account.</li>
                            <li>Do not interfere with website functionality.</li>
                            <li>Do not use the platform for illegal activities.</li>
                            <li>Do not upload harmful or malicious content.</li>
                        </ul>
                    </section>

                    <section id="content">
                        <span>06</span>
                        <h2>User Content</h2>

                        <p>
                            Users may be able to submit information, images,
                            reviews, or other content to the platform.
                        </p>

                        <p>
                            You are responsible for ensuring that content you
                            submit does not violate applicable laws or the
                            rights of other people.
                        </p>
                    </section>

                    <section id="liability">
                        <span>07</span>
                        <h2>Limitation of Liability</h2>

                        <p>
                            HelpTogether is provided on an "as available" basis.
                            While reasonable efforts may be taken to maintain
                            the service, uninterrupted or error-free operation
                            cannot be guaranteed.
                        </p>

                        <p>
                            To the extent permitted by applicable law,
                            HelpTogether is not responsible for losses arising
                            from circumstances outside its reasonable control.
                        </p>
                    </section>

                    <section id="changes">
                        <span>08</span>
                        <h2>Changes to These Terms</h2>

                        <p>
                            We may update these Terms and Conditions from time
                            to time. Updated terms will be published on this
                            page with a revised "Last updated" date.
                        </p>

                        <p>
                            Continued use of the website after changes are
                            published may be subject to the updated terms.
                        </p>
                    </section>

                    <section id="contact">
                        <span>09</span>
                        <h2>Contact Us</h2>

                        <p>
                            If you have questions about these Terms and
                            Conditions, you can contact HelpTogether.
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

export default TermsConditions;