import axios from 'axios';

export const TwitchAPI = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: {
    'Client-ID': 'az2bq1wyeazt3n4f3eb009097pbjk4'
  }
});
