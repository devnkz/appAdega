import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export function ButtonSignIN_SignUp({href, textIndicator, textLink}) {
    return (
        <View className='ml-4 w-4/5  flex-row gap-1'>
            <Text className='text-gray-500'>{textIndicator}</Text>
            <Link href={href} asChild>
                <TouchableOpacity>
                    <Text className='font-bold'>{textLink}</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}