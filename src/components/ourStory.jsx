import styles from '../styles/ourStory.module.css';

const OurStory = () => {
    return (
        <main className={styles.storyPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span>OUR STORY</span>

                    <h1>Every Helping Hand Creates a Story</h1>

                    <p>
                        HelpTogether was built around a simple belief:
                        together, we can make it easier for people to help
                        those who need it most.
                    </p>
                </div>
            </section>

            <section className={styles.storySection}>
                <div className={styles.storyImage}>
                    <div className={styles.imageBox}>
                        <span>HelpTogether</span>

                        <strong>
                            Small Acts.
                            <br />
                            Big Changes.
                        </strong>
                    </div>
                </div>

                <div className={styles.storyContent}>
                    <span className={styles.label}>HOW IT STARTED</span>

                    <h2>A Platform Built Around Helping Others</h2>

                    <p>
                        HelpTogether started with a simple idea: make it easier
                        for people to discover meaningful causes and support
                        campaigns that matter to them.
                    </p>

                    <p>
                        We believe that helping someone should not feel
                        complicated. Whether someone wants to support
                        education, food assistance, healthcare, or another
                        important cause, HelpTogether brings these
                        opportunities together in one place.
                    </p>

                    <p>
                        Our goal is to connect people who want to help with
                        campaigns that need support, creating a community
                        where every contribution can become part of a bigger
                        change.
                    </p>
                </div>
            </section>

            <section className={styles.timelineSection}>
                <div className={styles.sectionHeading}>
                    <span>OUR JOURNEY</span>

                    <h2>Growing Together</h2>

                    <p>
                        Our journey is about continuously improving the way
                        people connect, donate, and create positive change.
                    </p>
                </div>

                <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                        <div className={styles.number}>01</div>

                        <div>
                            <h3>The Idea</h3>

                            <p>
                                We imagined a simple platform where people
                                could find causes and support them easily.
                            </p>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.number}>02</div>

                        <div>
                            <h3>Building HelpTogether</h3>

                            <p>
                                We brought campaigns, donations, services, and
                                stories together into one platform.
                            </p>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.number}>03</div>

                        <div>
                            <h3>Creating Impact</h3>

                            <p>
                                Every campaign and every contribution becomes
                                part of a growing community of support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.quoteSection}>
                <div>
                    <h2>Together, We Can Do More.</h2>

                    <p>
                        HelpTogether connects generosity with opportunity and
                        turns individual acts of kindness into collective
                        impact.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default OurStory;