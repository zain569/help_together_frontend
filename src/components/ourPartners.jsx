import styles from "../styles/ourPartners.module.css";

const OurPartners = () => {
    const partners = [
        {
            title: "Community Partners",
            description:
                "Local communities and volunteers who help us understand needs and support meaningful causes.",
            image: "https://res.cloudinary.com/dkgeren05/image/upload/v1790742823/partners-community_sgpcew.jpg",
        },
        {
            title: "Education Partners",
            description:
                "Schools, educators, and learning communities that can help create better opportunities for children.",
            image: "https://res.cloudinary.com/dkgeren05/image/upload/v1790742826/partners-education_bbomrk.jpg",
        },
        {
            title: "Healthcare Partners",
            description:
                "Healthcare professionals and organizations working toward better health and wellbeing in communities.",
            image: "https://res.cloudinary.com/dkgeren05/image/upload/v1790742829/partners-healthcare_uxqiyr.jpg",
        },
        {
            title: "Corporate Partners",
            description:
                "Businesses and organizations that want to support social causes and contribute to positive community change.",
            image: "https://res.cloudinary.com/dkgeren05/image/upload/v1790742824/partners-corporate_hkomqn.jpg",
        },
    ];

    return (
        <main className={styles.partnersPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}>OUR PARTNERS</span>

                    <h1>
                        Growing Together,
                        <span> Creating Change</span>
                    </h1>

                    <p>
                        Strong communities are built when people and
                        organizations come together. HelpTogether is building
                        connections with people and groups who share our
                        vision of creating meaningful positive change.
                    </p>
                </div>

                <div className={styles.heroImage}>
                    <div className={styles.imageWrapper}>
                        <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742831/partners-hero-section_pc39ke.jpg" alt="HelpTogether Partners" />
                    </div>
                </div>
            </section>

            <section className={styles.partnersSection}>
                <div className={styles.sectionHeading}>
                    <span>WORKING TOGETHER</span>
                    <h2>Our Partnership Community</h2>
                    <p>
                        We believe collaboration can help communities reach
                        more people and create greater opportunities for
                        positive change.
                    </p>
                </div>

                <div className={styles.partnersGrid}>
                    {partners.map((partner) => (
                        <article
                            className={styles.partnerCard}
                            key={partner.title}
                        >
                            <div className={styles.partnerImage}>
                                <img
                                    src={partner.image}
                                    alt={partner.title}
                                />
                            </div>

                            <div className={styles.partnerContent}>
                                <span className={styles.partnerNumber}>
                                    PARTNERSHIP
                                </span>

                                <h3>{partner.title}</h3>

                                <p>{partner.description}</p>

                                <div className={styles.cardLine}></div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.communitySection}>
                <div className={styles.communityImage}>
                    <div className={styles.imageWrapper}>
                        <img src="partners-Community-Collaborators.jpg" alt="Community Collaboration" />
                    </div>
                </div>

                <div className={styles.communityContent}>
                    <span className={styles.sectionLabel}>
                        GROWING TOGETHER
                    </span>

                    <h2>
                        Building Connections That
                        <span> Make a Difference</span>
                    </h2>

                    <p>
                        HelpTogether is growing its community by connecting
                        donors, volunteers, campaign organizers, and people
                        who care about making a positive difference.
                    </p>

                    <p>
                        As our platform grows, we look forward to working with
                        organizations and communities that share our commitment
                        to helping people and supporting meaningful causes.
                    </p>

                    <div className={styles.communityPoints}>
                        <div>
                            <span>01</span>
                            <p>Connect with communities</p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>Support meaningful causes</p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>Create lasting impact</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.futureSection}>
                <div className={styles.futureContent}>
                    <span>OUR FUTURE PARTNERS</span>

                    <h2>
                        A Growing Network of
                        <span> Helping Hands</span>
                    </h2>

                    <p>
                        We are continuously working toward building meaningful
                        partnerships with organizations, businesses,
                        educational institutions, healthcare communities, and
                        other groups that want to support positive change.
                    </p>

                    <div className={styles.futureBadge}>
                        <span>✦</span>
                        <p>Partnership opportunities coming soon</p>
                    </div>
                </div>

                <div className={styles.futureImage}>
                    <div className={styles.imageWrapper}>
                        <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742837/partners-future-partners_g1aldv.jpg" alt="Future Partners" />
                    </div>
                </div>
            </section>

            <section className={styles.bottomSection}>
                <span>SMALL ACTS . BIG CHANGES</span>

                <h2>
                    Together, We Can
                    <br />
                    Create More Impact.
                </h2>

                <p>
                    Every connection can become an opportunity to help more
                    people and strengthen our communities.
                </p>
            </section>
        </main>
    );
};

export default OurPartners;