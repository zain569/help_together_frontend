import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GetOneCampaign from '../apis/campaignsAPI/getOneCampaign.get';
import GetOneService from '../apis/serviceandgiftsAPIS/getoneService';
import { readAuthSession } from '../utils/authSession';
import styles from '../styles/makeaDonation.module.css';

function formatAmount(value) {
    return Number(value || 0).toLocaleString();
}

function MakeaDonation() {
    const { type, id } = useParams();
    const isServiceDonation = type?.toLowerCase() === 'service';
    const [donationTarget, setDonationTarget] = useState(null);
    const [amount, setAmount] = useState(isServiceDonation ? 0 : 1000);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        let isCurrent = true;

        const getDonationTarget = isServiceDonation ? GetOneService(id) : GetOneCampaign(id);

        getDonationTarget
            .then((data) => {
                if (!isCurrent) return;
                const target = isServiceDonation ? data?.serviceGift || data : data?.campaign || data;
                setDonationTarget(target);
                if (isServiceDonation) setAmount(Number(target?.price || 0));
            })
            .catch((fetchError) => {
                if (isCurrent) setError(`Unable to load this ${isServiceDonation ? 'service' : 'campaign'}. Please try again.`);
                console.error('Donation target fetch failed:', fetchError);
            })
            .finally(() => {
                if (isCurrent) setLoading(false);
            });

        return () => { isCurrent = false; };
    }, [id, isServiceDonation]);

    if (loading) return <main className={styles.state}>Loading donation details...</main>;
    if (error || !donationTarget) return <main className={styles.state}>{error || 'Donation details not found.'}</main>;

    const title = donationTarget.title || donationTarget.name || 'Donation';
    const raised = Number(donationTarget.collectedAmount || donationTarget.raisedAmount || 0);
    const goal = Number(donationTarget.goalAmount || donationTarget.targetAmount || 0);
    const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
    const targetImage = donationTarget.image || donationTarget.imageUrl || donationTarget.coverImage || '/campaign-section-hero.png';
    const description = donationTarget.description || 'Help this cause create lasting change for the people and communities it supports.';
    const userId = readAuthSession()?.user?.id || localStorage.getItem('userId') || '';

    const donationDetails = {
        amount: Number(amount),
        userId,
        ...(isServiceDonation ? { serviceGiftId: id } : { campaignId: id }),
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError('');
        setIsSubmitted(false);

        if (!donationDetails.userId) {
            setSubmitError('Please log in before making a donation.');
            return;
        }

        if (!donationDetails.amount || donationDetails.amount < 0.01) {
            setSubmitError('Please enter a valid donation amount.');
            return;
        }

        setIsSubmitting(true);
        try {
            const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
            const response = await fetch(`${backendApi}donation`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationDetails),
            });

            const donationResponse = await response.json();

            if (!response.ok) {
                throw new Error(donationResponse?.message || `Donation failed (${response.status})`);
            }

            if (donationResponse?.checkoutUrl) {
                window.location.assign(donationResponse.checkoutUrl);
                return;
            }

            setIsSubmitted(true);
        } catch (submitFetchError) {
            console.error('Donation submission failed:', submitFetchError);
            setSubmitError('We could not process your donation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={styles.page}>
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <p className={styles.eyebrow}>Small acts. Big changes.</p>
                    <h1>Make a <span>Donation</span></h1>
                    <p>Your support brings hope, helps communities,<br />and creates a better tomorrow.</p>
                </div>
            </section>

            <section className={styles.donationLayout}>
                <article className={styles.campaignCard}>
                    <div className={styles.campaignIntro}>
                        <img className={styles.campaignImage} src={targetImage} alt={title} />
                        <div>
                            <span className={styles.badge}>{isServiceDonation ? 'Service gift' : 'Campaign'}</span>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>

                    <div className={styles.progressSummary}>
                        <div><span>Collected</span><strong>PKR {formatAmount(raised)}</strong></div>
                        <div className={styles.goal}><span>Goal</span><strong>PKR {formatAmount(goal)}</strong></div>
                    </div>
                    <div className={styles.progressTrack} aria-label={`${Math.round(progress)} percent funded`}><span style={{ width: `${progress}%` }} /></div>
                    <p className={styles.progressPercent}>{Math.round(progress)}% funded</p>

                    <div className={styles.metaGrid}>
                        <div><span className={styles.metaIcon}>+</span><p><b>{isServiceDonation ? 'Gift price' : 'Category'}</b>{isServiceDonation ? `PKR ${formatAmount(amount)}` : donationTarget.category || 'Community'}</p></div>
                        <div><span className={styles.metaIcon}>+</span><p><b>Beneficiaries</b>{donationTarget.beneficiaries || 'Many families'}</p></div>
                        <div><span className={styles.metaIcon}>+</span><p><b>{isServiceDonation ? 'Availability' : 'Started'}</b>{isServiceDonation ? 'Available now' : donationTarget.startDate ? new Date(donationTarget.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</p></div>
                    </div>

                    <div className={styles.impactNote}>
                        <span className={styles.heartIcon}>♡</span>
                        <div><strong>Every contribution counts!</strong><p>Even a small donation can make a big difference in someone's life.</p></div>
                    </div>
                </article>

                <form className={styles.donationForm} onSubmit={handleSubmit}>
                    <h2>Donation Details</h2>
                    {isServiceDonation ? (
                        <div className={styles.fixedAmount}>
                            <span>Fixed service gift amount</span>
                            <strong>PKR {formatAmount(amount)}</strong>
                        </div>
                    ) : (
                        <>
                            <label className={styles.fieldLabel} htmlFor="custom-amount">Enter donation amount</label>
                            <div className={styles.amountInput}><span>PKR</span><input id="custom-amount" type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount" /></div>
                        </>
                    )}

                    <fieldset className={styles.paymentFieldset}>
                        <legend>Choose Payment Method</legend>
                        <div className={styles.paymentOptions}>
                            <div className={`${styles.paymentCard} ${styles.selected}`}><span className={styles.paymentIcon}>▣</span><span><strong>Card payment</strong><small>Credit / Debit Card</small></span><b>Selected</b></div>
                        </div>
                    </fieldset>

                    {submitError && <p className={styles.formError} role="alert">{submitError}</p>}
                    {isSubmitted && <p className={styles.formSuccess} role="status">Donation created successfully.</p>}
                    <button className={styles.submitButton} type="submit" disabled={isSubmitting || !Number(amount)}><span>♡</span>{isSubmitting ? 'Processing...' : 'Donate Now'}</button>
                    <p className={styles.securityNote}>▣ Your payment information is safe and secure.</p>
                    <div className={styles.formFooter}><Link to={isServiceDonation ? '/service-gifts' : `/campaigns/${id}`}>← &nbsp;Back to {isServiceDonation ? 'Services' : 'Campaign'}</Link></div>
                </form>
            </section>
        </main>
    );
}

export default MakeaDonation;