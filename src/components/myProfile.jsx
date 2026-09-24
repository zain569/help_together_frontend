import { useEffect, useState } from 'react';
import styles from '../styles/myProfile.module.css'
import GetMyContacts from '../apis/contact/getmycontacts.get';

function MyProfile() {
    const userImage = localStorage.getItem('userProfileImage');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        GetMyContacts()
            .then((data) => { setContacts(data) })
            .catch(err => console.error(err))
    }, [])
    return (
        <>
            <section className={styles.profileHeroSection}>
                <div className={styles.profileHeroContent}>
                    <div className={styles.profilePic}>
                        <img src={userImage} alt={userName} />
                    </div>
                    <div className={styles.profileText}>
                        <h1>{userName}</h1>
                        <p>{userEmail}</p>
                        <span>"Together we can make a difference"</span>
                    </div>
                </div>
            </section>

            {/*Make a Messages section*/}
            <section className={styles.messagesSection}>
                <div className={styles.messageContent}>
                    <div className={styles.headerContent}>
                        <h1>Contact <span>Messages</span></h1>
                        <p>View and manage the messsage you've send to us. Youu can also see our response here</p>
                    </div>
                    {
                        contacts.map((contact, index) => (
                            <div key={index} className={styles.messageBox}>
                                <div className={styles.userQuestion}>
                                    <h2>{contact.subject}</h2>
                                    <p>{contact.message}</p>
                                    <span>{contact.status}</span>
                                </div>
                                <div className={styles.adminReply}>
                                    <h2>Admin Response</h2>
                                    <p>{contact.adminNote? contact.adminNote : "We are looking into your issue. We will respond soon."}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default MyProfile;