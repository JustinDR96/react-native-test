import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";

export default function SendStep({ navigation }) {
  const handleSend = () => {
    Alert.alert("Succès", "Votre observation a été envoyée avec succès !", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Dashboard"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Barre de progression */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>New issue {">"} Send</Text>
          <ProgressBar progress={1} width={300} height={8} color="#007BFF" />
        </View>

        <Text style={styles.title}>Résumé de l'observation</Text>

        {/* Ici vous pouvez ajouter un résumé des informations saisies */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Votre observation est prête à être envoyée.
          </Text>
          <Text style={styles.summarySubtext}>
            Cliquez sur "Send" pour envoyer votre observation ou "Previous" pour
            modifier.
          </Text>
        </View>

        {/* Boutons de navigation */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  progressContainer: {
    width: "100%",
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  summarySubtext: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  previousButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
