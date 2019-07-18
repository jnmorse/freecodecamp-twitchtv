import axios from 'axios';

export const users = axios.create({
  baseURL: 'https://api.twitch.tv/helix/users',
  headers: {
    'Client-ID': 'az2bq1wyeazt3n4f3eb009097pbjk4'
  }
});

export const streams = axios.create({
  baseURL: 'https://api.twitch.tv/helix/streams',
  headers: {
    'Client-ID': 'az2bq1wyeazt3n4f3eb009097pbjk4'
  }
});
