
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.624547dc459e4c6d9740b72b9d6fe332',
  appName: 'The Gift in Grief',
  webDir: 'dist',
  server: {
    url: 'https://624547dc-459e-4c6d-9740-b72b9d6fe332.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false,
    },
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
