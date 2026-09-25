import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GetCampaign from '../apis/campaignsAPI/getCampaign.get';
import GetAllCampaigns from '../apis/campaignsAPI/getallCampigns.get';
import styles from '../styles/campaignGetOne.module.css';

function formatDate(dateValue) {
	if (!dateValue) return 'Not available';

	const date = new Date(dateValue);
	return Number.isNaN(date.getTime())
		? dateValue
		: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysLeft(endDate) {
	if (!endDate) return 0;

	const difference = new Date(endDate).getTime() - Date.now();
	return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

function amount(value) {
	return Number(value || 0).toLocaleString();
}

function CampaignsGetOne() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [campaign, setCampaign] = useState(null);
	const [relatedCampaigns, setRelatedCampaigns] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let isCurrent = true;

		Promise.all([GetCampaign(id), GetAllCampaigns()])
			.then(([campaignData, campaignList]) => {
				if (!isCurrent) return;

				const currentCampaign = campaignData?.campaign || campaignData;
				const campaigns = Array.isArray(campaignList)
					? campaignList
					: campaignList?.campaigns || [];
				const currentId = currentCampaign?.id || currentCampaign?._id || id;

				setCampaign(currentCampaign);
				setRelatedCampaigns(campaigns.filter((item) => (item.id || item._id) !== currentId).slice(0, 3));
			})
			.catch((fetchError) => {
				if (isCurrent) setError('Unable to load this campaign. Please try again.');
				console.error('Campaign details fetch failed:', fetchError);
			})
			.finally(() => {
				if (isCurrent) setLoading(false);
			});

		return () => { isCurrent = false; };
	}, [id]);

	if (loading) return <main className={styles.state}>Loading campaign...</main>;
	if (error || !campaign) return <main className={styles.state}>{error || 'Campaign not found.'}</main>;

	const raised = Number(campaign.collectedAmount || campaign.raisedAmount || 0);
	const goal = Number(campaign.goalAmount || campaign.targetAmount || 0);
	const remaining = Math.max(goal - raised, 0);
	const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
	const donors = campaign.donorsCount || campaign.donors || campaign.supporters || 0;
	const endDate = campaign.endDate || campaign.end_date;
	const campaignId = campaign.id || campaign._id || id;

	return (
		<main className={styles.page}>
			<section className={styles.detailsCard}>
				<div className={styles.imagePanel}>
					<img src={campaign.image || campaign.imageUrl || campaign.coverImage} alt={campaign.title || campaign.name} />
					<span className={styles.supporterBadge}>● {amount(donors)} Supporters</span>
				</div>

				<div className={styles.campaignInfo}>
					<span className={styles.badge}>♥ Featured Campaign</span>
					<h1>{campaign.title || campaign.name}</h1>
					<p className={styles.description}>{campaign.description}</p>

					<div className={styles.metaGrid}>
						<div><span>▣</span><p><b>End Date</b>{formatDate(endDate)}</p></div>
						<div><span>◷</span><p><b>Days Left</b>{getDaysLeft(endDate)} days</p></div>
						<div><span>♟</span><p><b>Donors</b>{amount(donors)}</p></div>
					</div>
				</div>

				<div className={styles.progressPanel}>
					<div className={styles.amountRow}><strong>PKR {amount(raised)}</strong><b>{Math.round(progress)}%</b></div>
					<p>raised of PKR {amount(goal)}</p>
					<div className={styles.progressTrack} aria-label={`${Math.round(progress)} percent raised`}><span style={{ width: `${progress}%` }} /></div>
					<div className={styles.moneyRow}><span>Money left</span><strong>PKR {amount(remaining)}</strong></div>
					<button type="button" onClick={() => navigate(`/donate/campaign/${campaignId}`)}>♥ Donate Now <span>→</span></button>
					<button type="button" className={styles.shareButton}>↗ Share Campaign</button>
				</div>
			</section>

			{relatedCampaigns.length > 0 && (
				<section className={styles.relatedSection}>
					<div className={styles.sectionHeading}>
						<span className={styles.badge}>Keep Making an Impact</span>
						<h2>Other Campaigns That Need Your Help</h2>
						<p>Every contribution brings another meaningful cause closer to its goal.</p>
					</div>
					<div className={styles.relatedGrid}>
						{relatedCampaigns.map((relatedCampaign) => {
							const relatedId = relatedCampaign.id || relatedCampaign._id;
							const relatedRaised = Number(relatedCampaign.collectedAmount || 0);
							const relatedGoal = Number(relatedCampaign.goalAmount || 0);
							const relatedProgress = relatedGoal > 0 ? Math.min((relatedRaised / relatedGoal) * 100, 100) : 0;

							return (
								<article className={styles.relatedCard} key={relatedId} onClick={() => navigate(`/campaigns/${relatedId}`)}>
									<img src={relatedCampaign.image || relatedCampaign.imageUrl || relatedCampaign.coverImage} alt="" />
									<div><h3>{relatedCampaign.title || relatedCampaign.name}</h3><p>{relatedCampaign.description}</p><div className={styles.smallTrack}><span style={{ width: `${relatedProgress}%` }} /></div><small>PKR {amount(relatedRaised)} raised</small></div>
								</article>
							);
						})}
					</div>
				</section>
			)}
		</main>
	);
}

export default CampaignsGetOne;
