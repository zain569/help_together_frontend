import { campaignDateDetails, formatCampaignDate } from '../utils/campaignDates';
import styles from '../styles/campaignDateProgress.module.css';

function CampaignDateProgress({ campaign }) {
    const { startDate, endDate, daysLeft, progress } = campaignDateDetails(campaign);
    const barProgress = progress ?? 0;
    const dayLabel = daysLeft === null
        ? 'No deadline'
        : `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`;

    return (
        <div className={styles.timeline} aria-label="Campaign schedule">
            <div className={styles.dateLabel}>
                <span>Start date</span>
                <strong>{formatCampaignDate(startDate)}</strong>
            </div>
            <div className={styles.timelineTrack}>
                <div
                    className={styles.track}
                    role="progressbar"
                    aria-label={daysLeft === null ? 'Campaign has no end date' : 'Campaign time elapsed'}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={Math.round(barProgress)}
                >
                    <span style={{ width: `${barProgress}%` }} />
                </div>
                <strong className={styles.daysLeft}>{dayLabel}</strong>
            </div>
            <div className={`${styles.dateLabel} ${styles.endDate}`}>
                <span>End date</span>
                <strong>{formatCampaignDate(endDate)}</strong>
            </div>
        </div>
    );
}

export default CampaignDateProgress;
