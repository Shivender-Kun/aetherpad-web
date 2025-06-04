// "use server";

// import webpush from "web-push";

// webpush.setVapidDetails(
//   window.location.origin,
//   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//   process.env.VAPID_PRIVATE_KEY!
// );

// // Helper to convert browser PushSubscription to web-push compatible format
// // function toWebPushSubscription(sub: any): webpush.PushSubscription {
// //   // If already in correct format, return as is
// //   if (sub.keys && sub.keys.p256dh && sub.keys.auth) return sub;

// //   return {
// //     endpoint: sub.endpoint,
// //     expirationTime: sub.expirationTime,
// //     keys: {
// //       p256dh: sub.getKey
// //         ? btoa(String.fromCharCode(...new Uint8Array(sub.getKey("p256dh"))))
// //         : sub.keys?.p256dh,
// //       auth: sub.getKey
// //         ? btoa(String.fromCharCode(...new Uint8Array(sub.getKey("auth"))))
// //         : sub.keys?.auth,
// //     },
// //   };
// // }

// let subscription: PushSubscription | null = null;

// export async function subscribeUser(sub: PushSubscription) {
//   subscription = sub;
//   // In a production environment, you would want to store the subscription in a database
//   // For example: await db.subscriptions.create({ data: sub })
//   return { success: true };
// }

// export async function unsubscribeUser() {
//   subscription = null;
//   // In a production environment, you would want to remove the subscription from the database
//   // For example: await db.subscriptions.delete({ where: { ... } })
//   return { success: true };
// }

// export async function sendNotification(message: string) {
//   if (!subscription) {
//     throw new Error("No subscription available");
//   }

//   try {
//     await webpush.sendNotification(
//       subscription,
//       JSON.stringify({
//         title: "Test Notification",
//         body: message,
//         icon: "/icon.png",
//       })
//     );
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//     return { success: false, error: "Failed to send notification" };
//   }
// }
