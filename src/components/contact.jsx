import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/contact.module.css';
import { readAuthSession } from '../utils/authSession';
import SendMessage from '../apis/contact/contact.post';

function getContactUser() {
    const session = readAuthSession();

    return {
        userId: localStorage.getItem('userId') || session?.user?.id || '',
        name: localStorage.getItem('userName') || session?.user?.displayName || '',
        email: localStorage.getItem('userEmail') || session?.user?.email || '',
    };
}

function Contact() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => ({
        ...getContactUser(),
        subject: '',
        message: '',
    }));
    const [formStatus, setFormStatus] = useState('');
    const isLoggedIn = Boolean(readAuthSession()?.token || readAuthSession()?.isUser || localStorage.getItem('userId'));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({ ...currentData, [name]: value }));
        setFormStatus('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const isValidUserId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(formData.userId);

        if (!formData.name.trim() || !formData.subject.trim() || !formData.message.trim()) {
            setFormStatus('Please fill in all fields.');
            return;
        }

        if (!isValidEmail || !isValidUserId) {
            setFormStatus('Your account information is invalid. Please log in again.');
            return;
        }

        if (!isLoggedIn) {
            setFormStatus('Please log in before sending a message.');
            return;
        }

        SendMessage(formData)
            .then(() => {
                setFormStatus('Message submitted successfully.');
                setFormData({ ...getContactUser(), subject: '', message: '' });
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                setFormStatus('Failed to send message. Please try again.');
            });
    };

    return (
        <main className={styles.contactPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.eyebrow}>✉ Get In Touch</span>
                    <h1>Contact Us<br /><span>We&apos;re Here to Help</span></h1>
                    <p>Have a question, suggestion, or just want to say hello?<br />We&apos;d love to hear from you. Reach out to us and be a part of something bigger.</p>
                </div>
            </section>

            <section className={styles.contactContent}>
                <div className={styles.connectPanel}>
                    <div className={styles.introBlock}>
                        <span className={styles.iconCircle}>♥</span>
                        <div>
                            <h2>Let&apos;s Connect</h2>
                            <p>Your thoughts and support mean a lot to us. Whether it&apos;s a partnership, a question, or feedback, we&apos;re always happy to hear from you.</p>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.iconCircle}>✉</span>
                        <div><h3>Send Us a Message</h3><p>Use the contact form to drop us a message. We&apos;ll get back to you as soon as possible.</p></div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.iconCircle}>♟</span>
                        <div><h3>Support Our Mission</h3><p>Together, we can create real change. Your support helps us reach more people and build stronger communities.</p></div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.iconCircle}>◆</span>
                        <div><h3>Make a Difference</h3><p>Every message, every share, every act of kindness helps us move closer to a better tomorrow.</p></div>
                    </div>
                    <p className={styles.signature}>Small Acts. Big Changes</p>
                </div>

                <div className={styles.formCard}>
                    <div className={styles.formHeading}>
                        <span className={styles.iconCircle}>➤</span>
                        <div><h2>Send Us a Message</h2><p>Fill in the details below and we&apos;ll get back to you shortly.</p></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="contact-subject">Subject</label>
                        <input id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter a subject..." required />

                        <label htmlFor="contact-name">Name</label>
                        <input id="contact-name" name="name" value={formData.name} readOnly placeholder="Your name" />

                        <label htmlFor="contact-email">Email</label>
                        <input id="contact-email" name="email" type="email" value={formData.email} readOnly placeholder="your@email.com" />

                        <label htmlFor="contact-message">Message</label>
                        <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message..." rows="5" required />

                        {formStatus && <p className={styles.formStatus} role="status">{formStatus}</p>}
                        <button type="submit">➤ Send Message <span aria-hidden="true">→</span></button>
                        {!isLoggedIn && <button type="button" className={styles.loginPrompt} onClick={() => navigate('/login')}>Log in to send</button>}
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Contact;