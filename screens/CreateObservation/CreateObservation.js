import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";

// Obtenir la largeur de l'écran
const screenWidth = Dimensions.get("window").width;
// Calculer la largeur d'une colonne (3 colonnes avec des marges)
const columnWidth = (screenWidth - 40 - 32) / 3; // 40 pour le padding du container, 32 pour les marges entre items

export default function CreateObservation({ navigation }) {
  const [progress, setProgress] = useState(0.05);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "HSE",
      image: require("../../assets/HSE.png"),
    },
    {
      id: 2,
      name: "Non-conformity",
      image: require("../../assets/non-conformity.png"),
    },
    {
      id: 3,
      name: "Continuous Improvement",
      image: require("../../assets/continuous.png"),
    },
    {
      id: 4,
      name: "Quick Win",
      image: require("../../assets/quick-win.png"),
    },
    {
      id: 5,
      name: "IT",
      image: require("../../assets/IT.png"),
    },
    {
      id: 6,
      name: "Risk",
      image: require("../../assets/risk.png"),
    },
    {
      id: 7,
      name: "Plainte",
      image: require("../../assets/plainte.png"),
    },
    {
      id: 8,
      name: "Equipment Failure",
      image: require("../../assets/equipment-failure.png"),
    },
    {
      id: 9,
      name: "Other",
      image: require("../../assets/other.png"),
    },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleNext = () => {
    if (selectedCategory) {
      navigation.navigate("DefinitionStep");
    } else {
      Alert.alert("Attention", "Veuillez sélectionner une catégorie");
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Barre de progression */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            New issue {">"} Categorisation
          </Text>
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
            <TouchableOpacity
              key={category.id}
              style={[
                styles.category,
                { width: columnWidth },
                selectedCategory?.id === category.id && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Image
                source={category.image}
                style={styles.categoryIcon}
                resizeMode="contain"
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Boutons de navigation */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedCategory && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
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
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 4, // Pour compenser les marges des catégories
  },
  category: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCategory: {
    borderColor: "#007BFF",
    backgroundColor: "#f0f9ff",
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
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
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 12,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

// export default CreateObservation; (removed duplicate export)
