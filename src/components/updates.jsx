import { useEffect, useState } from 'react';
import styles from '../styles/updates.module.css'
import GetUpdates from '../apis/updates/updates.get';

function CampaignsUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        GetUpdates()
            .then((data) => setUpdates(data))
            .catch((err) => console.error(err))
    }, [])
    return (
        <>
            {/*Make a Hero Section*/}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>Together for a Brighter Future</span>

                    <h1>See How Every Campaign<span>is Making Progress</span></h1>

                    <p>
                        Stay connected with the latest progress, milestones, and important updatesfrom our campaigns.
                    </p>

                    <div className={styles.herobadges}>
                        <p>Real Peoples Real Stories</p>
                        <p>Transparent & Trusted</p>
                    </div>
                </div>
            </section>

            {/*Make a Updates Section*/}

            {
                updates.map((update) => {
                    const formatDate = (date) => {
                        return new Date(date)
                            .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "2-digit"
                            })
                            .toUpperCase()
                            .replace(/ /g, " ")
                    }
                    return (
                        <section key={update.id} className={styles.updatesSections}>
                            <div className={styles.updateContent}>
                                <div className={styles.updatesDate}>
                                    <p>{formatDate(update.createdAt)}</p>
                                    <span>{update.causeName}</span>
                                </div>
                                <div className={styles.updateTitle}>
                                    <h3>{update.title}</h3>
                                </div>
                                <div className={styles.updatesDetails}>
                                    <p>{update.description}</p>
                                </div>
                            </div>
                            <div className={styles.imgDiv}>
                                <img src={update.imageUrl} alt="" />
                            </div>
                        </section>
                    )
                })
            }

        </>
    )
}

export default CampaignsUpdates;