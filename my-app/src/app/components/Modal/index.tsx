import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { InputComum } from "../input/inputComum";
import { useState } from "react";
import { BlurView } from "expo-blur";

export function ModalUser({ ModalVisible, onRequestClose, CloseModal }) {

    const { user } = useUser();
    const [Name, setName] = useState(user?.firstName ?? "");
    const [Lastname, setLastname] = useState(user?.lastName ?? "");
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress ?? "");

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={onRequestClose}>

            <BlurView
                className="absolute top-0 right-0 left-0 bottom-0 justify-center items-center"
                intensity={100}
                tint="dark"
            />

            <View style={{ flex: 1 }} className='justify-center items-center'>
                <View className='w-4/5 bg-zinc-900 p-4 rounded-lg gap-6'>
                    <Text className="text-2xl text-white text-center">Tela de Usuario</Text>
                    <View>
                        <Text className=' text-white'>{user?.fullName}</Text>
                        <Text className=' text-white'>{user?.emailAddresses[0].emailAddress}</Text>
                    </View>
                    <View className="w-full flex justify-center items-center mt-4 gap-2">
                        <Text className="text-white text-2xl">Atualize seu perfil</Text>
                        <View className="w-full">
                            <Text className="text-bold text-white text-xl">Nome:</Text>
                            <InputComum nameIcon={"user"} placeholder={"Nome..."} value={Name} onChangeText={setName} />
                        </View>
                        <View className="w-full">
                            <Text className="text-bold text-white text-xl">Sobrenome:</Text>
                            <InputComum nameIcon={"user"} placeholder={"Sobrenome..."} value={Lastname} onChangeText={setLastname} />
                        </View>
                        <View className="w-full">
                            <Text className="text-bold text-white text-xl">Email</Text>
                            <InputComum nameIcon={"mail"} placeholder={"Email..."} value={email} onChangeText={setEmail} />
                        </View>
                        <TouchableOpacity style={{width:300, marginTop: 12}}>
                            <View className="flex justify-center items-center bg-black p-2 rounded-md">
                                <Text className="font-bold text-xl text-white">Atualizar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

