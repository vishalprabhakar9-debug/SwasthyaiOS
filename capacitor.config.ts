import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.swasthya.app",
  appName: "Swasthya",
  webDir: "out",
  backgroundColor: "#f7f3ec",
  android: {
    backgroundColor: "#f7f3ec",
  },
  server: {
    androidScheme: "https",
  },
};

export default config;
