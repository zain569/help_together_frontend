import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import LoginUserApi from '../apis/loginUser.api';
import { saveAuthSession } from '../utils/authSession';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginUserData, setLoginUserData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false)
    const [resData, setResData] = useState(null)
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const data = await LoginUserApi(loginUserData);

            setResData(data.message);

            if (data?.token) {
                saveAuthSession(data);
                navigate('/');
            }
            setLoading(false)
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false)
        }
    };

    return (
        <main className={styles.authPage}>
            <section className={styles.impactPanel}>
                <Link to="/" className={styles.brand}>
                    <div className={styles.logoImage}><img src="/favicon.png" alt="HelpTogether logo" /></div>
                    <div className={styles.logoText}>
                        <h1>Help<span>Together</span></h1>
                        <p>Small Acts <span aria-hidden="true">•</span> Big Change</p>
                    </div>
                </Link>
                <div className={styles.impactCopy}>
                    <p className={styles.eyebrow}>Welcome to a kinder community</p>
                    <h2>Together,<br />We Can Make a <span>Difference</span></h2>
                    <p>Join our community and help those in need. Your support brings hope, creates opportunities and changes lives.</p>
                </div>
                <div className={styles.impactPoints}>
                    <div><strong>♥</strong><span>Support<br />Communities</span></div>
                    <div><strong>♣</strong><span>Create<br />Opportunities</span></div>
                    <div><strong>◆</strong><span>Build a<br />Brighter Future</span></div>
                </div>
                <div className={styles.heartArt} aria-hidden="true">♥</div>
            </section>

            <section className={styles.formPanel}>
                <div className={styles.formCard}>
                    <div className={styles.authTabs}>
                        <span className={styles.selectedTab}>Login</span>
                        <Link to="/register">Register</Link>
                    </div>
                    <div className={styles.formHeading}>
                        <h2>Welcome Back</h2>
                        <p>Log in to your HelpTogether account</p>
                    </div>
                    <form className={styles.authForm} onSubmit={handleLoginSubmit}>
                        <label htmlFor="login-email">Email Address</label>
                        <div className={styles.inputWrap}>
                            <span aria-hidden="true">✉</span>
                            <input id="login-email" name="email" type="email" value={loginUserData.email} onChange={(e) => setLoginUserData({...loginUserData, email: e.target.value})} placeholder="Enter your email" required />
                        </div>

                        <label htmlFor="login-password">Password</label>
                        <div className={styles.inputWrap}>
                            <span aria-hidden="true">▣</span>
                            <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} value={loginUserData.password} onChange={(e) => setLoginUserData({...loginUserData, password: e.target.value})} placeholder="Enter your password" required />
                            <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? '◉' : '◌'}</button>
                        </div>

                        <div style={{color: 'red', display: resData?'block':'none'}} className={styles.errorMessage}><p>**{resData}**</p></div>

                        <button type="submit" disabled={loading} className={styles.submitButton}>{loading? 'Logining...':'Login'}<span aria-hidden="true">→</span></button>
                    </form>
                    <p className={styles.switchAuth}>Don&apos;t have an account? <Link to="/register">Register now</Link></p>
                </div>
            </section>
        </main>
    )
}

export default Login;
