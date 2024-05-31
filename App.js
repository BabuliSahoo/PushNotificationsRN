import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler(
  {
    handleNotification: async () =>{
      console.log('setNotificationHandler 123 called :');
      return {
        shouldPlaySound:false,
        shouldSetBadge:false,
        shouldShowAlert:true
      };
    }
  }
);

export default function App() {
  function scheduleNotificationHandler() {
    console.log('scheduleNotificationHandler called : ');
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first Local Notification",
        body: "Body of the Notifications",
        data:{userName:'Babuli'}
      },
      trigger:{
        seconds: 5
      }
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
