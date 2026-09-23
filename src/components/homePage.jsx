import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OurUsers from '../apis/getOurUser.get';
import styles from '../styles/homes.module.css'
import ServiceGifts from '../apis/gifts.get';
import GetRiews from '../apis/getreviews.get';
import { readAuthSession } from '../utils/authSession';
import PostRevies from '../apis/sendReview.post';

function HomePage() {
    const navigate = useNavigate();
    const reviewsTrackRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [gifts, setGifts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewError, setReviewError] = useState('');
    const [reviewData, setReviewData] = useState(() => {
        const session = readAuthSession();
        return {
            name: localStorage.getItem('userName') || session?.user?.displayName || '',
            message: '',
            rating: 0,
            imageUrl: localStorage.getItem('userProfileImage') || session?.user?.imageurl || '',
        };
    });

    const moveReviews = (direction) => {
        reviewsTrackRef.current?.scrollBy({
            left: direction * reviewsTrackRef.current.clientWidth,
            behavior: 'smooth',
        });
    };

    const openReviewForm = () => {
        const session = readAuthSession();
        setReviewData((currentData) => ({
            ...currentData,
            name: localStorage.getItem('userName') || session?.user?.displayName || currentData.name,
            imageUrl: localStorage.getItem('userProfileImage') || session?.user?.imageurl || currentData.imageUrl,
        }));
        setReviewError('');
        setIsReviewFormOpen(true);
    };

    const submitReview = async (event) => {
        event.preventDefault();
        if (!reviewData.message.trim() || !reviewData.rating) {
            setReviewError('Please write a review and select a rating.');
            return;
        }

        setIsSubmittingReview(true);
        setReviewError('');

        try {
            const savedReview = PostRevies(reviewData);

            setReviews((currentReviews) => [...currentReviews, savedReview]);
            setReviewData((currentData) => ({ ...currentData, message: '', rating: 0 }));
            setIsReviewFormOpen(false);
        } catch (error) {
            console.error('Review submission failed:', error);
            setReviewError('Unable to submit your review. Please try again.');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    useEffect(() => {
        OurUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error('Users fetch failed:', error));

        ServiceGifts()
            .then((data) => setGifts(data))
            .catch((error) => console.error('Gifts fetch failed:', error));

        GetRiews()
            .then((data) => setReviews(data))
            .catch((error) => console.error('Reviews fetch failed:', error));
    }, []);

    return (
        <>
            {/*Hero Section*/}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>❤️ Together for a Brighter Future</span>

                    <h1>Together, We Can <span> Make a Difference</span></h1>

                    <p>
                        HelpTogether connects kind hearts with people in need.
                        Your support can bring hope, create opportunities and
                        change lives.
                    </p>
                    <div className={styles.button}>
                        <button onClick={() => { navigate('/campaigns') }}>Explore Campaigns</button>
                        <button onClick={() => { navigate('/donate') }} className={styles.secondaryButton}>Donate Now</button>
                    </div>
                </div>
            </section>

            {/*Our Users*/}
            <section className={styles.ourUsers}>
                <div className={styles.users}>
                    <div className={styles.user}>
                        <h3>PKR: <i>{users.totalDonations}</i><span>Total Donations</span></h3>
                    </div>
                    <div className={styles.user}>
                        <h3><i>{users.totalActiveCampaigns}</i><span>Active Campaigns</span></h3>
                    </div>
                    <div className={styles.user}>
                        <h3><i>{users.peoplesHelped}</i><span>Peoples Helped</span></h3>
                    </div>
                    <div className={styles.user}>
                        <h3><i>{users.ourUsers}</i><span>Registered Donors</span></h3>
                    </div>
                </div>
            </section>

            {/*Service And Gifts Section*/}
            <section className={styles.services}>
                <div className={styles.serviceContent}>
                    <span className={styles.serviceBadge}>🎁 Our Service Gifts</span>
                    <h3 className={styles.serviceTitle}>Service Gifts</h3>
                    <p className={styles.servicePara}>Support meaningfull causes with our special service gifts.<span>Each gift helps someone in need and spreads kindness.</span></p>
                    <button className={styles.serviceButton}>View All Service Gifts</button>
                </div>
                <div className={styles.giftsContainer}>
                    {gifts.map((gift) => (
                        <div className={styles.giftContent} key={gift._id || gift.id || gift.name}>
                            <div className={styles.imgContainer}>
                                <img src={gift.imageUrl} alt={gift.name} />
                            </div>
                            <div className={styles.giftText}>
                                <h3>{gift.name}</h3>
                                <p className={styles.giftDescription}>{gift.description}</p>
                                <p className={styles.giftCost}><i>Cost:</i><span> {gift.price}</span></p>
                                <button onClick={() => { navigate(`/service-gifts/${gift.id}`) }}>🎁 Give Gift</button>
                            </div>
                        </div>
                    ))}

                </div>
            </section>

            {/*Make a Reviews section*/}

            <section className={styles.reeviews}>
                <div className={styles.reviewUpContainer}>
                    <p className={styles.reviewUpBadge}>🌟 What Peoples Say</p>
                    <h3 className={styles.reviewUpTitle}>Reviews From Our Community</h3>
                    <p className={styles.reviewUpPara}>Real stories. Real impact. See what our kind-hearted supporters
                        have to say about their experience with HelpTogether.
                    </p>
                    <button className={styles.reviewButton} type="button" onClick={openReviewForm}>Add Your Review →</button>
                </div>
                <div className={styles.reviewsCarousel}>
                    <button
                        className={`${styles.reviewArrow} ${styles.reviewArrowPrevious}`}
                        type="button"
                        aria-label="Previous reviews"
                        onClick={() => moveReviews(-1)}
                    >
                        &#8249;
                    </button>
                    <div className={styles.reviewsViewport} ref={reviewsTrackRef}>
                        <div className={styles.reviewsTrack}>
                            {reviews.map((review) => (
                                <article className={styles.reviewDownContainer} key={review.id}>
                                    <div className={styles.reviesUserInformation}>
                                        <div className={styles.reviewUserImg}>
                                            <img src="favicon.png" alt="" />
                                        </div>
                                        <div className={styles.reviewUserInfo}>
                                            <h4 className={styles.reviewerUserName}>{review.name}</h4>

                                            <div className={styles.reviewStars}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        aria-label={`${review.rating} out of 5 stars`}
                                                    >
                                                        {star <= review.rating ? "⭐" : "☆"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.UserReview}>
                                        <p>{review.message}</p>
                                    </div>
                                    <div className={styles.reviewAddedDate}>
                                        <p>{review.date}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                    <button
                        className={`${styles.reviewArrow} ${styles.reviewArrowNext}`}
                        type="button"
                        aria-label="Next reviews"
                        onClick={() => moveReviews(1)}
                    >
                        &#8250;
                    </button>
                </div>
            </section>

            {isReviewFormOpen && (
                <div className={styles.reviewModalBackdrop} role="presentation" onClick={() => setIsReviewFormOpen(false)}>
                    <form className={styles.reviewModal} onSubmit={submitReview} onClick={(event) => event.stopPropagation()}>
                        <button
                            className={styles.reviewModalClose}
                            type="button"
                            aria-label="Close review form"
                            onClick={() => setIsReviewFormOpen(false)}
                        >
                            &times;
                        </button>
                        <h3>Add Your Review</h3>
                        <label htmlFor="review-name">Name</label>
                        <input id="review-name" value={reviewData.name} readOnly />
                        <label htmlFor="review-message">Review</label>
                        <textarea
                            id="review-message"
                            value={reviewData.message}
                            onChange={(event) => setReviewData({ ...reviewData, message: event.target.value })}
                            placeholder="Write your review"
                            rows="5"
                            required
                        />
                        <fieldset className={styles.reviewRating}>
                            <legend>Rating</legend>
                            <div>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        className={rating <= reviewData.rating ? styles.selectedStar : styles.reviewStar}
                                        type="button"
                                        key={rating}
                                        aria-label={`${rating} star${rating > 1 ? 's' : ''}`}
                                        onClick={() => setReviewData({ ...reviewData, rating })}
                                    >
                                        &#9733;
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                        {reviewError && <p className={styles.reviewFormError}>{reviewError}</p>}
                        <button className={styles.submitReviewButton} type="submit" disabled={isSubmittingReview}>
                            {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default HomePage;