import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import styles from "./Dashboard.style";

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur le Dashboard 🎯</Text>
      <Button
        title="Créer une Observation"
        onPress={() => navigation.navigate("CreateObservation")}
      />
    </View>
  );
}
