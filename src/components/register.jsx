import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import RegisterUserApi from '../apis/register.api';
import { saveAuthSession } from '../utils/authSession';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [profilePreview, setProfilePreview] = useState('');
    const [image, setImage] = useState(null);
    const [registerUserData, setRegisterUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleProfileImage = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfilePreview(URL.createObjectURL(file));
            setImage(file);
        }
    };

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const data = await RegisterUserApi(registerUserData, image);

            if (data?.user) {
                saveAuthSession(data);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main className={styles.authPage}>
            <section className={styles.impactPanel}>
                <Link to="/" className={styles.brand}>
                    <div className={styles.logoImage}><img src="/favicon.png" alt="HelpTogether logo" /></div>
                    <div className={styles.logoText}><h1>Help<span>Together</span></h1><p>Small Acts <span aria-hidden="true">•</span> Big Change</p></div>
                </Link>
                <div className={styles.impactCopy}><p className={styles.eyebrow}>Your kindness starts here</p><h2>Give Hope,<br />Create <span>Change</span></h2><p>Create your account and join people turning small acts of kindness into brighter futures.</p></div>
                <div className={styles.impactPoints}><div><strong>♥</strong><span>Support<br />Communities</span></div><div><strong>♣</strong><span>Create<br />Opportunities</span></div><div><strong>◆</strong><span>Build a<br />Brighter Future</span></div></div>
                <div className={styles.heartArt} aria-hidden="true">♥</div>
            </section>

            <section className={styles.formPanel}>
                <div className={`${styles.formCard} ${styles.registerCard}`}>
                    <div className={styles.authTabs}><Link to="/login">Login</Link><span className={styles.selectedTab}>Register</span></div>
                    <div className={styles.formHeading}><h2>Create Account</h2><p>Join the HelpTogether community</p></div>
                    <form className={styles.authForm} onSubmit={handleRegister}>
                        <div className={styles.fieldRow}>
                            <div><label htmlFor="first-name">First Name</label>
                                <input id="first-name" name="firstName" type="text" value={registerUserData.firstName} onChange={(e) => setRegisterUserData({ ...registerUserData, firstName: e.target.value })} placeholder="First name" required /></div>
                            <div><label htmlFor="last-name">Last Name</label>
                                <input id="last-name" name="lastName" type="text" value={registerUserData.lastName} onChange={(e) => setRegisterUserData({ ...registerUserData, lastName: e.target.value })} placeholder="Last name" required /></div>
                        </div>
                        <label htmlFor="register-email">Email Address</label>
                        <div className={styles.inputWrap}><span aria-hidden="true">✉</span><input id="register-email" name="email" type="email" value={registerUserData.email} onChange={(e) => setRegisterUserData({ ...registerUserData, email: e.target.value })} placeholder="Enter your email" required /></div>
                        <label htmlFor="register-password">Password</label>
                        <div className={styles.inputWrap}><span aria-hidden="true">▣</span><input id="register-password" name="password" type={showPassword ? 'text' : 'password'} value={registerUserData.password} onChange={(e) => setRegisterUserData({ ...registerUserData, password: e.target.value })} placeholder="Create a password" minLength="8" required /><button type="button" className={styles.passwordToggle} onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? '◉' : '◌'}</button></div>
                        <label className={styles.profileUpload} htmlFor="profile-image">
                            <span className={styles.uploadPreview}>{profilePreview ? <img src={profilePreview} alt="Selected profile preview" /> : '＋'}</span>
                            <span><strong>Profile picture <em>(optional)</em></strong><small>Choose an image to personalize your profile</small></span>
                            <input id="profile-image" name="profileImage" type="file" accept="image/*" onChange={handleProfileImage} />
                        </label>
                        <button type="submit" className={styles.submitButton}>Create Account <span aria-hidden="true">→</span></button>
                    </form>
                    <p className={styles.switchAuth}>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </section>
        </main>
    )
}

export default Register;
