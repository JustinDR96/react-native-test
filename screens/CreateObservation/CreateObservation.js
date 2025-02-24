import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";

export default function CreateObservation({ navigation }) {
  const [progress, setProgress] = useState(0.05);

  const categories = [
    { id: 1, name: "HSE" },
    {
      id: 2,
      name: "Non-conformity",
    },
    {
      id: 3,
      name: "Continuous Improvement",
    },
    { id: 4, name: "Quick Win" },
    { id: 5, name: "IT" },
    { id: 6, name: "Risk" },
    { id: 7, name: "Plainte" },
    {
      id: 8,
      name: "Equipment Failure",
    },
    { id: 9, name: "Other" },
  ];

  return (
    <View style={styles.container}>
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>New issue > Categorisation</Text>
        <ProgressBar
          progress={progress}
          width={300}
          height={8}
          color="#007BFF"
        />
      </View>

      {/* Sélection de la catégorie */}
      <Text style={styles.subtitle}>Select the right category</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.category}>
            <Image source={category.image} style={styles.icon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Boutons Annuler et Suivant */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => setProgress(progress + 0.2)} // Simulation passage à l'étape suivante
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  category: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#007BFF",
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

// export default CreateObservation; (removed duplicate export)
