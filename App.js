import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("setNotificationHandler 123 called :");
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  //Push Notifications
// Test Push Notification using expo https://expo.dev/notifications
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required ",
          "Push notification need the appropriate permissions"
        );
        return;
      }

      const pushtokenData = await Notifications.getExpoPushTokenAsync();
      console.log(pushtokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }
    configurePushNotifications();
  }, []);

  //Local Notifications
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received");
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }
    );

    const subscription1 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response  Received");
        console.log(response);
      }
    );

    return () => {
      subscription.remove();
      subscription1.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    console.log("scheduleNotificationHandler called : ");
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first Local Notification",
        body: "Body of the Notifications",
        data: { userName: "Babuli" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  // curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  //   "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  //   "title":"hello",
  //   "body": "world"
  // }'


  function sendPushNotificATIONHANDLER(){
    fetch('https://exp.host/--/api/v2/push/send',{
      method:'POST',
      headers:{
        'Content-Type' :'application/json',
      },
      body: JSON.stringify({
        to:'ExponentPushToken[]', //Push Token Data
        title:'Test - sent from device',
        body:'This is a test'
      })
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#94d3a6",
    alignItems: "center",
    justifyContent: "center",
  },
});
