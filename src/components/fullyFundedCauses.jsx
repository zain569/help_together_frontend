import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/fundedCampaigns.module.css';
import { useCurrency } from '../utils/useCurrency';
import FundedCampaignsApi from '../apis/campaignsAPI/fundedCampaigns';

function FundedCampaigns() {
    const { formatCurrency } = useCurrency();
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        FundedCampaignsApi()
            .then((data) => {
                const fundedCampaigns = Array.isArray(data)
                    ? data
                    : data?.campaigns || data?.data || [];
                setCampaigns(Array.isArray(fundedCampaigns) ? fundedCampaigns : []);
            })
            .catch((error) => {
                console.error(error);
                setHasError(true);
            })
            .finally(() => setIsLoading(false));
    }, [])

    const totalRaised = campaigns.reduce(
        (total, campaign) => total + (Number(campaign.collectedAmount) || 0),
        0
    );

    return (
        <main className={styles.fundedPage}>
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <span className={styles.eyebrow}>The impact of giving together</span>
                    <h1>Every finished campaign is a <span>promise fulfilled.</span></h1>
                    <p>These causes reached their funding goals because people chose to show up. Explore the change your generosity helped make possible.</p>
                    <a className={styles.heroLink} href="#funded-campaigns">Explore funded campaigns <span aria-hidden="true">↓</span></a>
                </div>
                <div className={styles.impactPanel} aria-label="Fundraising impact">
                    <span className={styles.impactLabel}>Together, we raised</span>
                    <strong>{formatCurrency(totalRaised)}</strong>
                    <span className={styles.impactDivider} />
                    <span className={styles.impactCount}>{campaigns.length} {campaigns.length === 1 ? 'campaign' : 'campaigns'} fully funded</span>
                </div>
            </section>

            <section className={styles.campaignsSection} id="funded-campaigns">
                <div className={styles.sectionHeading}>
                    <div>
                        <span className={styles.sectionEyebrow}>Goals reached. Lives changed.</span>
                        <h2>Funded campaigns</h2>
                    </div>
                    {!isLoading && !hasError && (
                        <span className={styles.resultCount}>{campaigns.length} completed</span>
                    )}
                </div>

                {isLoading ? (
                    <div className={styles.stateMessage} role="status">Loading completed campaigns...</div>
                ) : hasError ? (
                    <div className={styles.stateMessage} role="alert">We couldn't load the funded campaigns right now. Please try again later.</div>
                ) : campaigns.length === 0 ? (
                    <div className={styles.stateMessage}>No funded campaigns to show yet. Check back soon.</div>
                ) : (
                    <div className={styles.campaignGrid}>
                        {campaigns.map((campaign, index) => {
                            const raised = Number(campaign.collectedAmount) || 0;
                            const goal = Number(campaign.goalAmount) || 0;
                            const campaignId = campaign.id || campaign._id;
                            const image = campaign.image || campaign.imageUrl || campaign.coverImage;

                            return (
                                <article
                                    className={styles.campaignCard}
                                    key={campaignId || `${campaign.title || campaign.name || 'funded'}-${index}`}
                                    style={{ '--card-index': index }}
                                >
                                    <div className={styles.campaignImageContainer}>
                                        {image ? (
                                            <img
                                                className={styles.campaignImage}
                                                src={image}
                                                alt={campaign.title || campaign.name || 'Funded campaign'}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className={styles.imagePlaceholder} aria-hidden="true">HelpTogether</div>
                                        )}
                                        <span className={styles.completedBadge}><span aria-hidden="true" /> Fully funded</span>
                                        {campaign.cause?.name && <span className={styles.causeBadge}>{campaign.cause.name}</span>}
                                    </div>
                                    <div className={styles.campaignDetails}>
                                        <h3>{campaign.title || campaign.name || 'A community campaign'}</h3>
                                        <p className={styles.description}>{campaign.description || 'Thanks to a generous community, this campaign reached its goal.'}</p>
                                        <div className={styles.amountRow}>
                                            <span>Raised</span>
                                            <strong>{formatCurrency(raised)}</strong>
                                        </div>
                                        <div
                                            className={styles.progressTrack}
                                            role="progressbar"
                                            aria-label={`${campaign.title || campaign.name || 'Campaign'} funding progress`}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            aria-valuenow="100"
                                        >
                                            <span />
                                        </div>
                                        <div className={styles.goalRow}>
                                            <span>Goal reached</span>
                                            <span>{formatCurrency(goal)} goal</span>
                                        </div>
                                        {campaignId && (
                                            <Link className={styles.storyLink} to={`/campaigns/${campaignId}`}>
                                                View campaign <span aria-hidden="true">-&gt;</span>
                                            </Link>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    )
}

export default FundedCampaigns;