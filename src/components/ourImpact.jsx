import { useEffect, useState } from "react";
import styles from "../styles/ourImpact.module.css";
import OurUsers from "../apis/getOurUser.get";
import { useCurrency } from '../utils/useCurrency';

const OurImpact = () => {
    const { formatCurrency } = useCurrency();
    const [statistics, setStatistics] = useState({
        totalDonations: 0,
        totalActiveCampaigns: 0,
        peoplesHelped: 0,
        ourUsers: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStatistics = async () => {
            try {
                OurUsers()
                    .then((data) => setStatistics(data))
                    .catch((error) => console.error('Users fetch failed:', error));
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        getStatistics();
    }, []);

    const stats = [
        {
            value: statistics.totalDonations,
            title: "Total Donations",
            description:
                "Every donation represents someone's kindness and support.",
        },
        {
            value: statistics.totalActiveCampaigns,
            title: "Active Campaigns",
            description:
                "Campaigns currently working to create meaningful change.",
        },
        {
            value: statistics.peoplesHelped,
            title: "People Helped",
            description:
                "People and families who have received support through our efforts.",
        },
        {
            value: statistics.ourUsers,
            title: "Our Users",
            description:
                "People who have joined our community and support our mission.",
        },
    ];

    return (
        <main className={styles.impactPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}>OUR IMPACT</span>

                    <h1>
                        Together, We Make
                        <span> A Difference</span>
                    </h1>

                    <p>
                        Every donation, campaign, and helping hand contributes
                        to creating positive change. Explore the impact our
                        HelpTogether community is making.
                    </p>
                </div>

                <div className={styles.heroImage}>
                    <div className={styles.imagePlaceholder}>
                        <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742840/our-impact-impact-img_hgtfjb.jpg" alt="our impact" />
                    </div>
                </div>
            </section>

            <section className={styles.statisticsSection}>
                <div className={styles.sectionHeading}>
                    <span>OUR STATISTICS</span>
                    <h2>Our Impact in Numbers</h2>
                    <p>
                        These numbers represent the growing efforts of our
                        community to support meaningful causes.
                    </p>
                </div>

                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.loader}></div>
                        <p>Loading statistics...</p>
                    </div>
                ) : (
                    <div className={styles.statisticsGrid}>
                        {stats.map((stat, index) => (
                            <div
                                className={styles.statCard}
                                key={stat.title}
                            >
                                <div className={styles.statIcon}>
                                    {index === 0 && "♡"}
                                    {index === 1 && "✦"}
                                    {index === 2 && "♧"}
                                    {index === 3 && "♙"}
                                </div>

                                <h3>
                                    {index === 0 ? formatCurrency(stat.value) : stat.value.toLocaleString()}
                                    {index !== 0 && <span>+</span>}
                                </h3>

                                <h4>{stat.title}</h4>

                                <p>{stat.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className={styles.storySection}>
                <div className={styles.storyImage}>
                    <div className={styles.imagePlaceholder}>

                        <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742826/our-impact-Community_Image_idinzz.jpg" alt="Community Image" />
                    </div>
                </div>

                <div className={styles.storyContent}>
                    <span className={styles.sectionLabel}>
                        MAKING A DIFFERENCE
                    </span>

                    <h2>
                        Every Small Act Can Create
                        <span> Big Changes</span>
                    </h2>

                    <p>
                        HelpTogether brings people together to support
                        campaigns that focus on important community needs.
                        Whether it is helping someone through a donation,
                        supporting a campaign, or simply spreading awareness,
                        every action matters.
                    </p>

                    <p>
                        Our growing statistics are more than just numbers.
                        They represent people coming together, showing
                        kindness, and helping create better opportunities for
                        others.
                    </p>
                </div>
            </section>

            <section className={styles.gallerySection}>
                <div className={styles.sectionHeading}>
                    <span>OUR COMMUNITY</span>
                    <h2>Moments That Matter</h2>
                    <p>
                        Add your campaign, volunteer, community, or donation
                        activity images here.
                    </p>
                </div>

                <div className={styles.galleryGrid}>
                    <div className={styles.galleryItem}>
                        <div className={styles.imagePlaceholder}>
                            <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742836/our-impact-Moments_That_Matter_Image_01_bm0dym.jpg" alt="a" />
                        </div>
                    </div>

                    <div className={styles.galleryItem}>
                        <div className={styles.imagePlaceholder}>
                            <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742839/our-impact-Moments_That_Matter_Image_02_hwv0ig.jpg" alt="a" />
                        </div>
                    </div>

                    <div className={styles.galleryItem}>
                        <div className={styles.imagePlaceholder}>
                            <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742844/our-impact-Moments_That_Matter_Image_03_xrs0my.jpg" alt="a" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.bottomSection}>
                <div>
                    <span>SMALL ACTS . BIG CHANGES</span>
                    <h2>
                        Together, We Can Help
                        <br />
                        More People.
                    </h2>
                </div>

                <p>
                    Your support can become part of the next number in our
                    impact story.
                </p>
            </section>
        </main>
    );
};

export default OurImpact;