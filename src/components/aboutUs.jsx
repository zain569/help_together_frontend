import styles from "../styles/about-us.module.css";

const AboutUs = () => {
  return (
    <main className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>ABOUT US</span>

          <h1>
            Together We Can Make
            <span> A Difference</span>
          </h1>

          <p>
            We are committed to helping people in need by connecting
            compassionate donors with meaningful causes and campaigns.
          </p>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.imageShape}>
            <div className={styles.imageContent}>
              <span><img src="favicon.png" alt="" /></span>
              <h3>Help Together</h3>
              <p>Small help can create a big change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.sectionHeading}>
          <span>OUR MISSION</span>
          <h2>Helping People, Changing Lives</h2>
          <p>
            Our mission is to make giving simple, transparent, and accessible
            so that everyone has an opportunity to support people and causes
            that need help.
          </p>
        </div>

        <div className={styles.missionCards}>
          <div className={styles.missionCard}>
            <div className={styles.cardIcon}>❤️</div>
            <h3>Compassion</h3>
            <p>
              We believe every person deserves kindness, support, and an
              opportunity to build a better future.
            </p>
          </div>

          <div className={styles.missionCard}>
            <div className={styles.cardIcon}>🤝</div>
            <h3>Community</h3>
            <p>
              We bring donors and people in need together to create meaningful
              positive change.
            </p>
          </div>

          <div className={styles.missionCard}>
            <div className={styles.cardIcon}>🌱</div>
            <h3>Impact</h3>
            <p>
              Every contribution, no matter its size, can help create a lasting
              impact in someone's life.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.story}>
        <div className={styles.storyImage}>
          <div className={styles.storyBox}>
            <span>🤲</span>
            <strong>Together</strong>
            <small>We Can Help</small>
          </div>
        </div>

        <div className={styles.storyContent}>
          <span className={styles.smallTitle}>OUR STORY</span>

          <h2>
            A Platform Built
            <span> For Helping Others</span>
          </h2>

          <p>
            Help Together was created with a simple idea: make it easier for
            people to support others who are going through difficult times.
          </p>

          <p>
            Our platform allows people to discover fundraising campaigns and
            contribute toward causes that matter to them. We believe that when
            people come together, even small contributions can become a
            powerful source of hope.
          </p>

          <div className={styles.storyPoints}>
            <div>
              <span>✓</span>
              <p>Simple and accessible donations</p>
            </div>

            <div>
              <span>✓</span>
              <p>Support meaningful campaigns</p>
            </div>

            <div>
              <span>✓</span>
              <p>Building a stronger community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.sectionHeading}>
          <span>OUR VALUES</span>
          <h2>What We Believe In</h2>
        </div>

        <div className={styles.valueGrid}>
          <div className={styles.valueItem}>
            <h3>01</h3>
            <div>
              <h4>Transparency</h4>
              <p>
                We believe that people should clearly understand where their
                support is going.
              </p>
            </div>
          </div>

          <div className={styles.valueItem}>
            <h3>02</h3>
            <div>
              <h4>Kindness</h4>
              <p>
                Helping others starts with empathy, understanding, and
                compassion.
              </p>
            </div>
          </div>

          <div className={styles.valueItem}>
            <h3>03</h3>
            <div>
              <h4>Equality</h4>
              <p>
                Everyone deserves the opportunity to receive support and hope.
              </p>
            </div>
          </div>

          <div className={styles.valueItem}>
            <h3>04</h3>
            <div>
              <h4>Positive Change</h4>
              <p>
                We want every act of generosity to contribute toward a better
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div>
          <span>MAKE A DIFFERENCE</span>
          <h2>Be Part of Something Meaningful</h2>
          <p>
            Your support can help someone take the next step toward a better
            future.
          </p>
        </div>

        <button className={styles.ctaButton}>Explore Campaigns</button>
      </section>
    </main>
  );
};

export default AboutUs;