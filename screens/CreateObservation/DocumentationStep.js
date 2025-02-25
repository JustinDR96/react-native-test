import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
import * as ImagePicker from "expo-image-picker";

export default function DocumentationStep({ navigation }) {
  const [images, setImages] = useState([]);
  const [skipStep, setSkipStep] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      // Permission pour la galerie
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      // Permission pour la caméra
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      if (
        galleryStatus.status !== "granted" ||
        cameraStatus.status !== "granted"
      ) {
        Alert.alert(
          "Permissions requises",
          "Nous avons besoin des permissions pour accéder à vos photos et à la caméra!"
        );
      }
    })();
  }, []);

  const handleAddImage = () => {
    Alert.alert("Ajouter une image", "Choisissez une source", [
      {
        text: "Prendre une photo",
        onPress: handleTakePhoto,
      },
      {
        text: "Choisir depuis la galerie",
        onPress: handlePickImage,
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  };

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.5,
      });

      if (!result.canceled) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de prendre la photo");
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger l'image");
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Barre de progression */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>New issue {">"} Documentation</Text>
          <ProgressBar progress={0.8} width={300} height={8} color="#007BFF" />
        </View>

        <Text style={styles.title}>Add images to illustrate the problem</Text>

        {/* Grille d'images */}
        <View style={styles.imageGrid}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => handleImagePress(image)}
                onLongPress={() => handleRemoveImage(index)}
                style={styles.imageWrapper}
              >
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.removeText}>Appui long pour supprimer</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
            <Text style={styles.addButtonText}>+</Text>
            <Text style={styles.addButtonLabel}>Add new</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de prévisualisation */}
        <Modal
          visible={selectedImage !== null}
          transparent={true}
          onRequestClose={() => setSelectedImage(null)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setSelectedImage(null)}
          >
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </Modal>

        {/* Option pour passer l'étape */}
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={() => setSkipStep(!skipStep)}
        >
          <View style={[styles.checkbox, skipStep && styles.checkboxChecked]} />
          <Text style={styles.skipText}>Skip this step</Text>
        </TouchableOpacity>

        {/* Boutons de navigation */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("SendStep")}
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
    fontSize: 16,
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 120,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  emptyImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  addButton: {
    width: 100,
    height: 120,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#666",
  },
  addButtonLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  skipContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 10,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
  },
  skipText: {
    fontSize: 16,
    color: "#333",
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
  imageWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  removeText: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
  },
});
