const listeners = new Set();
const fetchTrackerMarker = Symbol.for("donation-frontend.fetch-tracker");
let activeRequests = 0;

function notifyListeners() {
	for (const listener of listeners) {
		listener();
	}
}

export function subscribeToApiLoading(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function getApiLoadingSnapshot() {
	return activeRequests > 0;
}

export function installApiLoadingTracker() {
	if (typeof window === "undefined" || window.fetch[fetchTrackerMarker]) {
		return;
	}

	const originalFetch = window.fetch;
	const trackedFetch = function (...args) {
		const requestInit = args[1] || {};
		const requestHeaders = new Headers(requestInit.headers || {});
		if (requestHeaders.get('X-Skip-Global-Loading') === 'true') {
			return originalFetch.apply(window, args);
		}

		activeRequests += 1;
		notifyListeners();

		const finishRequest = () => {
			activeRequests = Math.max(0, activeRequests - 1);
			notifyListeners();
		};

		try {
			return Promise.resolve(originalFetch.apply(window, args)).finally(finishRequest);
		} catch (error) {
			finishRequest();
			throw error;
		}
	};

	Object.defineProperty(trackedFetch, fetchTrackerMarker, { value: true });
	window.fetch = trackedFetch;
}