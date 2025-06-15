
import { useEffect } from "react";
import { PushNotifications, Token, ActionPerformed, PushNotificationSchema } from "@capacitor/push-notifications";

export function usePushNotifications() {
  useEffect(() => {
    // Request permission
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === "granted") {
        // Register with Apple/Google to receive notifications
        PushNotifications.register();
      }
    });

    // On registration, log token
    PushNotifications.addListener("registration", (token: Token) => {
      console.log("Push registration success, token: ", token.value);
    });

    // On registration error
    PushNotifications.addListener("registrationError", err => {
      console.error("Push registration error: ", err.error);
    });

    // On push received while app is foregrounded
    PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
      console.log("Push received in foreground: ", notification);
      // You can show a toast or display something custom here
    });

    // When notification is tapped
    PushNotifications.addListener("pushNotificationActionPerformed", (action: ActionPerformed) => {
      console.log("Push action performed: ", action.notification);
    });

    // Clean-up (remove listeners)
    return () => {
      // Capacitor's listeners are auto-cleaned up, but you can manually remove if needed.
    }
  }, []);
}
