import { Stack } from "expo-router";

export default function AuthLayout(){
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home"/>
            <Stack.Screen name="Carrinho"/>
        </Stack>
    )
}