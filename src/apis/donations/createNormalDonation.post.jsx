async function CreateNormalDonation(donationDetails) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    if (donationDetails.paymentMethod === "STRIPE") {
        const response = await fetch(`${backendApi}donation`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donationDetails),
        });

        const donationResponse = await response.json();

        return donationResponse;
    } else if (donationDetails.paymentMethod === "JAZZCASH") {
        const response = await fetch(`${backendApi}donation`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donationDetails),
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

export default CreateNormalDonation;