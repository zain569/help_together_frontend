
import styles from '../styles/ourValues.module.css';

const values = [
    {
        icon: '🤝',
        title: 'Compassion',
        description:
            'We believe every person deserves kindness, dignity, and support. We put people and their needs at the heart of everything we do.',
    },
    {
        icon: '🔍',
        title: 'Transparency',
        description:
            'We believe donors should understand where their support goes. We work to keep our campaigns, donations, and impact clear.',
    },
    {
        icon: '🌱',
        title: 'Sustainable Impact',
        description:
            'We focus on creating meaningful and lasting change rather than providing only temporary support.',
    },
    {
        icon: '💙',
        title: 'Trust',
        description:
            'We build strong relationships with donors, campaign organizers, and communities through honesty and responsibility.',
    },
    {
        icon: '🌍',
        title: 'Equality',
        description:
            'We believe everyone deserves an opportunity to live with dignity and access the support they need.',
    },
    {
        icon: '✨',
        title: 'Hope',
        description:
            'We believe small acts of kindness can create meaningful change and inspire communities to help one another.',
    },
];

const OurValues = () => {
    return (
        <main className={styles.valuesPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span>OUR VALUES</span>

                    <h1>What We Stand For</h1>

                    <p>
                        Our values guide every campaign, every donation, and
                        every decision we make at HelpTogether.
                    </p>
                </div>
            </section>

            <section className={styles.valuesSection}>
                <div className={styles.sectionHeading}>
                    <span>OUR FOUNDATION</span>

                    <h2>Values That Drive Us</h2>

                    <p>
                        HelpTogether is built on compassion, trust, and the
                        belief that everyone can make a difference.
                    </p>
                </div>

                <div className={styles.valuesGrid}>
                    {values.map((value) => (
                        <article
                            className={styles.valueCard}
                            key={value.title}
                        >
                            <div className={styles.icon}>
                                {value.icon}
                            </div>

                            <h3>{value.title}</h3>

                            <p>{value.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.bottomSection}>
                <div className={styles.bottomContent}>
                    <h2>Small Acts. Big Changes.</h2>

                    <p>
                        When people come together with compassion and purpose,
                        even a small contribution can become part of something
                        much bigger.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default OurValues;
