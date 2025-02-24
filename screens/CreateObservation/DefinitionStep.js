import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ProgressBar from "react-native-progress/Bar";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DefinitionStep({ navigation }) {
  const [department, setDepartment] = useState("");
  const [detectionDate, setDetectionDate] = useState(new Date());
  const [occurrenceDate, setOccurrenceDate] = useState(new Date());
  const [declarationDate, setDeclarationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(null);

  return (
    <View style={styles.container}>
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>New issue > Definition</Text>
        <ProgressBar progress={0.4} width={300} height={8} color="#007BFF" />
      </View>

      {/* Formulaire */}
      <Text style={styles.label}>What?</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the defect, malfunction, anomaly"
      />

      <Text style={styles.label}>Who has detected the problem?</Text>
      <TextInput style={styles.input} placeholder="Identité de la personne" />

      <Text style={styles.label}>Department?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
        >
          <Picker.Item label="Select a department" value="" />
          <Picker.Item label="Production" value="production" />
          <Picker.Item label="Maintenance" value="maintenance" />
          <Picker.Item label="Quality" value="quality" />
        </Picker>
      </View>

      <Text style={styles.label}>When?</Text>
      {["Date de la détection", "Date d’occurrence", "Date de déclaration"].map(
        (label, index) => (
          <TouchableOpacity
            key={index}
            style={styles.input}
            onPress={() => setShowDatePicker(label)}
          >
            <Text>
              {label} -{" "}
              {showDatePicker === label
                ? "Sélectionnez une date"
                : "JJ/MM/AAAA"}
            </Text>
          </TouchableOpacity>
        )
      )}

      {showDatePicker && (
        <DateTimePicker
          value={detectionDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              if (showDatePicker === "Date de la détection")
                setDetectionDate(selectedDate);
              if (showDatePicker === "Date d’occurrence")
                setOccurrenceDate(selectedDate);
              if (showDatePicker === "Date de déclaration")
                setDeclarationDate(selectedDate);
            }
            setShowDatePicker(null);
          }}
        />
      )}

      <Text style={styles.label}>Where?</Text>
      <TextInput style={styles.input} placeholder="Place of detection" />

      <Text style={styles.label}>How many?</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantify the impact of the problem"
        keyboardType="numeric"
      />

      <Text style={styles.label}>How?</Text>
      <TextInput
        style={styles.input}
        placeholder="How was the problem detected"
      />

      <Text style={styles.label}>Why?</Text>
      <TextInput style={styles.input} placeholder="Why is it a problem?" />

      {/* Boutons Navigation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("NextStep")}
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
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
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
});

// export default DefinitionStep;
