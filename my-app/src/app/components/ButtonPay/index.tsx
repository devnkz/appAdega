import { Pressable, Text, View } from 'react-native';

export function ButtonPay({ valorItem }) {
    return (
        <View className='w-full items-center h-28 z-10 bg-black p-2'>
            <Pressable style={{elevation: 10}} onPress={() => alert('Compra realizada')} className='bg-black w-full flex items-center justify-center h-full rounded-3xl'>
                <Text className='text-white text-2xl font-light'> Comprar <Text className='text-green-600 font-bold text-2xl'>R$ {valorItem}</Text></Text>
            </Pressable>
        </View>
    )
}