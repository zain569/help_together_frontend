import styles from "../styles/success-story.module.css";

const successStories = [
    {
        category: "EDUCATION",
        title: "Helping Children Continue Their Education",
        description:
            "Through community donations and campaign support, children can receive educational supplies and better opportunities to continue learning.",
        image: "https://res.cloudinary.com/dkgeren05/image/upload/v1790742847/success-2-education_jkrrt7.jpg",
    },
    {
        category: "FOOD SUPPORT",
        title: "Bringing Food Support to Families",
        description:
            "Donations can help provide essential food packages to families and communities facing difficult circumstances.",
        image: "https://res.cloudinary.com/dkgeren05/image/upload/v1790742842/success-3-food_x6lksd.jpg",
    },
    {
        category: "HEALTHCARE",
        title: "Supporting Community Healthcare",
        description:
            "Community support helps make basic healthcare assistance more accessible to people who need it.",
        image: "https://res.cloudinary.com/dkgeren05/image/upload/v1790743742/success-8-healthCare_ctvm0y.jpg",
    },
];

const OurSuccessStories = () => {
    return (
        <main className={styles.successPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}>
                        OUR SUCCESS STORIES
                    </span>

                    <h1>
                        Every Act of Kindness
                        <span> Creates a Story</span>
                    </h1>

                    <p>
                        Behind every donation is a person, a family, or a
                        community that can benefit from support. Discover the
                        meaningful stories created through the HelpTogether
                        community.
                    </p>
                </div>

                <div className={styles.heroImage}>
                    <div className={styles.imageWrapper}>
                        <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742833/success-1-hero_eh7uif.jpg" alt="HelpTogether Success Stories" />
                    </div>
                </div>
            </section>

            <section className={styles.storiesSection}>
                <div className={styles.sectionHeading}>
                    <span>STORIES OF IMPACT</span>

                    <h2>Making a Difference Together</h2>

                    <p>
                        Every successful campaign represents people coming
                        together to support a meaningful cause.
                    </p>
                </div>

                <div className={styles.storiesGrid}>
                    {successStories.map((story, index) => (
                        <article
                            className={styles.storyCard}
                            key={story.title}
                        >
                            <div className={styles.storyImage}>
                                <img
                                    src={story.image}
                                    alt={story.title}
                                />

                                <span>{String(index + 1).padStart(2, "0")}</span>
                            </div>

                            <div className={styles.storyContent}>
                                <span className={styles.storyCategory}>
                                    {story.category}
                                </span>

                                <h3>{story.title}</h3>

                                <p>{story.description}</p>

                                <div className={styles.storyLine}></div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.featuredSection}>
                <div className={styles.featuredImage}>
                    <div className={styles.imageWrapper}>
                        <img
                            src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742824/success-4-comm_unity_hyfz5q.jpg"
                            alt="Community Success Story"
                        />
                    </div>
                </div>

                <div className={styles.featuredContent}>
                    <span className={styles.sectionLabel}>
                        THE POWER OF TOGETHER
                    </span>

                    <h2>
                        Small Contributions Can Create
                        <span> Meaningful Change</span>
                    </h2>

                    <p>
                        A successful campaign is more than reaching a financial
                        goal. It represents people choosing to care, support,
                        and take action for a cause that matters.
                    </p>

                    <p>
                        HelpTogether brings donors and communities together so
                        that every contribution can become part of a bigger
                        story of kindness and positive change.
                    </p>

                    <div className={styles.impactPoints}>
                        <div className={styles.impactPoint}>
                            <span>01</span>
                            <div>
                                <h4>People Helping People</h4>
                                <p>
                                    Communities come together to support those
                                    who need help.
                                </p>
                            </div>
                        </div>

                        <div className={styles.impactPoint}>
                            <span>02</span>
                            <div>
                                <h4>Causes That Matter</h4>
                                <p>
                                    Donations support campaigns focused on
                                    meaningful community needs.
                                </p>
                            </div>
                        </div>

                        <div className={styles.impactPoint}>
                            <span>03</span>
                            <div>
                                <h4>Growing Impact</h4>
                                <p>
                                    Every successful campaign becomes part of
                                    our growing impact story.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.momentsSection}>
                <div className={styles.sectionHeading}>
                    <span>SUCCESS IN MOMENTS</span>

                    <h2>Moments That Matter</h2>

                    <p>
                        The impact of kindness can be seen in the moments when
                        people come together to help one another.
                    </p>
                </div>

                <div className={styles.momentsGrid}>
                    <div className={styles.momentLarge}>
                        <div className={styles.momentImage}>
                            <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790743734/success-7-community_atyom5.jpg" alt="Success Story Moment" />
                        </div>

                        <div className={styles.momentOverlay}>
                            <span>COMMUNITY</span>
                            <h3>Working Together for a Better Tomorrow</h3>
                        </div>
                    </div>

                    <div className={styles.momentSmall}>
                        <div className={styles.momentImage}>
                            <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742829/success-5-education-momentum-matter_hzd8vz.jpg" alt="Education Success Story" />
                        </div>

                        <div className={styles.momentText}>
                            <span>EDUCATION</span>
                            <h3>Supporting Learning Opportunities</h3>
                        </div>
                    </div>

                    <div className={styles.momentSmall}>
                        <div className={styles.momentImage}>
                            <img src="https://res.cloudinary.com/dkgeren05/image/upload/v1790742836/success-6-food-momrntum-matter_kmhyak.jpg" alt="Food Support Success Story" />
                        </div>

                        <div className={styles.momentText}>
                            <span>FOOD SUPPORT</span>
                            <h3>Sharing Support With Families</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.bottomSection}>
                <span>SMALL ACTS . BIG CHANGES</span>

                <h2>
                    Your Support Could Become
                    <br />
                    Our Next Success Story.
                </h2>

                <p>
                    Every donation and every helping hand can contribute to
                    creating another meaningful story of positive change.
                </p>
            </section>
        </main>
    );
};

export default OurSuccessStories;