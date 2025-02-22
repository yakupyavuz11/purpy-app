import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import "../i18n";

const data = {
  contacts: [
    {
      id: "1",
      name: "philip_france",
      image:
        "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "2",
      name: "alfredosaris",
      image:
        "https://images.pexels.com/photos/29958104/pexels-photo-29958104/free-photo-of-kahverengi-deri-ceketli-kizil-sacli-zarif-kadin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "3",
      name: "Jaylon",
      image:
        "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "4",
      name: "Tatiana",
      image:
        "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "5",
      name: "Terry",
      image:
        "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  messages: [
    {
      id: "1",
      name: "philip_france",
      message: "Hey, it's been a while since we've...",
      time: "10:00 am",
      image:
        "https://images.pexels.com/photos/29741645/pexels-photo-29741645/free-photo-of-seffaf-siyah-elbiseli-kadinin-zarif-portresi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "2",
      name: "alfredosaris",
      message: "Hello, Good Morning Bro!",
      time: "08:00 am",
      image:
        "https://images.pexels.com/photos/29958104/pexels-photo-29958104/free-photo-of-kahverengi-deri-ceketli-kizil-sacli-zarif-kadin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
};

const Messages = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [messages, setMessages] = useState(data.messages);

  const activeContacts = data.contacts.filter((contact) =>
    messages.some((message) => message.name.includes(contact.name))
  );

  const deleteMessage = (id) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setMessages((prevMessages) =>
              prevMessages.filter((message) => message.id !== id)
            );
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderContacts = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {activeContacts.length === 0 ? (
        <View style={styles.noActiveUsersContainer}>
          <Text style={styles.noActiveUsersText}>NO ACTIVE USERS</Text>
        </View>
      ) : (
        activeContacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactContainer}
            onPress={() =>
              navigation.navigate("UserProfile", {
                name: contact.name,
                image: contact.image,
              })
            }
          >
            <Image source={{ uri: contact.image }} style={styles.contactImage} />
            <Text style={styles.contactName}>{contact.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  const renderMessages = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() =>
        navigation.navigate("Chat", {
          name: item.name,
        })
      }
      onLongPress={() => deleteMessage(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.messageImage} />
      <View style={styles.messageContent}>
        <Text style={styles.messageName}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("messages")}</Text>
          <Text style={styles.title}>{t("active_users")}</Text>
          {renderContacts()}
        </View>

        {messages.length === 0 ? (
          <View style={styles.noMessagesContainer}>
            <Text style={styles.noMessagesText}>NO MESSAGES</Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessages}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    marginTop: 18,
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 10,
  },
  contactContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#00D984",
  },
  contactName: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  messageImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  messageName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  messageText: {
    color: "#555",
  },
  messageTime: {
    color: "#aaa",
    fontSize: 12,
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesText: {
    fontSize: 18,
    color: "#aaa",
  },
  noActiveUsersContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noActiveUsersText: {
    fontSize: 16,
    color: "#aaa",
  },
});

export default Messages;
