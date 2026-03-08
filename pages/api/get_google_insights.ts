const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const google_insights = async (req, res) => {
    const propertyId = process.env.PROPERTY_ID;
    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

    if (!propertyId || !credentialsJson) {
        return res.status(500).json({ error: 'Missing Google Analytics environment variables' });
    }

    try {
        const data = await runReport(propertyId, JSON.parse(credentialsJson));

        const responeData = {
            pageViews: data.rows[0].metricValues[2].value,
            eventCount: data.rows[0].metricValues[1].value,
            active28DayUsers: data.rows[0].metricValues[0].value
        }

        return res.status(200).json(responeData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch Google Analytics data' });
    }
};

async function runReport(propertyId: string, credentials: object) {

    const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials
    });

    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,

        dateRanges: [
            {
                startDate: '30daysAgo',
                endDate: 'today',
            },
        ],
        metrics: [
            {
                name: 'active28DayUsers',
            },
            {
                name: 'eventCount'
            },
            {
                name: 'screenPageViews'
            }
        ],
    });

    return response;
}

export default google_insights;