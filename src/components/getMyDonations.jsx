import { useEffect, useState } from 'react';
import styles from '../styles/getMyDonations.module.css'
import GetMyDonation from '../apis/donations/getmyDonations.get';

const formatAmount = (amount, currency = 'PKR') => `${currency} ${Number(amount || 0).toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;

const formatDate = (date) => date ? new Date(date).toLocaleString('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
}) : 'Date unavailable';

const getDonationName = (donation) => donation.campaign?.title || donation.serviceGift?.title || donation.serviceGift?.name || 'Donation';

const getDonationType = (donation) => donation.campaign ? 'Campaign' : 'Service gift';

const getStatusLabel = (status = '') => status.charAt(0) + status.slice(1).toLowerCase();

function GetMyDonations() {
    const [mydonations, setMyDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [error, setError] = useState('');
    const userName = localStorage.getItem('userName') || 'User';
    const userId = localStorage.getItem('userId') || 'Unavailable';
    const userEmail = localStorage.getItem('userEmail') || 'Unavailable';

    useEffect(() => {
        GetMyDonation()
            .then((data) => setMyDonations(Array.isArray(data) ? data : []))
            .catch((fetchError) => {
                console.error('Failed to fetch my donations:', fetchError);
                setError('We could not load your donations right now.');
            });
    }, []);

    const totalDonated = mydonations.reduce((sum, donation) => (
        donation.paymentStatus === 'SUCCEEDED' ? sum + Number(donation.amount || 0) : sum
    ), 0);

    const downloadReceipt = (donation) => {
        const targetName = getDonationName(donation);
        const receipt = `
            <!doctype html><html><head><meta charset="utf-8"><title>Donation receipt</title>
            <style>body{font-family:Arial,sans-serif;color:#17324d;max-width:680px;margin:40px auto;padding:32px;border:1px solid #d7e7ef}h1{color:#159957}dt{font-weight:bold;margin-top:14px}dd{margin:4px 0 0}</style>
            </head><body><h1>Help Together</h1><h2>Donation receipt</h2>
            <dl><dt>Donor</dt><dd>${userName}</dd><dt>User ID</dt><dd>${userId}</dd><dt>Email</dt><dd>${userEmail}</dd>
            <dt>Transaction ID</dt><dd>${donation.stripePaymentIntentId || donation.stripeSessionId || donation.id}</dd>
            <dt>Purpose</dt><dd>${targetName} (${getDonationType(donation)})</dd><dt>Amount</dt><dd>${formatAmount(donation.amount, donation.currency)}</dd>
            <dt>Payment status</dt><dd>${getStatusLabel(donation.paymentStatus)}</dd><dt>Payment method</dt><dd>${donation.paymentMethod || 'Unavailable'}</dd>
            <dt>Donation date</dt><dd>${formatDate(donation.createdAt)}</dd></dl></body></html>`;
        const url = URL.createObjectURL(new Blob([receipt], { type: 'text/html' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `donation-receipt-${donation.id}.html`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {/*Hero Section*/}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>My <span>Donations</span></h1>
                    <p>Your contributions are helping create positive change. <span>Thank you for being a part something bigger</span></p>
                </div>
            </section>

            {/*User Progress*/}
            <section className={styles.userProgress}>
                <div className={styles.progressTotalDonated}>
                    <div className={styles.progressEmoji}><span>💵</span></div>
                    <div className={styles.progressContent}>
                        <h1>Total Donated</h1>
                        <p>{formatAmount(totalDonated)}</p>
                    </div>
                </div>

                <div className={styles.progressdonationsmake}>
                    <div className={styles.progressEmoji}><span>🤍</span></div>
                    <div className={styles.progressContent}>
                        <h1>Total Donations</h1>
                        <p>{mydonations.length}</p>
                    </div>
                </div>
            </section>

            {/*Make a donation histry section*/}
            <section className={styles.donationHistory}>
                <div className={styles.historyContent}>
                    <div className={styles.histryHeader}>
                        <h1>Donation History</h1>
                        <p>Here are all the donations you've made so far. Keep making a difference!</p>
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {!error && mydonations.length === 0 && <p className={styles.emptyMessage}>No donations found yet.</p>}
                    {mydonations.map((donation) => {
                        const status = (donation.paymentStatus || 'PENDING').toLowerCase();
                        const image = donation.campaign?.imageUrl || donation.serviceGift?.imageUrl;
                        return (
                            <div key={donation.id} className={`${styles.historyBody} ${styles[status]}`}>
                                <div className={styles.historyTop}>
                                    <div className={styles.historyImg}>
                                        {image ? <img src={image} alt={getDonationName(donation)} /> : <div className={styles.imagePlaceholder}>❤</div>}
                                    </div>
                                    <div className={styles.historyDetails}>
                                        <span className={styles.donationType}>{getDonationType(donation)}</span>
                                        <h4>{getDonationName(donation)}</h4>
                                        <p>{formatDate(donation.createdAt)}</p>
                                    </div>
                                </div>
                                <div className={styles.historyAmount}>
                                    <p>{formatAmount(donation.amount, donation.currency)}</p>
                                    <span>Donated</span>
                                </div>
                                <div className={styles.historyStatus}>
                                    <p>{getStatusLabel(donation.paymentStatus || 'PENDING')}</p>
                                </div>
                                <button type="button" className={styles.historyBtn} onClick={() => setSelectedDonation(donation)}>View receipt</button>
                            </div>
                        );
                    })}
                </div>
            </section>
            {selectedDonation && (
                <div className={styles.modalBackdrop} role="presentation" onClick={() => setSelectedDonation(null)}>
                    <section className={styles.receiptModal} role="dialog" aria-modal="true" aria-labelledby="receipt-title" onClick={(event) => event.stopPropagation()}>
                        <div className={styles.receiptHeader}>
                            <div><span className={styles.receiptEyebrow}>Help Together</span><h2 id="receipt-title">Donation receipt</h2></div>
                            <button type="button" className={styles.closeButton} aria-label="Close receipt" onClick={() => setSelectedDonation(null)}>×</button>
                        </div>
                        <div className={styles.receiptStatus} data-status={(selectedDonation.paymentStatus || 'PENDING').toLowerCase()}>{getStatusLabel(selectedDonation.paymentStatus || 'PENDING')}</div>
                        <dl className={styles.receiptDetails}>
                            <div><dt>Donor</dt><dd>{userName}</dd></div><div><dt>User ID</dt><dd>{userId}</dd></div>
                            <div><dt>Email</dt><dd>{userEmail}</dd></div><div><dt>Transaction ID</dt><dd>{selectedDonation.stripePaymentIntentId || selectedDonation.stripeSessionId || selectedDonation.id}</dd></div>
                            <div><dt>Purpose</dt><dd>{getDonationName(selectedDonation)}</dd></div><div><dt>Type</dt><dd>{getDonationType(selectedDonation)}</dd></div>
                            <div><dt>Amount</dt><dd>{formatAmount(selectedDonation.amount, selectedDonation.currency)}</dd></div><div><dt>Payment method</dt><dd>{selectedDonation.paymentMethod || 'Unavailable'}</dd></div>
                            <div><dt>Donated on</dt><dd>{formatDate(selectedDonation.createdAt)}</dd></div>
                        </dl>
                        <button type="button" className={styles.downloadButton} onClick={() => downloadReceipt(selectedDonation)}>Download receipt</button>
                    </section>
                </div>
            )}
        </>
    )
}

export default GetMyDonations;