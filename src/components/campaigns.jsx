import { useEffect, useState } from 'react'
import styles from '../styles/campaigns.module.css'
import GetAllCampaigns from '../apis/campaignsAPI/getallCampigns.get'
import { useNavigate } from 'react-router-dom'
import GetAllCauses from '../apis/causes/getAllCauses.get';
import FilteredCampaigns from '../apis/campaignsAPI/filtersCampaigns.get';

function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [causes, setCauses] = useState([]);
    const [page, setPage] = useState(1);
    const [causeId, setCauseId] = useState('');
    const [zakatEligible, setZakatEligible] = useState(false);
    const [urgent, setUrgent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaigns = causeId || zakatEligible || urgent
            ? FilteredCampaigns({ causeId, zakatEligible, urgent })
            : GetAllCampaigns({ page });

        fetchCampaigns
            .then((data) => setCampaigns(Array.isArray(data) ? data : data?.campaigns || []))
            .catch((error) => console.error('Campaigns fetch failed:', error))
    }, [page, causeId, zakatEligible, urgent])

    useEffect(() => {
        GetAllCauses()
            .then((data) => {
                const causeList = Array.isArray(data) ? data : []
                setCauses(causeList)
            })
            .catch((error) => console.error('Causes fetch failed:', error))
    }, [])

    return (
        <>
            {/*Hero Section*/}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>Together for a Brighter Future</span>

                    <h1>Together, We Can <span>Make a Difference</span></h1>

                    <p>HelpTogether is platform that connects kind hearts with peoples in need. Your support bring hope, create opportunities and change live.</p>

                    <div className={styles.herobadges}>
                        <p>Real Peoples Real Stories</p>
                        <p>100% Secure Donations</p>
                        <p>Transparent & Trusted</p>
                    </div>
                </div>
            </section>

            {/*Make a Causes Section*/}
            <section className={styles.causes}>
                <div className={styles.causesContent}>
                    <h1>Browse By Cause</h1>
                    <p>Choose a cause that matter to you and start making an impact.</p>

                    <div className={styles.causesBadges}>
                        <button
                            className={`${styles.causeBadge} ${causeId === '' ? styles.active : ''}`}
                            type="button"
                            aria-pressed={causeId === ''}
                            onClick={() => { setCauseId(''); setPage(1) }}
                        >
                            All Causes
                        </button>
                        {causes.map((cause) => (
                            <button
                                key={cause.id}
                                className={`${styles.causeBadge} ${causeId === cause.id ? styles.active : ''}`}
                                type="button"
                                aria-pressed={causeId === cause.id}
                                onClick={() => {
                                    setCauseId(cause.id); setPage(1);
                                }}
                            >
                                <img className={styles.causeImage} src={cause.imageUrl} alt="" />
                                <span>{cause.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.campaignFilters} aria-label="Campaign filters">
                        <label className={styles.filterOption}>
                            <input
                                type="checkbox"
                                checked={zakatEligible}
                                onChange={(event) => { setZakatEligible(event.target.checked); setPage(1) }}
                            />
                            Zakat eligible
                        </label>
                        <label className={styles.filterOption}>
                            <input
                                type="checkbox"
                                checked={urgent}
                                onChange={(event) => { setUrgent(event.target.checked); setPage(1) }}
                            />
                            Urgent
                        </label>
                    </div>
                </div>
            </section>

            {/*Add A campaigns section*/}
            <section className={styles.campaignsSection}>
                <div className={styles.campaignsContent}>
                    <div className={styles.campaignGrid}>
                        {campaigns.slice(0, 8).map((campaign, index) => {
                            const raised = Number(campaign.collectedAmount)
                            const goal = Number(campaign.goalAmount)
                            const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0

                            return (
                                <article className={styles.campaignCard} key={campaign.id || campaign._id || index}>
                                    <img
                                        className={styles.campaignImage}
                                        src={campaign.image || campaign.imageUrl || campaign.coverImage}
                                        alt={campaign.title || campaign.name || 'Campaign'}
                                    />
                                    <div className={styles.campaignDetails}>
                                        <h2>{campaign.title || campaign.name || 'Support a campaign'}</h2>
                                        <p>{campaign.description || 'Help create a brighter future for people in need.'}</p>
                                        <div className={styles.progressLabels}>
                                            <span><i style={{ color: '#607b91' }}>{campaign.collectedAmount}</i> raised of {campaign.goalAmount}</span>
                                            <span>{Math.round(progress)}%</span>
                                        </div>
                                        <div className={styles.progressTrack}>
                                            <span style={{ width: `${progress}%` }} />
                                        </div>
                                        <button onClick={() => { navigate(`/donate/${campaign.id}`) }} className={styles.donateButton}>Donate Now</button>
                                    </div>
                                </article>
                            )
                        })}
                    </div>

                    <nav className={styles.pagination} aria-label="Campaign pages">
                        {[1, 2, 3, 4, 5].map((pageNumber) => (
                            <button className={pageNumber === page ? styles.activePage : ''} key={pageNumber} type="button" onClick={() => { setPage(pageNumber) }}>
                                {pageNumber}
                            </button>
                        ))}
                    </nav>
                </div>
            </section>
        </>
    )
}

export default Campaigns;