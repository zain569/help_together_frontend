import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GetOneCampaign from '../apis/campaignsAPI/getOneCampaign.get';
import GetOneService from '../apis/serviceandgiftsAPIS/getoneService';
import { readAuthSession } from '../utils/authSession';
import styles from '../styles/makeaDonation.module.css';
import { useCurrency } from '../utils/useCurrency';
import MakeSubscriptions from '../apis/donations/makeSubscription';
import CreateNormalDonation from '../apis/donations/createNormalDonation.post';

function MakeaDonation() {
    const { type, id } = useParams();
    const { currencySymbol, exchangeRate, formatCurrency } = useCurrency();
    const isServiceDonation = type?.toLowerCase() === 'service';
    const [donationTarget, setDonationTarget] = useState(null);
    const [amount, setAmount] = useState(isServiceDonation ? 0 : 1000);
    const [customAmount, setCustomAmount] = useState(null);
    const amountRef = useRef(isServiceDonation ? 0 : 1000);
    const [donationType, setDonationType] = useState('general');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [subscriptionType, setSubscriptionType] = useState('general');
    const [paymentMethod, setPaymentMethod] = useState('STRIPE');

    useEffect(() => {
        let isCurrent = true;

        const getDonationTarget = isServiceDonation ? GetOneService(id) : GetOneCampaign(id);

        getDonationTarget
            .then((data) => {
                if (!isCurrent) return;
                const target = isServiceDonation ? data?.serviceGift || data : data?.campaign || data;
                setDonationTarget(target);
                if (isServiceDonation) {
                    const giftPrice = Number(target?.price || 0);
                    amountRef.current = giftPrice;
                    setAmount(giftPrice);
                }
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

    useEffect(() => {
        setCustomAmount((Number(amountRef.current) * exchangeRate).toFixed(2));
    }, [exchangeRate]);

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
        donationType,
        paymentMethod,
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

        if (!donationDetails.amount || donationDetails.amount < 150) {
            setSubmitError(`Please enter a valid donation amount above then ${formatCurrency(150)}.`);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await CreateNormalDonation(donationDetails);

            if (!response.ok) {
                throw new Error(response?.message || `Donation failed (${response?.status})`);
            }

            if (response.checkoutUrl && paymentMethod === "STRIPE") {
                window.location.assign(response.checkoutUrl);
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

    const handleSubscription = async (frequency) => {
        const userData = {
            frequency,
            subscriptionType,
        };

        try {
            const response = await MakeSubscriptions(userData);

            if (response?.url) {
                window.location.assign(response.url);
            }
        } catch (err) {
            console.error('Subscription failed:', err);
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
                        <div><span>Collected</span><strong>{formatCurrency(raised)}</strong></div>
                        <div className={styles.goal}><span>Goal</span><strong>{formatCurrency(goal)}</strong></div>
                    </div>
                    <div className={styles.progressTrack} aria-label={`${Math.round(progress)} percent funded`}><span style={{ width: `${progress}%` }} /></div>
                    <p className={styles.progressPercent}>{Math.round(progress)}% funded</p>

                    <div className={styles.metaGrid}>
                        <div><span className={styles.metaIcon}>+</span><p><b>{isServiceDonation ? 'Gift price' : 'Category'}</b>{isServiceDonation ? formatCurrency(amount) : donationTarget.category || 'Community'}</p></div>
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
                    <label className={styles.fieldLabel} htmlFor="donation-type">Donation Type</label>
                    <select
                        className={styles.donationTypeSelect}
                        id="donation-type"
                        name="donationType"
                        value={donationType}
                        onChange={(event) => setDonationType(event.target.value)}
                    >
                        <option value="general">General</option>
                        <option value="zakat">Zakat</option>
                        <option value="sadaqah">Sadaqah</option>
                    </select>
                    {isServiceDonation ? (
                        <div className={styles.fixedAmount}>
                            <span>Fixed service gift amount</span>
                            <strong>{formatCurrency(amount)}</strong>
                        </div>
                    ) : (
                        <>
                            <label className={styles.fieldLabel} htmlFor="custom-amount">Enter donation amount</label>
                            <div className={styles.amountInput}><span>{currencySymbol}</span><input id="custom-amount" type="number" min="0.01" step="0.01" value={customAmount ?? (Number(amount) * exchangeRate).toFixed(2)} onChange={(event) => {
                                const enteredAmount = event.target.value;
                                setCustomAmount(enteredAmount);
                                const baseAmount = enteredAmount === '' ? '' : Number(enteredAmount) / exchangeRate;
                                amountRef.current = baseAmount;
                                setAmount(baseAmount);
                            }} placeholder="Enter amount" /></div>
                        </>
                    )}

                    <fieldset className={styles.paymentFieldset}>
                        <legend>Choose Payment Method</legend>
                        <div className={styles.paymentOptions}>
                            <label className={`${styles.paymentCard} ${paymentMethod === 'STRIPE' ? styles.selected : ''}`}>
                                <input type="radio" name="paymentMethod" value="STRIPE" checked={paymentMethod === 'STRIPE'} onChange={(event) => setPaymentMethod(event.target.value)} />
                                <span className={styles.paymentIcon}>▣</span>
                                <span><strong>Card payment</strong><small>Credit / Debit Card</small></span>
                                {paymentMethod === 'STRIPE' && <b>Selected</b>}
                            </label>
                            <label className={`${styles.paymentCard} ${paymentMethod === 'JAZZCASH' ? styles.selected : ''}`}>
                                <input type="radio" name="paymentMethod" value="JAZZCASH" checked={paymentMethod === 'JAZZCASH'} onChange={(event) => setPaymentMethod(event.target.value)} />
                                <span className={styles.paymentIcon}>☏</span>
                                <span><strong>JazzCash</strong><small>Pay with your JazzCash account</small></span>
                                {paymentMethod === 'JAZZCASH' && <b>Selected</b>}
                            </label>
                        </div>
                    </fieldset>

                    {submitError && <p className={styles.formError} role="alert">{submitError}</p>}
                    {isSubmitted && <p className={styles.formSuccess} role="status">Donation created successfully.</p>}
                    <button className={styles.submitButton} type="submit" disabled={isSubmitting || !Number(amount)}><span>♡</span>{isSubmitting ? 'Processing...' : 'Donate Now'}</button>
                    <p className={styles.securityNote}>▣ Your payment information is safe and secure.</p>
                    <div className={styles.formFooter}><Link to={isServiceDonation ? '/service-gifts' : `/campaigns/${id}`}>← &nbsp;Back to {isServiceDonation ? 'Services' : 'Campaign'}</Link></div>
                </form>
            </section>
            <section className={styles.subscriptionSection}>
                <div className={styles.subscriptionsConttent}>
                    <span>MONTHLY SUBSCRIPTIONS</span>
                    <h3>    Choose Your Monthly Support </h3>
                    <p>Select a contribution amount that fits your heart. Your support will be authomatically charged every duration you set and help us countinue our mission</p>
                    <div className={styles.subscriptionsFeilds}>
                        <div>
                            <span>Support</span>
                            <p>Education</p>
                        </div>
                        <div>
                            <span>Provide</span>
                            <p>Food Assistant</p>
                        </div>
                        <div>
                            <span>Improve</span>
                            <p>Healthcare</p>
                        </div>
                        <div>
                            <span>Help</span>
                            <p>Peoples in Need</p>
                        </div>
                    </div>
                </div>
                <div className={styles.subscriptionType}>
                    <label htmlFor="subscriptionType">Select Subscription Type</label>
                    <select
                        name="subscriptionType"
                        id="subscriptionType"
                        value={subscriptionType}
                        onChange={(event) => setSubscriptionType(event.target.value)}
                    >
                        <option value="general">General</option>
                        <option value="zakat">Zakat</option>
                        <option value="sadaqah">Sadaqah</option>
                    </select>
                </div>
                <div className={styles.subscriptionBundles}>
                    <div className={styles.subscriptionnundle}>
                        <span>{formatCurrency(1000)} / month</span>
                        <p>Provides essential supplies and support for a child's & Peoples in Need</p>
                        <button type="button" onClick={() => handleSubscription('monthly')}>Donate Monthly</button>
                    </div>
                    <div className={styles.subscriptionnundle}>
                        <span>{formatCurrency(9999)} / year</span>
                        <p>Provides essential supplies and support for a child's & Peoples in Need</p>
                        <button type="button" onClick={() => handleSubscription('yearly')}>Donate Yearly</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MakeaDonation;
