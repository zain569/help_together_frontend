import styles from '../styles/whyHelpTogwther.module.css';

const reasons = [
    {
        icon: '🎯',
        title: 'Purpose Driven',
        description:
            'Our platform is built around connecting people with meaningful causes and campaigns that need support.',
    },
    {
        icon: '🔎',
        title: 'Clear Campaign Information',
        description:
            'Campaign details help donors understand the purpose, goal, progress, and needs of each campaign before contributing.',
    },
    {
        icon: '🔐',
        title: 'Secure Giving',
        description:
            'We provide trusted payment options so users can make their donations through available online payment gateways.',
    },
    {
        icon: '❤️',
        title: 'Community Focused',
        description:
            'HelpTogether brings donors and campaigns together to encourage a culture of support and kindness.',
    },
    {
        icon: '📊',
        title: 'Track Campaign Progress',
        description:
            'Campaign progress allows supporters to see how close a campaign is to reaching its fundraising goal.',
    },
    {
        icon: '🌱',
        title: 'Focused on Impact',
        description:
            'We want every contribution to become part of a larger effort toward creating positive and meaningful change.',
    },
];

const WhyHelpTogether = () => {
    return (
        <main className={styles.whyPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span>WHY HELDTOGETHER</span>

                    <h1>
                        Because Together, We Can Make a Difference
                    </h1>

                    <p>
                        HelpTogether makes it easier to discover causes,
                        support campaigns, and become part of meaningful
                        change.
                    </p>
                </div>
            </section>

            <section className={styles.introSection}>
                <span className={styles.introBadge}>
                    WHY CHOOSE US
                </span>

                <h2>A Simple Way to Make Your Support Matter</h2>

                <p>
                    Finding the right cause to support should be simple.
                    HelpTogether brings campaigns and donors together in one
                    platform so people can discover opportunities to help.
                </p>

                <p>
                    Whether you want to support education, food assistance,
                    healthcare, or another cause, our goal is to make the
                    journey from discovering a campaign to making a donation
                    straightforward.
                </p>
            </section>

            <section className={styles.reasonsSection}>
                <div className={styles.sectionHeading}>
                    <span>THE HELDTOGETHER DIFFERENCE</span>

                    <h2>Why People Choose HelpTogether</h2>
                </div>

                <div className={styles.reasonsGrid}>
                    {reasons.map((reason) => (
                        <article
                            className={styles.reasonCard}
                            key={reason.title}
                        >
                            <div className={styles.icon}>
                                {reason.icon}
                            </div>

                            <h3>{reason.title}</h3>

                            <p>{reason.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.finalSection}>
                <div className={styles.finalContent}>
                    <span>MAKE A DIFFERENCE</span>

                    <h2>Your Support Can Become Someone's Hope</h2>

                    <p>
                        Every contribution is an opportunity to help a person,
                        support a family, or strengthen a community.
                    </p>

                    <button className={styles.button}>
                        Explore Campaigns
                    </button>
                </div>
            </section>
        </main>
    );
};

export default WhyHelpTogether;