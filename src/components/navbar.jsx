import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { clearAuthSession, readAuthSession } from '../utils/authSession';
import SearchCampaign from '../apis/campaignsAPI/searchCampaign.get';
import { currencies } from '../utils/currencies';
import { useCurrency } from '../utils/useCurrency';
import QuickDonate from './quickDonate';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
    const [isCampaignMenuOpen, setIsCampaignMenuOpen] = useState(false);
    const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
    const [isQuickDonateOpen, setIsQuickDonateOpen] = useState(false);
    const { currencyCode: selectedCurrencyCode, setCurrencyCode } = useCurrency();
    const [searchQuery, setSearchQuery] = useState('');
    const [auth, setAuth] = useState(readAuthSession());
    const [resultData, setResultData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currencyMenuRef = useRef(null);

    const isLoggedIn = Boolean(auth?.token || auth?.isUser);
    const profileUserId = auth?.user?.id || localStorage.getItem('userId') || '';
    const profileImage = auth?.user?.profileimage || auth?.user?.imageurl || '';
    const profileName = auth?.user?.displayName || auth?.user?.firstname || 'User';
    const profileInitials = profileName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('') || 'U';
    const selectedCurrency = currencies.find(({ code }) => code === selectedCurrencyCode);
    const isActive = (route) => route === '/' ? pathname === '/' : pathname.startsWith(route);
    const isCampaignsActive = pathname.startsWith('/campaigns') || pathname === '/funded_Campaigns';
    const aboutUsPaths = [
        '/about-us',
        '/our-values',
        '/our-story',
        '/what-we-do',
        '/why-helptogether',
        '/our-impact',
        '/our-partners',
        '/our-success-story',
    ];

    const isAboutUsActive = aboutUsPaths.some((path) =>
        pathname.startsWith(path)
    );

    useEffect(() => {
        if (!isCurrencyMenuOpen) return undefined;

        const closeOnOutsideClick = (event) => {
            if (!currencyMenuRef.current?.contains(event.target)) setIsCurrencyMenuOpen(false);
        };
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setIsCurrencyMenuOpen(false);
        };

        document.addEventListener('pointerdown', closeOnOutsideClick);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('pointerdown', closeOnOutsideClick);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isCurrencyMenuOpen]);

    useEffect(() => {
        const syncAuth = () => setAuth(readAuthSession());
        syncAuth();
        window.addEventListener('auth:change', syncAuth);
        return () => window.removeEventListener('auth:change', syncAuth);
    }, []);

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsAboutMenuOpen(false);
        setIsCampaignMenuOpen(false);
    };

    const handleLogout = () => {
        clearAuthSession();
        closeMenu();
        navigate('/login');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();

        if (!query) {
            setResultData([]);
            return;
        }

        setIsSearching(true);
        setResultData([]);
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

    const currencyPicker = (
        <div className={styles.currencyPicker} ref={currencyMenuRef}>
            <button
                type="button"
                className={styles.currencyTrigger}
                aria-label={`Currency: ${selectedCurrency.code}, ${selectedCurrency.name}`}
                aria-haspopup="listbox"
                aria-expanded={isCurrencyMenuOpen}
                onClick={() => setIsCurrencyMenuOpen((isOpen) => !isOpen)}
            >
                <span className={styles.currencyFlag} aria-hidden="true">{selectedCurrency.flag}</span>
                <span>{selectedCurrency.code}</span>
                <span className={styles.currencySymbol}>{selectedCurrency.symbol}</span>
                <span className={`${styles.currencyChevron} ${isCurrencyMenuOpen ? styles.currencyChevronOpen : ''}`} aria-hidden="true" />
            </button>
            {isCurrencyMenuOpen && (
                <div className={styles.currencyMenu} role="listbox" aria-label="Choose currency">
                    {currencies.map((currency) => (
                        <button
                            key={currency.code}
                            type="button"
                            role="option"
                            aria-selected={currency.code === selectedCurrencyCode}
                            className={`${styles.currencyOption} ${currency.code === selectedCurrencyCode ? styles.currencyOptionSelected : ''}`}
                            onClick={() => {
                                setCurrencyCode(currency.code);
                                setIsCurrencyMenuOpen(false);
                            }}
                        >
                            <span className={styles.currencyFlag} aria-hidden="true">{currency.flag}</span>
                            <span className={styles.currencyOptionCode}>{currency.code}</span>
                            <span className={styles.currencyOptionSymbol}>{currency.symbol}</span>
                            <span className={styles.currencyOptionName}>{currency.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

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
                        <div className={`${styles.campaignDropdown} ${isCampaignMenuOpen ? styles.campaignDropdownOpen : ''}`}>
                            <Link
                                to="/campaigns"
                                className={`${styles.navLink} ${isCampaignsActive ? styles.active : ''}`}
                                onClick={closeMenu}
                            >
                                Campaigns
                            </Link>
                            <button
                                type="button"
                                className={styles.campaignMenuToggle}
                                aria-label="Toggle Campaigns menu"
                                aria-expanded={isCampaignMenuOpen}
                                aria-controls="campaign-menu"
                                onClick={() => setIsCampaignMenuOpen((isOpen) => !isOpen)}
                            >
                                <span className={styles.dropdownArrow} aria-hidden="true">⌄</span>
                            </button>
                            <div id="campaign-menu" className={styles.campaignMenu}>
                                <Link to="/funded_Campaigns" onClick={closeMenu}>
                                    <span className={styles.fundedMenuMark} aria-hidden="true">✓</span>
                                    <span>
                                        <strong>Funded campaigns</strong>
                                        <small>See goals reached together</small>
                                    </span>
                                </Link>
                                <Link to="/campaigns-updates" onClick={closeMenu}>
                                    <span className={styles.fundedMenuMark} aria-hidden="true">★</span>
                                    <span>
                                        <strong>Campaign updates</strong>
                                        <small>Follow the latest progress</small>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <Link to="/service-gifts" className={`${styles.navLink} ${isActive('/service-gifts') ? styles.active : ''}`} onClick={closeMenu}>Service Gifts</Link>
                        <Link to="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`} onClick={closeMenu}>Contact</Link>
                        <div className={`${styles.aboutDropdown} ${isAboutMenuOpen ? styles.aboutDropdownOpen : ''}`}>
                            <Link
                                to="/about-us"
                                className={`${styles.navLink} ${isAboutUsActive ? styles.active : ''
                                    }`}
                                onClick={closeMenu}
                            >
                                About Us
                            </Link>
                            <button
                                type="button"
                                className={styles.aboutMenuToggle}
                                aria-label="Toggle About Us menu"
                                aria-expanded={isAboutMenuOpen}
                                aria-controls="about-mega-menu"
                                onClick={() => setIsAboutMenuOpen((isOpen) => !isOpen)}
                            >
                                <span className={styles.dropdownArrow} aria-hidden="true">⌄</span>
                            </button>

                            <div id="about-mega-menu" className={styles.aboutMegaMenu}>
                                <div className={styles.aboutMenuContainer}>
                                    <div className={styles.aboutMenuColumn}>
                                        <h3>About HelpTogether</h3>

                                        <div className={styles.aboutMenuLinks}>
                                            <Link to="/our-values" onClick={closeMenu}>
                                                Our Values
                                            </Link>
                                            <Link to="/our-story" onClick={closeMenu}>
                                                Our Story
                                            </Link>
                                            <Link to="/what-we-do" onClick={closeMenu}>
                                                What We Do
                                            </Link>
                                            <Link to="/why-helptogether" onClick={closeMenu}>
                                                Why HelpTogether
                                            </Link>
                                        </div>
                                    </div>

                                    <div className={styles.aboutMenuColumn}>
                                        <h3>Our Impact</h3>

                                        <div className={styles.aboutMenuLinks}>
                                            <Link to="/our-impact" onClick={closeMenu}>
                                                Our Impact
                                            </Link>
                                            <Link to="/our-partners" onClick={closeMenu}>
                                                Our Partners
                                            </Link>
                                            <Link to="/our-success-story" onClick={closeMenu}>
                                                Our Success Story
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            <button type="submit" disabled={isSearching}>Search</button>
                            {resultData.length > 0 && (
                                <div className={styles.searchResults} role="listbox" aria-label="Campaign search results">
                                    {resultData.map((campaign, index) => {
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
                                    })}
                                </div>
                            )}
                        </form>

                        {isLoggedIn ? (
                            <>
                                <Link to="/my-donations" className={`${styles.myDonations} ${isActive('/my-donations') ? styles.activeAction : ''}`} onClick={closeMenu}>My Donations</Link>
                                <Link
                                    to={profileUserId ? `/profile/${profileUserId}` : '/login'}
                                    className={`${styles.profile} ${isActive('/profile') ? styles.activeProfile : ''}`}
                                    onClick={closeMenu}
                                    aria-label="Open profile"
                                >
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile Picture" />
                                    ) : (
                                        <span className={styles.profileFallback}>{profileInitials}</span>
                                    )}
                                </Link>
                                <div className={styles.quickActions}>
                                    <button type="button" className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                                    {currencyPicker}
                                    <button
                                        type="button"
                                        className={styles.quickDonateButton}
                                        onClick={() => setIsQuickDonateOpen(true)}
                                    >
                                        Quick Donate
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={styles.loginButton} onClick={closeMenu}>Login</Link>
                                <Link to="/register" className={styles.registerButton} onClick={closeMenu}>Register</Link>
                                <div className={styles.quickActions}>
                                    {currencyPicker}
                                    <button
                                        type="button"
                                        className={styles.quickDonateButton}
                                        onClick={() => setIsQuickDonateOpen(true)}
                                    >
                                        Quick Donate
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isQuickDonateOpen && (
                <QuickDonate
                    isLoggedIn={isLoggedIn}
                    onClose={() => setIsQuickDonateOpen(false)}
                />
            )}
        </nav>
    )
};

export default Navbar;
