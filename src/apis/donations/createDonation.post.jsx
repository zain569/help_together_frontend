async function CreateDonation({ userId, amount, donationType, campaignId, paymentMethod }) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    if (paymentMethod === "STRIPE") {
        const response = await fetch(`${backendApi}donation`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, amount, donationType, campaignId, paymentMethod }),
        });

        const responseText = await response.text();
        let donationResponse = {};

        if (responseText) {
            try {
                donationResponse = JSON.parse(responseText);
            } catch {
                donationResponse = { message: responseText };
            }
        }

        if (!response.ok) {
            const message = typeof donationResponse?.message === 'string'
                ? donationResponse.message
                : `Donation failed (${response.status})`;
            throw new Error(message);
        }

        return donationResponse;
    } else if (paymentMethod === "JAZZCASH") {
        const response = await fetch(`${backendApi}donation`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, amount, donationType, campaignId, paymentMethod }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                Array.isArray(data.message) ?
                    data.message.join(", ")
                    : data.message || "Unable to Create JazzCash Payment"
            )
        };

        const form = document.createElement("form");

        form.method = "POST"
        form.action = "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/"

        Object.entries(data.paymentData).forEach(([key, value]) => {
            const input = document.createElement("input");

            input.type = "hidden";
            input.name = key;
            input.value = String(value ?? "");

            form.appendChild(input)
        });

        document.body.appendChild(form);
        form.submit();
    }
}

export default CreateDonation;
