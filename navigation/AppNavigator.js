import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateObservation from "../screens/CreateObservation/CreateObservation";
import DefinitionStep from "../screens/CreateObservation/DefinitionStep";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CreateObservation"
          component={CreateObservation}
          options={{ title: "Categorisation" }}
        />
        <Stack.Screen
          name="DefinitionStep"
          component={DefinitionStep}
          options={{ title: "Definition" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
