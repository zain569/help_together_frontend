import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/quickDonate.module.css"
import CreateDonation from "../apis/donations/createDonation.post";
import { readAuthSession } from "../utils/authSession";
import { currencies } from "../utils/currencies";
import { useCurrency } from "../utils/useCurrency";

const closeNothing = () => { };

function getIsLoggedIn() {
    const session = readAuthSession();
    return Boolean(session?.token || session?.isUser);
}

function QuickDonate({
    isOpen = true,
    isLoggedIn = getIsLoggedIn(),
    onClose = closeNothing,
}) {
    const [data, setData] = useState({ amount: 1000, donationType: "general", paymentMethod: "STRIPE", campaignId: "6c0f87e8-adbd-4648-8f6e-2eeefed6f991" });
    const [displayAmount, setDisplayAmount] = useState(null);
    const [displayAmountRate, setDisplayAmountRate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const { currencyCode, currencySymbol, exchangeRate } = useCurrency();
    const selectedCurrency = currencies.find(({ code }) => code === currencyCode) || currencies[0];
    const amountInSelectedCurrency = displayAmountRate === exchangeRate && displayAmount !== null
        ? displayAmount
        : (Number(data.amount) * exchangeRate).toFixed(2);

    useEffect(() => {
        if (!isOpen) return undefined;

        const closeOnEscape = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [isOpen, onClose]);

    const handleDonate = async (event) => {
        event.preventDefault();
        setFeedback(null);

        const amount = Number(data.amount);
        if (!Number.isFinite(amount) || amount <= 0) {
            setFeedback({ type: "error", message: "Please enter a valid donation amount." });
            return;
        }

        const session = readAuthSession();
        const userId = session?.user?.id || localStorage.getItem("userId") || "";
        if (!userId) {
            setFeedback({ type: "error", message: "Please log in before making a donation." });
            return;
        }

        setIsSubmitting(true);
        try {
            const donationResponse = await CreateDonation({
                userId,
                amount,
                donationType: data.donationType,
                paymentMethod: data.paymentMethod,
                campaignId: "6c0f87e8-adbd-4648-8f6e-2eeefed6f991"
            });
            if (donationResponse?.checkoutUrl) {
                window.location.assign(donationResponse.checkoutUrl);
                return;
            }
            setFeedback({
                type: "success",
                message: typeof donationResponse?.message === "string"
                    ? donationResponse.message
                    : "Your donation was submitted successfully.",
            });
        } catch (error) {
            console.error("Quick donation submission failed:", error);
            setFeedback({
                type: "error",
                message: error.message || "We could not process your donation. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.backdrop} onClick={onClose}>
            <section className={styles.modalCard} role="dialog" aria-modal="true" aria-labelledby="quick-donate-title" onClick={(event) => event.stopPropagation()}>
                {feedback && (
                    <div
                        className={`${styles.feedbackPopup} ${feedback.type === "success" ? styles.feedbackSuccess : styles.feedbackError}`}
                        role={feedback.type === "error" ? "alert" : "status"}
                    >
                        <span>{feedback.message}</span>
                        <button type="button" aria-label="Dismiss message" onClick={() => setFeedback(null)}>
                            &times;
                        </button>
                    </div>
                )}
                <button className={styles.cross} type="button" aria-label="Close quick donate form" onClick={onClose}>
                    &times;
                </button>
                {isLoggedIn ? (
                    <>
                        <div className={styles.logo}>
                            <img src="/favicon.png" alt="HelpTogether" />
                        </div>
                        <div className={styles.headerContent}>
                            <span>QUICK DONATE</span>
                            <h3 id="quick-donate-title">Make a Difference Today</h3>
                            <p>Your small contributions can help create meaningful change in someone's life.</p>
                        </div>
                        <form className={styles.donationForm} onSubmit={handleDonate}>
                            <div className={styles.donationType}>
                                <p>Donation Type</p>
                                <select
                                    value={data.donationType}
                                    onChange={(event) => setData((currentData) => ({ ...currentData, donationType: event.target.value }))}
                                    name="type"
                                    id="donationType"
                                >
                                    <option value="general">General</option>
                                    <option value="zakat">Zakat</option>
                                    <option value="sadaqah">Sadaqah</option>
                                </select>
                            </div>
                            <div className={styles.donationAmount}>
                                <label className={styles.amountLabel} htmlFor="quick-donate-amount">
                                    Donation amount ({selectedCurrency.name})
                                </label>
                                <input
                                    onChange={(event) => {
                                        const enteredAmount = event.target.value;
                                        setDisplayAmount(enteredAmount);
                                        setDisplayAmountRate(exchangeRate);
                                        const baseAmount = enteredAmount === '' ? '' : Number(enteredAmount) / exchangeRate;
                                        setData((currentData) => ({ ...currentData, amount: baseAmount }));
                                    }}
                                    type="number"
                                    id="quick-donate-amount"
                                    name="amount"
                                    min="0.01"
                                    step="0.01"
                                    value={amountInSelectedCurrency}
                                    placeholder="Enter Amount"
                                    aria-label={`Donation amount in ${selectedCurrency.name}`}
                                />
                                <span className={styles.currencyBadge} aria-hidden="true">
                                    {selectedCurrency.flag} {currencyCode} ({currencySymbol})
                                </span>
                            </div>
                            <div className={styles.secureDonation}>
                                <span>Secure Donation</span>
                                <p>Your information is safe and secure with us.</p>
                            </div>
                            <fieldset className={styles.paymentFieldset}>
                                <legend>Choose Payment Method</legend>
                                <div className={styles.paymentOptions}>
                                    <label className={`${styles.paymentCard} ${data.paymentMethod === "STRIPE" ? styles.selected : ""}`}>
                                        <input type="radio" name="quickPaymentMethod" value="STRIPE" checked={data.paymentMethod === "STRIPE"} onChange={(event) => setData((currentData) => ({ ...currentData, paymentMethod: event.target.value }))} />
                                        <span className={styles.paymentIcon}>▣</span>
                                        <span><strong>Card payment</strong><small>Credit / Debit Card</small></span>
                                        {data.paymentMethod === "STRIPE" && <b>Selected</b>}
                                    </label>
                                    <label className={`${styles.paymentCard} ${data.paymentMethod === "JAZZCASH" ? styles.selected : ""}`}>
                                        <input type="radio" name="quickPaymentMethod" value="JAZZCASH" checked={data.paymentMethod === "JAZZCASH"} onChange={(event) => setData((currentData) => ({ ...currentData, paymentMethod: event.target.value }))} />
                                        <span className={styles.paymentIcon}>☏</span>
                                        <span><strong>JazzCash</strong><small>Pay with your JazzCash account</small></span>
                                        {data.paymentMethod === "JAZZCASH" && <b>Selected</b>}
                                    </label>
                                </div>
                            </fieldset>
                            <button className={styles.button} type="submit" disabled={isSubmitting}>
                                <span className={styles.buttonCurrency} aria-hidden="true">
                                    {selectedCurrency.flag} {currencySymbol}
                                </span>
                                <span>{isSubmitting ? "Processing..." : `Donate ${amountInSelectedCurrency || 0} ${currencyCode}`}</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <p className={styles.loginMessage} id="quick-donate-title">
                        Please log in to use Quick Donate.
                    </p>
                )}
            </section>
        </div>,
        document.body
    )
}

export default QuickDonate;
