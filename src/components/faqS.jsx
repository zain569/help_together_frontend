import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GetAllFAQs from "../apis/faqsAPIs/getAllFAQs.get";
import styles from "../styles/faqS.module.css";


// FAQ icons
const faqIcons = ["♡", "♟", "✧", "⬡", "▦", "?"];


function FAQS() {

	// ==========================================
	// STATES
	// ==========================================

	const [faqs, setFaqs] = useState([]);
	const [activeFaq, setActiveFaq] = useState(null);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");


	// ==========================================
	// FETCH FAQs
	// ==========================================

	const fetchFAQs = useCallback(async () => {
		const data = await GetAllFAQs();

		if (Array.isArray(data)) {
			return data;
		}

		if (Array.isArray(data?.faqs)) {
			return data.faqs;
		}

		if (Array.isArray(data?.data)) {
			return data.data;
		}

		return [];
	}, []);

	const handleRetry = () => {
		setIsLoading(true);
		setError("");
		fetchFAQs()
			.then(setFaqs)
			.catch((requestError) => {
				console.error("Could not load FAQs:", requestError);
				setFaqs([]);
				setError("We could not load the FAQs right now. Please try again.");
			})
			.finally(() => setIsLoading(false));
	};


	// ==========================================
	// LOAD FAQs WHEN PAGE OPENS
	// ==========================================

	useEffect(() => {
		let isActive = true;

		fetchFAQs()
			.then((faqItems) => {
				if (isActive) {
					setFaqs(faqItems);
				}
			})
			.catch((requestError) => {
				if (isActive) {
					console.error("Could not load FAQs:", requestError);
					setFaqs([]);
					setError("We could not load the FAQs right now. Please try again.");
				}
			})
			.finally(() => {
				if (isActive) {
					setIsLoading(false);
				}
			});

		return () => {
			isActive = false;
		};

	}, [fetchFAQs]);


	// ==========================================
	// FAQ TOGGLE
	// ==========================================

	const handleToggle = (index) => {

		setActiveFaq((currentIndex) => {

			// Close currently opened FAQ
			if (currentIndex === index) {
				return null;
			}

			// Open selected FAQ
			return index;

		});

	};


	// ==========================================
	// RENDER
	// ==========================================

	return (

		<main className={styles.faqPage}>

			{/* ==========================================
                HERO
            ========================================== */}

			<section className={styles.hero}>

				<div className={styles.heroInner}>

					<div className={styles.heroCopy}>

						<p className={styles.eyebrow}>
							Frequently Asked Questions
						</p>

						<h1>
							How Can We Help You?
						</h1>

						<p className={styles.heroDescription}>
							Find answers to the most common questions
							about our causes, campaigns, services,
							donations and more.
						</p>

					</div>


					<span
						className={styles.heroFlourish}
						aria-hidden="true"
					>
						♡
					</span>

				</div>

			</section>


			{/* ==========================================
                MAIN CONTENT
            ========================================== */}

			<section
				className={styles.content}
				aria-label="Frequently asked questions"
			>

				{/* ==========================================
                    FAQ LIST
                ========================================== */}

				<div className={styles.faqList}>

					{/* ==============================
                        LOADING
                    ============================== */}

					{isLoading && (

						<>
							{Array.from(
								{ length: 6 },
								(_, index) => (

									<div
										className={styles.skeleton}
										key={`faq-skeleton-${index}`}
										aria-hidden="true"
									>

										<span
											className={
												styles.skeletonIcon
											}
										/>

										<span
											className={
												styles.skeletonLine
											}
										/>

										<span
											className={
												styles.skeletonArrow
											}
										/>

									</div>

								)
							)}
						</>

					)}


					{/* ==============================
                        ERROR
                    ============================== */}

					{!isLoading && error && (

						<div
							className={styles.statusPanel}
							role="alert"
						>

							<p>{error}</p>

							<button
								type="button"
								onClick={handleRetry}
							>
								Try Again
							</button>

						</div>

					)}


					{/* ==============================
                        EMPTY
                    ============================== */}

					{!isLoading &&
						!error &&
						faqs.length === 0 && (

							<div
								className={styles.statusPanel}
							>

								<p>
									No frequently asked questions
									have been added yet.
								</p>

							</div>

						)}


					{/* ==============================
                        FAQ DATA
                    ============================== */}

					{!isLoading &&
						!error &&
						faqs.length > 0 &&

						faqs.map((faq, index) => {

							// Support different backend property names
							const question =
								faq?.question ||
								faq?.title ||
								"Question";

							const answer =
								faq?.answer ||
								faq?.description ||
								"Please contact our team for more information.";


							// Check if this FAQ is open
							const isOpen =
								activeFaq === index;


							// Support different ID formats
							const faqId =
								faq?.id ||
								faq?._id ||
								`faq-${index}`;


							const answerId =
								`faq-answer-${faqId}`;


							return (

								<article
									className={`${styles.faqItem} ${isOpen
											? styles.faqItemOpen
											: ""
										}`}
									key={faqId}
								>

									{/* ==============================
                                        QUESTION BUTTON
                                    ============================== */}

									<button
										type="button"
										className={
											styles.faqQuestion
										}
										aria-expanded={isOpen}
										aria-controls={answerId}
										onClick={() =>
											handleToggle(index)
										}
									>

										<span
											className={
												styles.faqIcon
											}
											aria-hidden="true"
										>
											{
												faqIcons[
												index %
												faqIcons.length
												]
											}
										</span>


										<span
											className={
												styles.questionText
											}
										>
											{question}
										</span>


										<span
											className={
												styles.chevron
											}
											aria-hidden="true"
										/>

									</button>


									{/* ==============================
                                        ANSWER
                                    ============================== */}

									{isOpen && (

										<div
											className={
												styles.faqAnswer
											}
											id={answerId}
											role="region"
											aria-label={question}
										>

											<p>
												{answer}
											</p>

										</div>

									)}

								</article>

							);

						})}

				</div>


				{/* ==========================================
                    SIDEBAR
                ========================================== */}

				<aside className={styles.sidebar}>

					{/* ==============================
                        CONTACT CARD
                    ============================== */}

					<div className={styles.contactPanel}>

						<span
							className={styles.chatIcon}
							aria-hidden="true"
						>
							♡
						</span>


						<h2>
							Still Have Questions?
						</h2>


						<p>
							If you couldn't find the answer
							you're looking for, feel free to
							reach out to us. We're here to help.
						</p>


						<Link
							className={styles.contactButton}
							to="/contact"
						>

							<span aria-hidden="true">
								✉
							</span>

							Contact Us

						</Link>

					</div>


					{/* ==============================
                        STORY IMAGE
                    ============================== */}

					<div
						className={styles.storyImage}
						role="img"
						aria-label="A student learning with support from the community"
					>

						<div className={styles.storyNote}>

							Together
							<br />

							we can make
							<br />

							a difference

							<span aria-hidden="true">
								{" "}♡
							</span>

						</div>

					</div>

				</aside>

			</section>


			{/* ==========================================
                VALUES
            ========================================== */}

			<section
				className={styles.values}
				aria-label="Our commitments"
			>

				<div className={styles.valueItem}>

					<span aria-hidden="true">
						♡
					</span>

					<p>
						<strong>
							Trusted & Transparent
						</strong>

						<small>
							Your trust matters to us.
						</small>
					</p>

				</div>


				<div className={styles.valueItem}>

					<span aria-hidden="true">
						♧
					</span>

					<p>
						<strong>
							Real Impact
						</strong>

						<small>
							Changing lives, together.
						</small>
					</p>

				</div>


				<div className={styles.valueItem}>

					<span aria-hidden="true">
						⬡
					</span>

					<p>
						<strong>
							Secure Donations
						</strong>

						<small>
							Your information is safe with us.
						</small>
					</p>

				</div>


				<div className={styles.valueItem}>

					<span aria-hidden="true">
						♧
					</span>

					<p>
						<strong>
							A Brighter Future
						</strong>

						<small>
							For every community.
						</small>
					</p>

				</div>

			</section>

		</main>
	);
}

export default FAQS;
