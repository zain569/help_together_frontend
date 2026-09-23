import styles from "../styles/howItWork.module.css";

const HowItWorks = () => {
    return (
        <main className={styles.page}>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>
                        🤝 HOW IT WORKS
                    </span>

                    <h1>
                        Helping Hands,
                        <span> One Step at a Time</span>
                    </h1>

                    <p>
                        HelpTogether makes it simple to discover campaigns,
                        make donations, and become part of positive change.
                    </p>
                </div>

                <div className={styles.heroVisual}>
                    <div className={styles.heroCircle}>
                        <span>❤️</span>
                        <strong>Give</strong>
                        <small>Hope</small>
                    </div>

                    <div className={styles.floatingCard}>
                        <span>✓</span>
                        <div>
                            <strong>Every Act Matters</strong>
                            <p>Small acts · Big change</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className={styles.stepsSection}>
                <div className={styles.sectionHeader}>
                    <span>THE PROCESS</span>
                    <h2>How HelpTogether Works</h2>
                    <p>
                        Supporting a cause is simple. Follow these easy steps
                        and become part of a community that cares.
                    </p>
                </div>

                <div className={styles.stepsGrid}>

                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>01</div>
                        <div className={styles.stepIcon}>🔍</div>
                        <h3>Find a Campaign</h3>
                        <p>
                            Explore campaigns and discover causes that are
                            meaningful to you.
                        </p>
                    </div>

                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>02</div>
                        <div className={styles.stepIcon}>❤️</div>
                        <h3>Choose Your Cause</h3>
                        <p>
                            Select a campaign you would like to support and
                            learn more about its purpose.
                        </p>
                    </div>

                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>03</div>
                        <div className={styles.stepIcon}>💳</div>
                        <h3>Make a Donation</h3>
                        <p>
                            Enter your donation amount and complete the
                            donation process.
                        </p>
                    </div>

                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>04</div>
                        <div className={styles.stepIcon}>🌱</div>
                        <h3>Create an Impact</h3>
                        <p>
                            Your contribution helps support meaningful causes
                            and people in need.
                        </p>
                    </div>

                </div>
            </section>

            {/* Donor Section */}
            <section className={styles.donorSection}>
                <div className={styles.donorContent}>
                    <span className={styles.smallTitle}>
                        FOR DONORS
                    </span>

                    <h2>
                        Your Support Can
                        <span> Make a Difference</span>
                    </h2>

                    <p>
                        Whether you contribute a small amount or make a larger
                        donation, your support can help campaigns move closer
                        to their goals.
                    </p>

                    <div className={styles.points}>
                        <div>
                            <span>✓</span>
                            <p>Browse available campaigns</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Choose a cause you care about</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Make a contribution</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Track your donation history</p>
                        </div>
                    </div>
                </div>

                <div className={styles.donorVisual}>
                    <div className={styles.handCard}>
                        <span>🤲</span>
                        <h3>Your Support Matters</h3>
                        <p>
                            Together we can turn kindness into action.
                        </p>
                    </div>
                </div>
            </section>

            {/* Campaign Section */}
            <section className={styles.campaignSection}>
                <div className={styles.sectionHeader}>
                    <span>CAMPAIGNS</span>
                    <h2>What Happens to Your Donation?</h2>
                    <p>
                        Donations are connected to the campaign you choose,
                        helping support the purpose described by that campaign.
                    </p>
                </div>

                <div className={styles.flow}>
                    <div className={styles.flowItem}>
                        <div>❤️</div>
                        <h3>You Donate</h3>
                        <p>
                            You select a campaign and make your contribution.
                        </p>
                    </div>

                    <div className={styles.arrow}>→</div>

                    <div className={styles.flowItem}>
                        <div>🎯</div>
                        <h3>Campaign Receives Support</h3>
                        <p>
                            Your donation contributes toward the campaign
                            fundraising goal.
                        </p>
                    </div>

                    <div className={styles.arrow}>→</div>

                    <div className={styles.flowItem}>
                        <div>🌱</div>
                        <h3>Positive Impact</h3>
                        <p>
                            Contributions help support the campaign's intended
                            purpose.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div>
                    <span>READY TO HELP?</span>
                    <h2>Every Small Act Can Create Big Change</h2>
                    <p>
                        Explore campaigns and find a cause that matters to you.
                    </p>
                </div>

                <button className={styles.ctaButton}>
                    Explore Campaigns →
                </button>
            </section>

        </main>
    );
};

export default HowItWorks;