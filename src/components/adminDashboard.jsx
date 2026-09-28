import { useEffect, useState } from 'react';
import styles from '../styles/adminDashboard.module.css'
import AdminDashBoard from '../apis/adminPage/adminDashboard';
import CreateFAQs from '../apis/faqsAPIs/createFAQs.post';
import UpdateFAQs from '../apis/faqsAPIs/updateAFAQs.post';
import DeleteFAQs from '../apis/faqsAPIs/deleteFaqs.delete';
import ReplyUserContact from '../apis/CintactsAPIs/replyToUser.patch';
import CreateCause from '../apis/causes/CreateCause.post';
import UpdateCause from '../apis/causes/UpdateACause.patch';
import DeleteCause from '../apis/causes/deleteCause.delete';
import CreateService from '../apis/serviceandgiftsAPIS/createService.post';
import UpdateService from '../apis/serviceandgiftsAPIS/updateService.patch';
import DeleteService from '../apis/serviceandgiftsAPIS/deleteService.delete';
import CreateCampaign from '../apis/campaignsAPI/CreateCampaign.post';
import UpdateCampaign from '../apis/campaignsAPI/updateACampaigns.post';
import DeleteCampaign from '../apis/campaignsAPI/deleteCampaign';
import UpdateCampaignStatus from '../apis/campaignsAPI/changeCampaignStatus';

