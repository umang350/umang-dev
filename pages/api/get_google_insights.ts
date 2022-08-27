const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const propertyId = process.env.PROPERTY_ID;
const JSON_DATA = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const google_insights = async (req, res) => {

    const data = await runReport();

    const responeData = {
        pageViews: data.rows[0].metricValues[2].value,
        eventCount: data.rows[0].metricValues[1].value,
        active28DayUsers: data.rows[0].metricValues[0].value
    }

    return res.status(200).json(responeData);
};

async function runReport() {


    const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: JSON_DATA
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