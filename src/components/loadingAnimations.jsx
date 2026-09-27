import styles from "../styles/loading.module.css";

const Loading = () => {
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.loadingContainer}>
                <video
                    className={styles.loadingVideo}
                    src="loading-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
        </div>
    );
};

export default Loading;