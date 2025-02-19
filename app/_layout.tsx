import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store  from '../redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: true, headerTitle: "Inicio" }}
        />
        <Stack.Screen
          name="details"
          options={{ headerShown: true, headerTitle: "Detalles" }}
        />
      </Stack>
    </Provider>
  );
}
