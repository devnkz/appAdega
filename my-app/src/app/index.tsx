import {View, ActivityIndicator} from 'react-native';


export default function App() {
    return (
        <View style={{flex:1 }} className='justify-center items-center' >
            <ActivityIndicator size={40} color={"#121212"}/>
        </View>
    )
}