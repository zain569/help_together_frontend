function parseCampaignDate(value) {
    if (!value) return null;

    if (typeof value === 'string') {
        const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
        if (dateOnlyMatch) {
            const [, year, month, day] = dateOnlyMatch;
            const date = new Date(Number(year), Number(month) - 1, Number(day));
            return Number.isNaN(date.getTime()) ? null : date;
        }
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    date.setHours(0, 0, 0, 0);
    return date;
}

function getCalendarDaysBetween(fromDate, toDate) {
    const fromUtc = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    const toUtc = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    return Math.round((toUtc - fromUtc) / (24 * 60 * 60 * 1000));
}

function campaignDateDetails(campaign) {
    const startDate = parseCampaignDate(campaign?.startDate || campaign?.start_date);
    const endDate = parseCampaignDate(campaign?.endDate || campaign?.end_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysLeft = endDate ? Math.max(0, getCalendarDaysBetween(today, endDate)) : null;

    let progress = null;
    if (startDate && endDate) {
        const duration = getCalendarDaysBetween(startDate, endDate);
        if (duration > 0) {
            progress = Math.max(0, Math.min(
                (getCalendarDaysBetween(startDate, today) / duration) * 100,
                100,
            ));
        } else {
            progress = daysLeft === 0 ? 100 : 0;
        }
    }

    return { startDate, endDate, daysLeft, progress };
}

export function isCampaignDonationClosed(campaign) {
    if (campaign?.status?.toLowerCase() === 'funded') return true;

    const { daysLeft } = campaignDateDetails(campaign);
    return daysLeft === 0;
}

export function canDonateToCampaign(campaign) {
    const goal = Number(campaign?.goalAmount || campaign?.targetAmount || 0);
    const raised = Number(campaign?.collectedAmount || campaign?.raisedAmount || 0);

    return !isCampaignDonationClosed(campaign) && !(goal > 0 && raised >= goal);
}

export function formatCampaignDate(date) {
    return date
        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Not set';
}

export { campaignDateDetails };
