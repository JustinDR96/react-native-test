import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateObservation from "../screens/CreateObservation/CreateObservation";
import DefinitionStep from "../screens/CreateObservation/DefinitionStep";
import Dashboard from "../screens/Dashboard/Dashboard";
import DocumentationStep from "../screens/CreateObservation/DocumentationStep";
import SendStep from "../screens/CreateObservation/SendStep";
import { HeaderBackButton } from "@react-navigation/elements";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerLeft: (props) =>
            props.canGoBack && (
              <HeaderBackButton
                {...props}
                onPress={() => props.navigation.goBack()}
              />
            ),
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: "Tableau de bord" }}
        />
        <Stack.Screen
          name="CreateObservation"
          component={CreateObservation}
          options={({ navigation }) => ({
            title: "Categorisation",
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.navigate("Dashboard")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="DefinitionStep"
          component={DefinitionStep}
          options={({ navigation }) => ({
            title: "Definition",
            headerLeft: () => (
              <HeaderBackButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen
          name="DocumentationStep"
          component={DocumentationStep}
          options={({ navigation }) => ({
            title: "Documentation",
            headerLeft: () => (
              <HeaderBackButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen
          name="SendStep"
          component={SendStep}
          options={({ navigation }) => ({
            title: "Send",
            headerLeft: () => (
              <HeaderBackButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
