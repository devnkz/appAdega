import { View, Text, Image, TouchableOpacity } from 'react-native';
import { InputComum } from '../components/input/inputComum';
import { InputPassword } from '../components/input/inputPassword';
import { Link } from 'expo-router';
import { ButtonSignIN_SignUp } from '../components/btn-SignIn_SignUp';
import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';

export default function Login() {
    const { isLoaded, setActive, signIn } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignIN() {
        if(!isLoaded) return;

        try{
            const signInUser = await signIn.create({
                identifier: email,
                password: password
            })

            await setActive({ session: signInUser.createdSessionId })

        }catch(err){
            console.log(err);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#d3d3d3' }} className='flex justify-center items-center gap-6 p-4'>
            <Image
                className='h-[20%] w-[65%]'
                source={require('../../assets/imgs/logo.png')}
            />
            <Text className='text-2xl font-light text-gray-500'>Faça seu login em nossa  <Text className='text-3xl font-bold text-black'>ADEGA!</Text></Text>

            <InputComum placeholder={'Digite seu email...'}
                nameIcon={'mail'}
                value={email}
                onChangeText={setEmail}
            />
            <InputPassword placeholder={'Digite sua senha...'}
                nameIcon={'lock'}
                value={password}
                onChangeText={setPassword}
            />

            <View className='w-4/5 items-end'>
                <Link className='text-gray-500' href={"/"}>
                    Esqueceu a senha ?
                </Link>
            </View>

            <View className='w-4/5 gap-2'>
                <TouchableOpacity className='w-full' onPress={handleSignIN}>
                    <Text className='text-white bg-black p-4 rounded-full text-center font-bold text-2xl'>Entrar</Text>
                </TouchableOpacity>

                <ButtonSignIN_SignUp href={"/Register"} textIndicator={"Ainda não tem conta ?"} textLink={"Cadastre-se agora!"}/>
            </View>
        </View>
    )
};