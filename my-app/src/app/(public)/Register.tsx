import { View, Text, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { InputComum } from '../components/input/inputComum';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { ButtonSignIN_SignUp } from '../components/btn-SignIn_SignUp';

export default function Register() {

    const { isLoaded, setActive, signUp } = useSignUp();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pendingEmailCode, setPendingEmailCode] = useState(false);
    const [code, setCode] = useState("");

    async function handleSignUp() {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: email,
                password: password,
                firstName: name,
                lastName: lastname
            })
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingEmailCode(true);
        } catch (e) {
            console.log(e)
        }
    };

    async function handleVerifyUser() {
        if (!isLoaded) return
        try {
            const completeSignUp = await signUp?.attemptEmailAddressVerification({
                code
            });
            await setActive({ session: completeSignUp.createdSessionId });
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#d3d3d3' }} className='flex justify-center items-center gap-4 p-4'>
            {!pendingEmailCode && (
                <>
                    <Image
                        className='h-[20%] w-[65%]'
                        source={require('../../assets/imgs/logo.png')}
                    />
                    <Text className='text-2xl font-light'>Crie sua conta!</Text>

                    <View>
                        <Text className='font-bold text-xl mb-2'>Insira seu nome:</Text>
                        <View className='w-full flex flex-row gap-2'>
                            <TextInput className='w-2/4 p-2 bg-white rounded-lg' placeholder='Nome...'
                                value={name} onChangeText={setName} />
                            <TextInput className='w-2/4 p-2 bg-white rounded-lg' placeholder='Sobrenome...'
                                value={lastname} onChangeText={setLastname} />
                        </View>
                    </View>

                    <InputComum placeholder={'Digite seu email...'} nameIcon={'mail'} value={email} onChangeText={setEmail} />
                    <InputComum placeholder={'Crie uma senha...'} nameIcon={'lock'} value={password} onChangeText={setPassword} />

                    <TouchableOpacity style={{ width: 330 }} onPress={handleSignUp}>
                        <Text className='text-white bg-black p-4 rounded-full text-center font-bold text-2xl'>Criar conta</Text>
                    </TouchableOpacity>

                    <ButtonSignIN_SignUp href={"/Login"} textIndicator={"Já possui conta ?"} textLink={"Faça o login!"} />
                </>
            )}

            {pendingEmailCode && (
                <View className='w-full gap-12'>
                    <View>
                        <Text className='font-bold text-2xl mb-2'>Digite o código de verificação:</Text>
                        <TextInput className='w-full p-4 bg-white rounded-lg'
                            placeholder='Insira o código...'
                            value={code}
                            onChangeText={setCode} />
                    </View>
                    <Pressable className='bg-black p-2 w-full rounded-lg' onPress={handleVerifyUser}>
                        <Text className='text-white text-center text-2xl'>Verificar</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};