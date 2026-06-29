import axios from 'axios';

// Get backend URL from environment variables, fallback to direct Gradio server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sathwikp06-cf-problem-recommender.hf.space';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90 seconds (CF API + LLM analysis can take time)
});

/**
 * Fetch Codeforces problem recommendations.
 * Uses the Gradio 5.x REST API protocol.
 * @param {Object} params
 * @param {string} params.username - Codeforces username
 * @param {string[]} params.topics - Selected topics of interest
 * @param {number} params.numProblems - Number of problems requested
 * @returns {Promise<{profile_analysis: string, recommended_problems: string}>}
 */
export const getRecommendations = async ({ username, topics, numProblems }) => {
  try {
    // Step 1: Initialize the Gradio predict event queue via POST
    const postResponse = await api.post('/gradio_api/call/recommend', {
      data: [
        username,
        topics || [],
        numProblems,
      ]
    });

    const eventId = postResponse.data.event_id;
    if (!eventId) {
      throw new Error('Failed to initialize recommendation engine session.');
    }

    // Step 2: Poll/Stream the result from the Gradio event ID via GET
    const getResponse = await api.get(`/gradio_api/call/recommend/${eventId}`);

    // Parse the SSE (Server-Sent Events) formatted output to extract the completed payload
    const lines = getResponse.data.split('\n');
    let currentEvent = '';
    let completeData = null;

    for (const line of lines) {
      if (line.startsWith('event:')) {
        currentEvent = line.replace('event:', '').trim();
      } else if (line.startsWith('data:')) {
        const rawData = line.replace('data:', '').trim();
        if (currentEvent === 'complete') {
          try {
            completeData = JSON.parse(rawData);
          } catch (e) {
            console.error('Error parsing SSE payload JSON', e);
          }
        }
      }
    }

    if (!completeData || !Array.isArray(completeData)) {
      throw new Error('Analysis completed but did not return any recommendations.');
    }

    // Index 4 contains the backend error message if there's any failure
    const backendError = completeData[4]?.value;
    if (backendError) {
      // Clean up the error symbols and asterisks
      let cleanError = backendError
        .replace('❌', '')
        .replace('Error:', '')
        .replace(/^\*+\s*/, '')
        .replace(/\s*\*+$/, '')
        .trim();
      throw new Error(cleanError);
    }

    // Index 2 is Profile Analysis (Markdown)
    // Index 3 is Recommended Problems (HTML)
    const profile_analysis = completeData[2]?.value || '';
    const recommended_problems = completeData[3]?.value || '';

    return {
      profile_analysis,
      recommended_problems,
    };
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to retrieve recommendations from server';
    throw new Error(errorMessage);
  }
};

export default {
  getRecommendations,
};
