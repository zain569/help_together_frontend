import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/navbar.module.css';

function Navbar({ isLoggedIn = false }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isActive = (route) => route === '/' ? pathname === '/' : pathname.startsWith(route);

    const closeMenu = () => setIsMenuOpen(false);

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();

        if (query) {
            navigate(`/campaigns?search=${encodeURIComponent(query)}`);
            closeMenu();
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo} onClick={closeMenu}>
                    <div className={styles.logoImage}>
                        <img src="/favicon.png" alt="HelpTogether logo" />
                    </div>
                    <div className={styles.logoText}>
                        <h1>Help<span>Together</span></h1>
                        <p>Small Acts <span aria-hidden="true">•</span> Big Change</p>
                    </div>
                </Link>

                <button
                    type="button"
                    className={styles.menuToggle}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                >
                    <span /><span /><span />
                </button>

                <div id="primary-navigation" className={`${styles.navigationArea} ${isMenuOpen ? styles.menuOpen : ''}`}>
                    <div className={styles.navLinks}>
                        <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`} onClick={closeMenu}>Home</Link>
                        <Link to="/campaigns" className={`${styles.navLink} ${isActive('/campaigns') ? styles.active : ''}`} onClick={closeMenu}>Campaigns</Link>
                        <Link to="/service-gifts" className={`${styles.navLink} ${isActive('/service-gifts') ? styles.active : ''}`} onClick={closeMenu}>Service Gifts</Link>
                        <Link to="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`} onClick={closeMenu}>Contact</Link>
                    </div>

                    <div className={styles.rightSide}>
                        <form className={styles.searchForm} onSubmit={handleSearch} role="search">
                            <span className={styles.searchIcon} aria-hidden="true">⌕</span>
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search campaigns"
                                aria-label="Search campaigns"
                            />
                            <button type="submit">Search</button>
                        </form>

                        {isLoggedIn ? (
                            <>
                                <Link to="/my-donations" className={`${styles.myDonations} ${isActive('/my-donations') ? styles.activeAction : ''}`} onClick={closeMenu}>My Donations</Link>
                                <Link to="/profile" className={`${styles.profile} ${isActive('/profile') ? styles.activeProfile : ''}`} onClick={closeMenu} aria-label="Open profile"><img src="https://res.cloudinary.com/dkgeren05/image/upload/v1789876344/default-donation-website-pic_rymjog.png" alt="Profile Picture" /></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={styles.loginButton} onClick={closeMenu}>Login</Link>
                                <Link to="/register" className={styles.registerButton} onClick={closeMenu}>Register</Link>
                            </>
                        )}

                        <Link to="/donate" className={`${styles.donateButton} ${isActive('/donate') ? styles.activeDonate : ''}`} onClick={closeMenu}>Donate Now</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;