function AdminDashboard() {
    const [data, setData] = useState([]);
    const [donations, setDonations] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [services, setServices] = useState([]);
    const [faqs, setFAQs] = useState([]);
    const [causes, setCauses] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [showFaqForm, setShowFaqForm] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [faqsLoading, setFAQsLoading] = useState(false);
    const [createFAQsData, setCreateFAQsData] = useState({
        question: "",
        answer: ""
    })

    const totalCampaigns = campaigns.length;
    const totalServices = services.length;
    useEffect(() => {
        AdminDashBoard()
            .then((data) => {
                setData(data);
                setDonations(data.latestDonations);
                setCampaigns(data.latestCampaign);
                setServices(data.latestServices);
                setFAQs(data.faqs);
                setCauses(data.causes);
                setContacts(data.contacts);
                setReviews(data.testimonials);
            })
            .then((err) => console.error(err))

    }, [])

    async function handleAddFaq(e) {
        e.preventDefault();
        setFAQsLoading(true);

        try {
            if (editingFaq) {
                // Update existing FAQ
                const formData = new FormData(e.target);

                const updateData = {
                    question: formData.get("question"),
                    answer: formData.get("answer"),
                    isActive: formData.get("isActive") === "on",
                };

                await UpdateFAQs(editingFaq.id, updateData);

                setShowFaqForm(false);
                editingFaq(null);

                alert("FAQ updated successfully");
            } else {
                // Create new FAQ
                await CreateFAQs(createFAQsData);

                setShowFaqForm(false);
                editingFaq(null);

                alert("FAQ created successfully");
            }

            setFAQsLoading(false);

            // Close form
            setShowFaqForm(false);

            // Clear editing state
            setEditingFaq(null);

        } catch (err) {
            console.error("Failed to save FAQ", err);
            setFAQsLoading(false);
        }
    };

    {/*Make a Logic for Contact Reoly*/ }

    const [showReplyForm, setShowReplyForm] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    async function handleAdminReply(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const replyData = {
            contactId: selectedContact.id,
            message: formData.get("message"),
            subject: formData.get("subject"),
            status: formData.get("status"),
            adminReply: formData.get("adminReply"),
        };

        await ReplyUserContact(replyData);

        showReplyForm(false);
        selectedContact(null);

        alert("Reply to user Succesfully")
    }

    {/*Make a logic for Causes */ }
    const [showCauseForm, setShowCauseForm] = useState(false);
    const [causesLoading, setCausesLoading] = useState(false);
    const [editingCause, setEditingCause] = useState(null);

    async function handleAddCause(e) {
        e.preventDefault();

        setCausesLoading(true);

        try {
            if (editingCause) {
                const formData = new FormData(e.target);
                // UPDATE — JSON
                const causeData = {
                    name: formData.get("name"),
                    slug: formData.get("slug"),
                    description: formData.get("description"),
                    displayOrder: Number(formData.get("displayOrder")),
                    isActive: formData.get("isActive") === "on",
                };

                await UpdateCause(editingCause.id, causeData);

                setShowCauseForm(false);
                e.target.reset();
            } else {
                const formData = new FormData(e.target);

                const causeData = {
                    image: formData.get("image"),
                    name: formData.get("name"),
                    slug: formData.get("slug"),
                    description: formData.get("description"),
                    displayOrder: Number(formData.get("displayOrder")),
                    isActive: formData.get("isActive") === "on",
                };

                await CreateCause(causeData);

                setShowCauseForm(false);
                e.target.reset();
            }
        } catch (error) {
            console.error("Failed to create cause:", error);
        } finally {
            setCausesLoading(false);
        }
    };

    {/*Make a logic for a Service and Gifts*/ }
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [deleteService, setDeleteService] = useState(false);

    async function handleAddService(e) {
        e.preventDefault();

        setServicesLoading(true);

        try {
            if (editingService) {
                const formData = new FormData(e.target);

                const serviceData = {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    price: Number(formData.get("price")),
                    isActive: formData.get("isActive") === "on",
                }

                await UpdateService(editingService.id, serviceData)

                e.target.reset();
                setShowServiceForm(false);
                setEditingService(null)
            } else {
                const formData = new FormData(e.target);

                const serviceData = {
                    image: formData.get("image"),
                    name: formData.get("name"),
                    description: formData.get("description"),
                    price: Number(formData.get("price")),
                    isActive: formData.get("isActive") === "on",
                };

                console.log(serviceData);

                await CreateService(serviceData);

                setShowServiceForm(false);
                e.target.reset();
                setEditingService(null)
            }
        } catch (error) {
            console.error("Failed to add service:", error);
        } finally {
            setServicesLoading(false);
        }
    }

    {/*ake a logic for Add Update Delete Campaigns*/ }
    const [showCampaignForm, setShowCampaignForm] = useState(false);
    const [campaignsLoading, setCampaignsLoading] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);

    async function handleAddCampaign(e) {
        e.preventDefault();

        setCampaignsLoading(true);

        try {
            if (editingCampaign) {
                const formData = new FormData(e.target);

                const campaignData = {
                    title: formData.get("title"),
                    description: formData.get("description"),
                    goalAmount: Number(formData.get("goalAmount")),
                    causeId: formData.get("causeId"),
                    zakatEligible: formData.get("zakatEligible") === "on",
                    urgent: formData.get("urgent") === "on"
                }

                console.log(campaignData);

                await UpdateCampaign(campaignData, editingCampaign.id);

                setShowCampaignForm(false);
                e.target.reset();
            } else {
                const formData = new FormData(e.target);

                const campaignData = {
                    image: formData.get("image"),
                    title: formData.get("title"),
                    description: formData.get("description"),
                    goalAmount: Number(formData.get("goalAmount")),
                    causeId: formData.get("causeId"),
                    zakatEligible: formData.get("zakatEligible") === "on",
                    urgent: formData.get("urgent") === "on"
                };

                await CreateCampaign(campaignData);

                setShowCampaignForm(false);
                e.target.reset();
            }

        } catch (error) {
            console.error("Failed to create campaign:", error);
        } finally {
            setCampaignsLoading(false);
        }
    }
    return (
        <>
            {/*Make UserData Page*/}
            <section className={styles.userDetails}>
                <div className={styles.totalDonations}>
                    <div className={styles.totalDonationsEmmoji}>
                        💵
                    </div>
                    <div className={styles.totalDonationsData}>
                        <h3>Total Donations Amount</h3>
                        <p>PKR {data.collectedAmnount}</p>
                    </div>
                </div>

                <div className={styles.totalUsers}>
                    <div className={styles.totalUsersEmoji}>
                        👨🏻‍💼
                    </div>
                    <div className={styles.totalUsersData}>
                        <h3>Total Users</h3>
                        <p>{data.totalUser}</p>
                    </div>
                </div>

                <div className={styles.usersWhoDonated}>
                    <div className={styles.usersWhoDonatedemoji}>
                        💳
                    </div>
                    <div className={styles.usersWhoDonatedData}>
                        <h3>Users Who Donated</h3>
                        <p>{data.usersWhoDonated}</p>
                    </div>
                </div>

                <div className={styles.totalCampaigns}>
                    <div className={styles.totalCampaignsemoji}>
                        🤍
                    </div>
                    <div className={styles.totalCampaignsData}>
                        <h3>Total Campaigns</h3>
                        <p>{totalCampaigns}</p>
                    </div>
                </div>

                <div className={styles.totalServicesa}>
                    <div className={styles.totalServicesEmoji}>
                        🤝
                    </div>
                    <div className={styles.totalServiceData}>
                        <h3>Total Services</h3>
                        <p>{totalServices}</p>
                    </div>
                </div>
            </section>

            {/* Admin Donations Section */}
            <section className={styles.adminDonationsSection}>
                <div className={styles.adminDonationsTitle}>
                    <h2>Recent Donations</h2>
                    <p>Donations From Users</p>
                </div>

                <div className={styles.adminDonationsTableWrapper}>
                    <table className={styles.adminDonationsTable}>
                        <thead className={styles.adminDonationsTableHeader}>
                            <tr>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Method</th>
                                <th>Donation Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody className={styles.adminDonationsTableBody}>
                            {
                                donations.map((donation) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className={styles.adminDonationUser}>
                                                    <img
                                                        className={styles.adminDonationUserImage}
                                                        src={donation.user.profileImage}
                                                        alt={donation.user.firstname}
                                                    />

                                                    <div className={styles.adminDonationUserInfo}>
                                                        <p>{donation.user.firstname}</p>
                                                        <span>{donation.user.email}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={styles.adminDonationAmount}>{donation.currency} {donation.amount}</td>

                                            <td>
                                                <span className={
                                                    donation.paymentStatus === "SUCCEEDED" ? styles.paymentSuccess
                                                        : donation.paymentStatus === "FAILED" ? styles.paymentFailed
                                                            : styles.paymentPending
                                                }
                                                >
                                                    {donation.paymentStatus}
                                                </span>
                                            </td>

                                            <td className={styles.adminDonationMethod}>{donation.paymentMethod}</td>

                                            <td>{donation.donationType}</td>

                                            <td className={styles.adminDonationDate}>{donation.createdAt}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>

            {/*Make a Campaign Table*/}
            <section className={styles.campaignsSection}>
                <div className={styles.campaignsTitle}>
                    <h2>All Campaigns</h2>
                    <p>Campaigns Created By Users</p>
                    <button onClick={() => { setShowCampaignForm(true) }}>+ Add Campaign</button>
                </div>
                <div className={styles.campaignsTable}>
                    <table className={styles.campaignsTableData}>
                        <thead className={styles.campaignsTableHeader}>
                            <tr>
                                <td>Image</td>
                                <td>Title</td>
                                <td>Goal</td>
                                <td>Collected</td>
                                <td>Cause</td>
                                <td>Status</td>
                                <td>Zakat Eligible</td>
                                <td>Urgent</td>
                                <td>Action</td>
                                <td>Chnage Status</td>
                            </tr>
                        </thead>
                        <tbody className={styles.campaignsTableBody}>
                            {
                                campaigns.map((campaign) => {
                                    return (
                                        <tr key={campaign.id}>
                                            <td>
                                                <img src={campaign.imageUrl} alt="Fundraiser" />
                                            </td>
                                            <td className={styles.campaignTitle}>{campaign.title}</td>
                                            <td>PKR {campaign.goalAmount}</td>
                                            <td>PKR {campaign.collectedAmount}</td>
                                            <td>{campaign.cause.name}</td>
                                            <td><span className={styles.campaignStatus}>{campaign.status}</span></td>
                                            <td>{campaign.zakatEligible ? "Yes" : "No"}</td>
                                            <td>{campaign.urgent ? "Yes" : "No"}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setEditingCampaign(campaign);
                                                    setShowCampaignForm(true);
                                                }} className={styles.viewCampaignBtn}>Update</button>
                                                <button onClick={async () => {
                                                    await DeleteCampaign(campaign.id);
                                                    alert(`Campaigns of Name ${campaign.name} is deleted successfully`)
                                                }} className={styles.deleteCampaignBtn}>Delete</button>
                                            </td>
                                            <td>
                                                <select
                                                    className={styles.changeStatus}
                                                    defaultValue={campaign.status}
                                                    onChange={async (e) => {
                                                        const newStatus = e.target.value;

                                                        try {
                                                            await UpdateCampaignStatus(
                                                                campaign.id,
                                                                newStatus
                                                            );

                                                            console.log("Campaign status updated:", newStatus);
                                                        } catch (error) {
                                                            console.error(
                                                                "Failed to update campaign status:",
                                                                error
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <option value="published">PUBLISHED</option>
                                                    <option value="funded">FUNDED</option>
                                                    <option value="archived">ARCHIVED</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>

            {/*Make a Service And Gift Table*/}
            <section className={styles.serviceSection}>
                <div className={styles.serviceTitle}>
                    <h2>All Services</h2>
                    <p>Services and gifts available for donations</p>
                    <button onClick={() => setShowServiceForm(true)}>+ Add Service</button>
                </div>
                <div className={styles.serviceTable}>
                    <table className={styles.serviceTableData}>
                        <thead className={styles.serviceTableHeader}>
                            <tr>
                                <td>Image</td>
                                <td>Title</td>
                                <td>Description</td>
                                <td>Price</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className={styles.serviceTableBody}>
                            {
                                services.map((service) => {
                                    return (
                                        <tr key={service.id}>
                                            <td>
                                                <img src={service.imageUrl} alt={service.name} />
                                            </td>
                                            <td className={styles.serviceTitle}>{service.name}</td>
                                            <td>{service.description}</td>
                                            <td>PKR {service.price}</td>
                                            <td><span className={styles.serviceStatus}>{service.isActive ? "Active" : "NotActive"}</span></td>
                                            <td>
                                                <button onClick={() => {
                                                    setEditingService(service);
                                                    setShowServiceForm(true);
                                                }} className={styles.updateServiceBtn}>Update</button>
                                                <button disabled={deleteService} onClick={async () => {
                                                    setDeleteService(true);
                                                    await DeleteService(service.id);
                                                    setDeleteService(false);
                                                }} className={styles.deleteServiceBtn}>{deleteService ? "Deleteing..." : "Delete"}</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>

            {/*Make a Faqs Table*/}
            <section className={styles.faqsSection}>
                <div className={styles.faqsTitle}>
                    <h2>All Faqs</h2>
                    <p>Services and gifts available for donations</p>
                    <button onClick={() => setShowFaqForm(true)}>+ Add FAQs</button>
                </div>
                <div className={styles.faqsTable}>
                    <table className={styles.faqsTableData}>
                        <thead className={styles.faqsTableHeader}>
                            <tr>
                                <td>#</td>
                                <td>Question</td>
                                <td>Answer</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className={styles.faqsTableBody}>
                            {
                                faqs.map((faq, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td className={styles.faqsTitle}>{faq.question}</td>
                                            <td>{faq.answer}</td>
                                            <td><span style={{ backgroundColor: faq.isActive ? "" : "#ff3b2d" }} className={styles.faqsStatus}>{faq.isActive ? "Active" : "Not Active"}</span></td>
                                            <td>
                                                <button onClick={() => {
                                                    setEditingFaq(faq);
                                                    setShowFaqForm(true);
                                                }} className={styles.faqsServiceBtn}>Update</button>
                                                <button onClick={async () => {
                                                    await DeleteFAQs(faq.id);
                                                    alert("FAQ deleted successfully");
                                                }} className={styles.faqsServiceBtn}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>

            {/*Create Table for Causes*/}
            <section className={styles.causesSection}>
                <div className={styles.causesTitle}>
                    <h2>All Causes</h2>
                    <p>Causes for Users</p>
                    <button onClick={() => setShowCauseForm(true)}>{causesLoading ? "Adding..." : "+ Add Cause"}</button>
                </div>
                <div className={styles.causesTable}>
                    <table className={styles.causesTableData}>
                        <thead className={styles.causesTableHeader}>
                            <tr>
                                <td>id</td>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Slug</td>
                                <td>Description</td>
                                <td>IsActive</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className={styles.causesTableBody}>
                            {
                                causes.map((cause, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{cause.id}</td>
                                            <td>
                                                <img src={cause.imageUrl} alt={cause.name} />
                                            </td>
                                            <td className={styles.causesTitle}>{cause.name}</td>
                                            <td>{cause.slug}</td>
                                            <td><span className={styles.causesStatus}>{cause.description}</span></td>
                                            <td>{cause.isActive ? "YES" : "No"}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setEditingCause(cause);
                                                    setShowCauseForm(true)
                                                }} className={styles.causesServiceBtn}>Update</button>
                                                <button onClick={async () => {
                                                    await DeleteCause(cause.id);

                                                    alert(`The cause of name ${cause.name} is deleted Successfully`);
                                                }} className={styles.causesServiceBtn}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>

            {/**Create a contacts table*/}

            <section className={styles.contactsSection}>

                <div className={styles.contactsTitle}>
                    <h2>User Contacts</h2>
                    <p>Messages and inquiries received from users</p>
                </div>

                <div className={styles.contactsTable}>
                    <table className={styles.contactsTableData}>

                        <thead className={styles.contactsTableHeader}>
                            <tr>
                                <td>User</td>
                                <td>Email</td>
                                <td>Subject</td>
                                <td>Message</td>
                                <td>Status</td>
                                <td>Admin Reply</td>
                                <td>Action</td>
                            </tr>
                        </thead>

                        <tbody className={styles.contactsTableBody}>

                            {contacts.map((contact) => {
                                return (
                                    <tr key={contact.id}>
                                        <td className={styles.contactName}>{contact.name}</td>
                                        <td className={styles.contactEmail}>{contact.email}</td>
                                        <td className={styles.contactSubject}>{contact.subject}</td>
                                        <td className={styles.contactMessage}>{contact.message}</td>
                                        <td>
                                            <span
                                                className={
                                                    contact.status === "open"
                                                        ? styles.contactOpen
                                                        : styles.contactClosed
                                                }
                                            >
                                                {contact.status}
                                            </span>
                                        </td>

                                        <td>
                                            {contact.adminNote ? (
                                                <span className={styles.adminReply}>
                                                    {contact.adminNote}
                                                </span>
                                            ) : (
                                                <span className={styles.underReview}>
                                                    Under Review
                                                </span>
                                            )}
                                        </td>
                                        <td><button onClick={() => {
                                            setSelectedContact(contact);
                                            setShowReplyForm(true);
                                        }} className={styles.contactReplyBtn}>Reply</button></td>

                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                </div>

            </section>

            {/* USER REVIEWS */}

            <section className={styles.reviewsSection}>

                <div className={styles.reviewsTitle}>
                    <h2>User Reviews</h2>
                    <p>Reviews and feedback shared by users</p>
                </div>

                <div className={styles.reviewsTable}>
                    <table className={styles.reviewsTableData}>

                        <thead className={styles.reviewsTableHeader}>
                            <tr>
                                <td>User</td>
                                <td>Message</td>
                                <td>Rating</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody className={styles.reviewsTableBody}>

                            {reviews.map((review) => {
                                return (
                                    <tr key={review.id}>

                                        <td>
                                            <div className={styles.reviewUser}>

                                                <img
                                                    src={review.imageUrl}
                                                    alt={review.name}
                                                />

                                                <span>
                                                    {review.name}
                                                </span>

                                            </div>
                                        </td>

                                        <td>
                                            <p className={styles.reviewMessage}>
                                                {review.message}
                                            </p>
                                        </td>

                                        <td>
                                            <div className={styles.reviewStars}>
                                                {"⭐".repeat(review.rating)}
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    review.isActive
                                                        ? styles.reviewActive
                                                        : styles.reviewInactive
                                                }
                                            >
                                                {review.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                </div>

            </section>

            {/*Create a form for a add faqs*/}
            <section className={styles.faqsFormSection}>
                {showFaqForm && (
                    <div className={styles.faqFormOverlay}>
                        <div className={styles.faqForm}>

                            <div className={styles.faqFormHeader}>
                                <div>
                                    <h2>{editingFaq ? "Update FAQ" : "Add New FAQ"}</h2>
                                    <p>{
                                        editingFaq
                                            ? "Update FAQ information and status"
                                            : "Create a frequently asked question"
                                    }</p>
                                </div>

                                <button
                                    className={styles.faqCloseBtn}
                                    onClick={() => {
                                        setShowFaqForm(false);
                                        setEditingFaq(null);
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleAddFaq}>

                                <div className={styles.faqFormGroup}>
                                    <label htmlFor="question">Question</label>

                                    <input
                                        type="text"
                                        id="question"
                                        name="question"
                                        placeholder="Enter FAQ question"
                                        defaultValue={editingFaq?.question || ""}
                                        onChange={(e) => {
                                            setCreateFAQsData({ ...createFAQsData, question: e.target.value })
                                        }}
                                    />
                                </div>

                                <div className={styles.faqFormGroup}>
                                    <label htmlFor="answer">Answer</label>

                                    <textarea
                                        id="answer"
                                        name="answer"
                                        rows="6"
                                        placeholder="Enter the answer..."
                                        defaultValue={editingFaq?.answer || ""}
                                        onChange={(e) => {
                                            setCreateFAQsData({ ...createFAQsData, answer: e.target.value })
                                        }}
                                    ></textarea>
                                </div>

                                {editingFaq && (
                                    <div className={styles.faqActiveGroup}>

                                        <label className={styles.faqCheckboxLabel}>
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                defaultChecked={editingFaq.isActive}
                                            />

                                            <span>Active FAQ</span>
                                        </label>

                                        <p>Active FAQs will be visible to users.</p>

                                    </div>
                                )}

                                <div className={styles.faqFormActions}>
                                    <button
                                        type="button"
                                        className={styles.faqCancelBtn}
                                        onClick={() => {
                                            setShowFaqForm(false);
                                            setEditingFaq(null);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className={styles.faqSubmitBtn}
                                        disabled={faqsLoading}
                                    >
                                        {editingFaq ? "Update FAQ" : "Add FAQ"}
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                )}
            </section>

            {/*Make a form for add Admion Reply*/}
            {showReplyForm && (
                <div className={styles.replyFormOverlay}>
                    <form
                        className={styles.replyForm}
                        onSubmit={handleAdminReply}
                    >
                        <div className={styles.replyFormHeader}>
                            <div>
                                <h2>Reply to Contact</h2>
                                <p>Send a response to the user's message</p>
                            </div>

                            <button
                                type="button"
                                className={styles.replyCloseBtn}
                                onClick={() => setShowReplyForm(false)}
                            >
                                ×
                            </button>
                        </div>

                        {/* Subject */}
                        <div className={styles.replyFormGroup}>
                            <label htmlFor="subject">Subject</label>
                            <input
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder="Enter subject"
                                defaultValue={selectedContact?.subject || ""}
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className={styles.replyFormGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Enter user's message"
                                defaultValue={selectedContact?.message || ""}
                                rows="5"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div className={styles.replyFormGroup}>
                            <label htmlFor="status">Status</label>

                            <select
                                id="status"
                                name="status"
                                defaultValue={selectedContact?.status || "open"}
                                required
                            >
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        {/* Admin Reply */}
                        <div className={styles.replyFormGroup}>
                            <label htmlFor="adminReply">Admin Reply</label>
                            <textarea
                                id="adminReply"
                                name="adminReply"
                                placeholder="Write your reply to the user..."
                                rows="6"
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className={styles.replyFormActions}>
                            <button
                                type="button"
                                className={styles.replyCancelBtn}
                                onClick={() => setShowReplyForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={styles.replySubmitBtn}
                            >
                                Send Reply
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showCauseForm && (
                <div className={styles.causeFormOverlay}>
                    <form
                        className={styles.causeForm}
                        onSubmit={handleAddCause}
                    >

                        {/* Header */}
                        <div className={styles.causeFormHeader}>
                            <div>
                                <h2>{editingCause ? "Update A Cause" : "Add New Cause"}</h2>
                                <p>{editingCause ? "Update a cause for user" : "Create a new cause for users"}</p>
                            </div>

                            <button
                                type="button"
                                className={styles.causeCloseBtn}
                                onClick={() => {
                                    setShowCauseForm(false);
                                    setEditingCause(null);
                                }}
                            >
                                ×
                            </button>
                        </div>


                        {/* Image */}
                        {!editingCause && (<div className={styles.causeFormGroup}>
                            <label htmlFor="causeImage">
                                Cause Image
                            </label>

                            <div className={styles.causeFileBox}>
                                <input
                                    id="causeImage"
                                    type="file"
                                    name="image"
                                    accept="image/png, image/jpeg, image/webp"
                                    required
                                />

                                <p>
                                    JPG, PNG or WebP image
                                </p>
                            </div>
                        </div>)}


                        {/* Name */}
                        <div className={styles.causeFormGroup}>
                            <label htmlFor="causeName">
                                Name
                            </label>

                            <input
                                id="causeName"
                                type="text"
                                name="name"
                                placeholder="Enter cause name"
                                defaultValue={editingCause?.name}
                                required
                            />
                        </div>


                        {/* Slug */}
                        <div className={styles.causeFormGroup}>
                            <label htmlFor="causeSlug">
                                Slug
                            </label>

                            <input
                                id="causeSlug"
                                type="text"
                                name="slug"
                                defaultValue={editingCause?.slug}
                                placeholder="example: education"
                                required
                            />

                            <small>
                                Use lowercase letters and hyphens.
                            </small>
                        </div>


                        {/* Description */}
                        <div className={styles.causeFormGroup}>
                            <label htmlFor="causeDescription">
                                Description
                            </label>

                            <textarea
                                id="causeDescription"
                                name="description"
                                rows="5"
                                defaultValue={editingCause?.description}
                                placeholder="Enter cause description..."
                                required
                            ></textarea>
                        </div>


                        {/* Display Order */}
                        <div className={styles.causeFormGroup}>
                            <label htmlFor="displayOrder">
                                Display Order
                            </label>

                            <input
                                id="displayOrder"
                                type="number"
                                name="displayOrder"
                                min="0"
                                defaultValue={editingCause?.displayOrder}
                                placeholder="Enter display order"
                                required
                            />

                            <small>
                                Lower numbers will appear first.
                            </small>
                        </div>


                        {/* Is Active */}
                        <div className={styles.causeActiveBox}>

                            <label className={styles.causeCheckboxLabel}>
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    defaultChecked={editingCause?.isActive}
                                />

                                <span>
                                    Active Cause
                                </span>
                            </label>

                            <p>
                                Active causes will be visible to users.
                            </p>

                        </div>


                        {/* Buttons */}
                        <div className={styles.causeFormActions}>

                            <button
                                type="button"
                                className={styles.causeCancelBtn}
                                onClick={() => setShowCauseForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={styles.causeSubmitBtn}
                            >
                                {editingCause ? "Update Cause" : "Add Cause"}
                            </button>

                        </div>

                    </form>
                </div>
            )}

            {/*Create a form for add service*/}
            {showServiceForm && (
                <div className={styles.serviceFormOverlay}>
                    <form
                        className={styles.serviceForm}
                        onSubmit={handleAddService}
                    >

                        {/* Header */}
                        <div className={styles.serviceFormHeader}>
                            <div>
                                <h2>{editingService ? "Update A Service" : "Add New Service"}</h2>
                                <p>{editingService ? "Update a service or gift for donations" : "Add a new service or gift for donations"}</p>
                            </div>

                            <button
                                type="button"
                                className={styles.serviceCloseBtn}
                                onClick={() => {
                                    setShowServiceForm(false)
                                    setEditingService(null);
                                }}
                            >
                                ×
                            </button>
                        </div>


                        {/* Image */}
                        {!editingService && (<div className={styles.serviceFormGroup}>
                            <label htmlFor="serviceImage">
                                Service Image
                            </label>

                            <div className={styles.serviceFileBox}>
                                <input
                                    id="serviceImage"
                                    type="file"
                                    name="image"
                                    accept="image/png, image/jpeg, image/webp"
                                    required
                                />

                                <p>
                                    JPG, PNG or WebP image
                                </p>
                            </div>
                        </div>)}


                        {/* Name */}
                        <div className={styles.serviceFormGroup}>
                            <label htmlFor="serviceName">
                                Name
                            </label>

                            <input
                                id="serviceName"
                                type="text"
                                name="name"
                                placeholder="Enter service name"
                                defaultValue={editingService?.name}
                                required
                            />
                        </div>


                        {/* Description */}
                        <div className={styles.serviceFormGroup}>
                            <label htmlFor="serviceDescription">
                                Description
                            </label>

                            <textarea
                                id="serviceDescription"
                                name="description"
                                defaultValue={editingService?.description}
                                rows="5"
                                placeholder="Enter service description..."
                                required
                            />
                        </div>


                        {/* Price */}
                        <div className={styles.serviceFormGroup}>
                            <label htmlFor="servicePrice">
                                Price
                            </label>

                            <input
                                id="servicePrice"
                                type="number"
                                name="price"
                                min="0"
                                step="0.01"
                                defaultValue={editingService?.price}
                                placeholder="Enter service price"
                                required
                            />
                        </div>


                        {/* Is Active */}
                        <div className={styles.serviceActiveBox}>

                            <label className={styles.serviceCheckboxLabel}>
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    defaultChecked={editingService?.isActive}
                                />

                                <span>
                                    Active Service
                                </span>
                            </label>

                            <p>
                                Active services will be visible to users.
                            </p>

                        </div>


                        {/* Buttons */}
                        <div className={styles.serviceFormActions}>

                            <button
                                type="button"
                                className={styles.serviceCancelBtn}
                                onClick={() => setShowServiceForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={styles.serviceSubmitBtn}
                                disabled={servicesLoading}
                            >
                                {editingService ? "Update" : "Add Service"}
                            </button>

                        </div>

                    </form>
                </div>
            )}

            {showCampaignForm && (
                <div className={styles.campaignFormOverlay}>
                    <form
                        className={styles.campaignForm}
                        onSubmit={handleAddCampaign}
                    >

                        {/* Header */}
                        <div className={styles.campaignFormHeader}>
                            <div>
                                <h2>{editingCampaign ? "Update Campaign" : "Create New Campaign"}</h2>
                                <p>{editingCampaign ? "Update a fundraising campaign" : "Create a new fundraising campaign"}</p>
                            </div>

                            <button
                                type="button"
                                className={styles.campaignCloseBtn}
                                onClick={() => {
                                    setShowCampaignForm(false);
                                    setEditingCampaign(null);
                                }}
                            >
                                ×
                            </button>
                        </div>


                        {/* Image */}
                        {!editingCampaign && (<div className={styles.campaignFormGroup}>
                            <label htmlFor="campaignImage">
                                Campaign Image
                            </label>

                            <div className={styles.campaignFileBox}>
                                <input
                                    id="campaignImage"
                                    type="file"
                                    name="image"
                                    accept="image/png, image/jpeg, image/webp"
                                    required
                                />

                                <p>
                                    JPG, PNG or WebP image
                                </p>
                            </div>
                        </div>)}


                        {/* Title */}
                        <div className={styles.campaignFormGroup}>
                            <label htmlFor="campaignTitle">
                                Campaign Title
                            </label>

                            <input
                                id="campaignTitle"
                                type="text"
                                name="title"
                                defaultValue={editingCampaign?.title}
                                placeholder="Enter campaign title"
                                required
                            />
                        </div>


                        {/* Description */}
                        <div className={styles.campaignFormGroup}>
                            <label htmlFor="campaignDescription">
                                Description
                            </label>

                            <textarea
                                id="campaignDescription"
                                name="description"
                                rows="6"
                                defaultValue={editingCampaign?.description}
                                placeholder="Enter campaign description..."
                                required
                            />
                        </div>


                        {/* Goal Amount */}
                        <div className={styles.campaignFormGroup}>
                            <label htmlFor="campaignGoalAmount">
                                Goal Amount
                            </label>

                            <input
                                id="campaignGoalAmount"
                                type="number"
                                name="goalAmount"
                                min="1"
                                step="0.01"
                                defaultValue={editingCampaign?.goalAmount}
                                placeholder="Enter goal amount"
                                required
                            />
                        </div>


                        {/* Cause */}
                        <div className={styles.campaignFormGroup}>
                            <label htmlFor="campaignCause">
                                Cause
                            </label>

                            <select
                                id="campaignCause"
                                name="causeId"
                                defaultValue={editingCampaign?.cause.id || ""}
                                required
                            >
                                <option value="" disabled>
                                    Select a cause
                                </option>

                                {causes.map((cause) => (
                                    <option
                                        key={cause.id}
                                        value={cause.id}
                                    >
                                        {cause.name}
                                    </option>
                                ))}
                            </select>

                            <small>
                                Select the cause related to this campaign.
                            </small>
                        </div>

                        {/* Zakat Eligible */}
                        <div className={styles.campaignBooleanBox}>

                            <label className={styles.campaignCheckboxLabel}>
                                <input
                                    type="checkbox"
                                    name="zakatEligible"
                                    defaultChecked={editingCampaign?.zakatEligible}
                                />

                                <span>
                                    Zakat Eligible
                                </span>
                            </label>

                            <p>
                                Enable this if donations to this campaign are eligible for Zakat.
                            </p>

                        </div>


                        {/* Urgent */}
                        <div className={styles.campaignBooleanBox}>

                            <label className={styles.campaignCheckboxLabel}>
                                <input
                                    type="checkbox"
                                    defaultChecked={editingCampaign?.urgent}
                                    name="urgent"
                                />

                                <span>
                                    Urgent Campaign
                                </span>
                            </label>

                            <p>
                                Mark this campaign as urgent to highlight its importance to users.
                            </p>

                        </div>


                        {/* Buttons */}
                        <div className={styles.campaignFormActions}>

                            <button
                                type="button"
                                className={styles.campaignCancelBtn}
                                onClick={() => setShowCampaignForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={styles.campaignSubmitBtn}
                            >
                                {campaignsLoading ? "Adding..." : "Add Campaign"}
                            </button>

                        </div>

                    </form>
                </div>
            )}
        </>
    )
}

export default AdminDashboard;