import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aayanmaheshwari.power',
  appName: 'powerscraper',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
