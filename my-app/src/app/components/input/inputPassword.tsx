import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function InputPassword({ placeholder, nameIcon, onChangeText, value}) {
    return (
        <View style={{ elevation: 2 }} className='flex flex-row bg-white w-full p-4 rounded-lg items-center gap-2'>
            <Feather name={nameIcon} size={24} color={'black'} />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}  
                secureTextEntry
            />
        </View>
    )
}