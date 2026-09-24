import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { readAuthSession } from '../utils/authSession';
import SearchCampaign from '../apis/campaignsAPI/searchCampaign.get';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [auth, setAuth] = useState(readAuthSession());
    const [resultData, setResultData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isLoggedIn = Boolean(auth?.token || auth?.isUser);
    const profileImage = auth?.user?.profileimage || auth?.user?.imageurl || '';
    const profileName = auth?.user?.displayName || auth?.user?.firstname || 'User';
    const profileInitials = profileName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('') || 'U';
    const isActive = (route) => route === '/' ? pathname === '/' : pathname.startsWith(route);

    useEffect(() => {
        const syncAuth = () => setAuth(readAuthSession());
        syncAuth();
        window.addEventListener('auth:change', syncAuth);
        return () => window.removeEventListener('auth:change', syncAuth);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();

        if (!query) {
            setResultData([]);
            return;
        }

        setIsSearching(true);
        SearchCampaign(query)
            .then((data) => {
                const campaigns = Array.isArray(data)
                    ? data
                    : data?.campaigns || data?.results || [];
                setResultData(Array.isArray(campaigns) ? campaigns : []);
            })
            .catch((error) => {
                console.error('Search failed:', error);
                setResultData([]);
            })
            .finally(() => setIsSearching(false));
    };

    const openCampaign = (campaign) => {
        const campaignId = campaign.id || campaign._id;
        if (!campaignId) return;

        navigate(`/campaigns/${campaignId}`);
        setResultData([]);
        closeMenu();
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
                            <button type="submit" disabled={isSearching}>
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                            {(isSearching || resultData.length > 0) && (
                                <div className={styles.searchResults} role="listbox" aria-label="Campaign search results">
                                    {isSearching ? (
                                        <p className={styles.searchStatus}>Searching campaigns...</p>
                                    ) : (
                                        resultData.map((campaign, index) => {
                                            const campaignTitle = campaign.title || campaign.name || 'Untitled campaign';
                                            const campaignId = campaign.id;

                                            return (
                                                <button
                                                    className={styles.searchResult}
                                                    key={campaignId || `${campaignTitle}-${index}`}
                                                    type="button"
                                                    role="option"
                                                    onClick={() => openCampaign(campaign)}
                                                    disabled={!campaignId}
                                                >
                                                    {campaignTitle}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </form>

                        {isLoggedIn ? (
                            <>
                                <Link to="/my-donations" className={`${styles.myDonations} ${isActive('/my-donations') ? styles.activeAction : ''}`} onClick={closeMenu}>My Donations</Link>
                                <Link to="/profile" className={`${styles.profile} ${isActive('/profile') ? styles.activeProfile : ''}`} onClick={closeMenu} aria-label="Open profile">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile Picture" />
                                    ) : (
                                        <span className={styles.profileFallback}>{profileInitials}</span>
                                    )}
                                </Link>
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