import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import theme from "../constants/theme";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState(""); // E-posta state'i
  const [password, setPassword] = useState(""); // Şifre state'i

  // Kayıt ol butonuna basıldığında çalışan fonksiyon
  const onHandleSignup = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password) // Firebase ile yeni kullanıcı oluşturuluyor
        .then(() => {
          console.log("Kayıt Başarılı");
          Alert.alert("Başarılı", "Hesabınız başarıyla oluşturuldu!");
          navigation.navigate("ProfileSetup"); // Kayıt sonrası giriş sayfasına yönlendirme
        })
        .catch((err) => {
          let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin.";
          if (err.code === "auth/email-already-in-use") {
            errorMessage = "Bu e-posta adresi zaten kullanılıyor.";
          } else if (err.code === "auth/invalid-email") {
            errorMessage = "Geçersiz e-posta adresi.";
          } else if (err.code === "auth/weak-password") {
            errorMessage =
              "Şifreniz çok zayıf. Lütfen daha güçlü bir şifre girin.";
          }
          Alert.alert("Kayıt Hatası", errorMessage);
        });
    } else {
      Alert.alert("Hata", "E-posta ve şifre boş bırakılamaz");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{ color: "#fff", fontSize: 18 }}> Kayıt Ol</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.signupText}>Zaten hesabınız var mı? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupLink}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.COLORS.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#f6f7f8",
    height: 50,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.COLORS.black,
    height: 50,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
  },
  signupLink: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});
