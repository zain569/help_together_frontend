import styles from '../styles/whatWeDo.module.css';

const services = [
    {
        number: '01',
        title: 'Connect People With Causes',
        description:
            'We bring important causes and meaningful campaigns together so people can discover opportunities where their support can make a difference.',
    },
    {
        number: '02',
        title: 'Support Campaigns',
        description:
            'We provide a platform where donors can discover campaigns, understand their goals, and contribute through available payment methods.',
    },
    {
        number: '03',
        title: 'Make Giving Simple',
        description:
            'We make the donation journey simple and accessible so users can find a campaign, choose an amount, and complete their contribution with ease.',
    },
    {
        number: '04',
        title: 'Share Stories of Impact',
        description:
            'We highlight stories and updates that show how support can help communities and individuals move toward a better future.',
    },
];

const WhatWeDo = () => {
    return (
        <main className={styles.whatWeDoPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span>WHAT WE DO</span>

                    <h1>Turning Support Into Meaningful Action</h1>

                    <p>
                        HelpTogether creates a simple connection between
                        people who want to help and causes that need support.
                    </p>
                </div>
            </section>

            <section className={styles.introSection}>
                <div className={styles.introContent}>
                    <span>OUR PURPOSE</span>

                    <h2>Making It Easier to Help</h2>

                    <p>
                        HelpTogether is a donation platform designed to make
                        giving more accessible, transparent, and meaningful.
                    </p>

                    <p>
                        We bring campaigns and donors together while providing
                        an easy way to discover causes, support campaigns, and
                        follow stories of positive change.
                    </p>
                </div>

                <div className={styles.introCard}>
                    <div className={styles.cardIcon}>💙</div>

                    <h3>One Platform</h3>

                    <p>
                        Discover causes, support campaigns, and become part of
                        a community that believes in helping others.
                    </p>
                </div>
            </section>

            <section className={styles.servicesSection}>
                <div className={styles.sectionHeading}>
                    <span>OUR WORK</span>

                    <h2>How HelpTogether Makes a Difference</h2>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service) => (
                        <article
                            className={styles.serviceCard}
                            key={service.number}
                        >
                            <div className={styles.number}>
                                {service.number}
                            </div>

                            <div>
                                <h3>{service.title}</h3>

                                <p>{service.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.ctaSection}>
                <h2>Be Part of the Change</h2>

                <p>
                    Whether you donate, support a campaign, or simply share a
                    cause, your actions can help create a positive impact.
                </p>

                <button className={styles.ctaButton}>
                    Explore Campaigns
                </button>
            </section>
        </main>
    );
};

export default WhatWeDo;