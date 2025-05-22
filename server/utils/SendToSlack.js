const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const sendToSlack = async (message) => {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) throw new Error('Slack webhook URL not configured');

    await axios.post(webhookUrl, { text: message });
    return { success: true };
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendToSlack };
