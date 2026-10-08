import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GetMyDonation from '../apis/donations/getmyDonations.get';
import GetSubscriptionData from '../apis/donations/getSubscriptionDetails';
import styles from '../styles/paymentSuccess.module.css';

const getRecords = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    return response ? [response] : [];
};

const getMatchingRecord = (response, sessionId) => {
    const records = getRecords(response);
    return records.find((record) => (
        record?.stripeSessionId === sessionId
        || record?.sessionId === sessionId
    )) || (records.length === 1 ? records[0] : null);
};

const formatAmount = (amount, currency) => {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || !currency) return null;

    return `${currency.toUpperCase()} ${numericAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

function PaymentSuccess() {
    const [verification, setVerification] = useState({
        sessionId: null,
        loading: true,
        payment: null,
        error: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hasQueryParams = queryParams.size > 0;
    const sessionId = queryParams.get('session_id');
    const fallbackCurrency = queryParams.get('currency_code') || queryParams.get('currency');

    useEffect(() => {
        let isCurrent = true;

        if (!sessionId) return () => { isCurrent = false; };

        Promise.allSettled([
            GetSubscriptionData(sessionId),
            GetMyDonation(),
        ]).then(([subscriptionResult, donationResult]) => {
            if (!isCurrent) return;

            const donation = donationResult.status === 'fulfilled'
                ? getRecords(donationResult.value).find((record) => (
                    record?.stripeSessionId === sessionId
                    || record?.sessionId === sessionId
                ))
                : null;
            const subscription = subscriptionResult.status === 'fulfilled'
                ? getMatchingRecord(subscriptionResult.value, sessionId)
                : null;
            const matchedPayment = donation || subscription;

            if (matchedPayment) {
                setVerification({
                    sessionId,
                    loading: false,
                    payment: {
                        ...matchedPayment,
                        paymentType: donation ? 'donation' : 'subscription',
                        currency: matchedPayment.currencyCode || matchedPayment.currency || fallbackCurrency,
                    },
                    error: '',
                });
            } else {
                if (subscriptionResult.status === 'rejected') {
                    console.error('Subscription payment verification failed:', subscriptionResult.reason);
                }
                if (donationResult.status === 'rejected') {
                    console.error('Donation payment verification failed:', donationResult.reason);
                }
                setVerification({
                    sessionId,
                    loading: false,
                    payment: null,
                    error: 'We could not verify this payment yet. Please check your payment history or try again shortly.',
                });
            }
        });

        return () => { isCurrent = false; };
    }, [sessionId, fallbackCurrency]);

    const loading = Boolean(sessionId)
        && (verification.sessionId !== sessionId || verification.loading);
    const payment = verification.sessionId === sessionId ? verification.payment : null;
    const error = hasQueryParams && !sessionId
        ? 'We could not find a payment session to verify.'
        : verification.sessionId === sessionId ? verification.error : '';
    const isSubscription = payment?.paymentType === 'subscription';
    const isSucceeded = payment?.paymentStatus?.toUpperCase() === 'SUCCEEDED';

    return (
        <main className={styles.successPage}>
            <section className={styles.successCard} aria-live="polite">
                {!hasQueryParams ? (
                    <>
                        <div className={styles.successIcon} aria-hidden="true">
                            <span>✓</span>
                        </div>
                        <h1>Payment Successful!</h1>
                        <p className={styles.mainText}>Thank you for your generous support.</p>
                        <p className={styles.subText}>
                            Your contribution has been received successfully and will help make a positive difference.
                        </p>
                        <div className={styles.thankYouBox}>
                            <span aria-hidden="true">💚</span>
                            <p>
                                Every contribution counts. Thank you for being part of the HelpTogether community.
                            </p>
                        </div>
                    </>
                ) : loading ? (
                    <div className={styles.statusState} role="status">
                        <span className={styles.loader} aria-hidden="true" />
                        <h1>Confirming your payment</h1>
                        <p>We are securely checking the payment details. This may take a moment.</p>
                    </div>
                ) : error ? (
                    <div className={styles.statusState} role="alert">
                        <div className={styles.errorIcon} aria-hidden="true">!</div>
                        <h1>Payment confirmation unavailable</h1>
                        <p className={styles.subText}>{error}</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.successIcon} aria-hidden="true">
                            <span>{isSucceeded ? '✓' : '…'}</span>
                        </div>
                        <p className={styles.eyebrow}>
                            {isSucceeded ? 'Payment confirmed' : 'Payment status'}
                        </p>
                        <h1>
                            {isSubscription
                                ? (isSucceeded ? 'Subscription successful!' : 'Subscription received')
                                : (isSucceeded ? 'Donation successful!' : 'Donation received')}
                        </h1>

                        <p className={styles.mainText}>
                            {isSubscription
                                ? `Thank you for supporting us with a ${payment.frequency || ''} subscription.`
                                : 'Thank you for your generous donation.'}
                        </p>

                        <p className={styles.subText}>
                            {isSucceeded
                                ? (isSubscription
                                    ? 'Your recurring support will help make a lasting difference.'
                                    : 'Your contribution has been received and will help make a positive difference.')
                                : `Your payment status is ${payment.paymentStatus || 'processing'}.`}
                        </p>

                        <dl className={styles.paymentDetails}>
                            {isSubscription ? (
                                <>
                                    {payment.frequency && (
                                        <div><dt>Frequency</dt><dd>{payment.frequency}</dd></div>
                                    )}
                                    {payment.subscriptionType && (
                                        <div><dt>Subscription type</dt><dd>{payment.subscriptionType}</dd></div>
                                    )}
                                    {payment.stripeSubscriptionId && (
                                        <div><dt>Subscription ID</dt><dd>{payment.stripeSubscriptionId}</dd></div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {formatAmount(payment.amount, payment.currency) && (
                                        <div><dt>Donation amount</dt><dd>{formatAmount(payment.amount, payment.currency)}</dd></div>
                                    )}
                                    {payment.currency && (
                                        <div><dt>Currency</dt><dd>{payment.currency.toUpperCase()}</dd></div>
                                    )}
                                    {payment.id && (
                                        <div><dt>Donation ID</dt><dd>{payment.id}</dd></div>
                                    )}
                                </>
                            )}
                            {payment.paymentStatus && (
                                <div><dt>Status</dt><dd>{payment.paymentStatus}</dd></div>
                            )}
                        </dl>

                        <div className={styles.thankYouBox}>
                            <span aria-hidden="true">💚</span>
                            <p>Every contribution counts. Thank you for being part of the HelpTogether community.</p>
                        </div>
                    </>
                )}

                <button
                    className={styles.homeButton}
                    type="button"
                    onClick={() => navigate('/')}
                >
                    ← Return to Home
                </button>
            </section>
        </main>
    );
}

export default PaymentSuccess;
