import { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Slot, useRouter, useSegments } from 'expo-router'
import '../styles/global.css'

const publishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

const tokenCache = {
    async getToken(key: string) {
        try {
            const item = await SecureStore.getItemAsync(key)
            if (item) {
                console.log(`${key} was used 🔐 \n`)
            } else {
                console.log('No values stored under key: ' + key)
            }
            return item
        } catch (error) {
            console.error('SecureStore get item error: ', error)
            await SecureStore.deleteItemAsync(key)
            return null
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value)
        } catch (err) {
            return
        }
    },
}

const InitialLayout = () => {
    const { isLoaded, isSignedIn } = useAuth()
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (isSignedIn && !inAuthGroup) {
            router.replace("/Home")
        }
        else if (!isSignedIn) {
            router.replace("/Login")
        }
    }, [isSignedIn])

    return <Slot />
}

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={publishKey} tokenCache={tokenCache}>
            <InitialLayout />
        </ClerkProvider>
    )
}