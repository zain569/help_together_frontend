import { useSyncExternalStore } from "react";
import {
	getApiLoadingSnapshot,
	subscribeToApiLoading,
} from "../utils/apiLoading";
import styles from "../styles/loading.module.css";

function GlobalLoading() {
	const isLoading = useSyncExternalStore(
		subscribeToApiLoading,
		getApiLoadingSnapshot,
		() => false
	);

	if (!isLoading) {
		return null;
	}

	return (
		<div className={styles.loadingOverlay} role="status" aria-label="Loading">
			<div className={styles.loadingContainer}>
				<video
					className={styles.loadingVideo}
					src="/loading-video.mp4"
					autoPlay
					muted
					loop
					playsInline
					aria-hidden="true"
				/>
			</div>
		</div>
	);
}

export default GlobalLoading;