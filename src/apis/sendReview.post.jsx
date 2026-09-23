async function PostRevies(reviewData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}testimonial`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) throw new Error('Review submission failed');

    const savedReview = await response.json();

    return savedReview;
}

export default PostRevies;