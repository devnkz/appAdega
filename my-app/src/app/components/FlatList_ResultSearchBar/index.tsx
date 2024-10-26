import { FlatList, View, Text, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useBag } from "../contextBag";
import { useEffect, useState } from "react";
import { NotFoundSearch } from "../pesquiseNotFound";

export function Results_SeachBar({ results }) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (results === undefined) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [results]);


    const { addToCart } = useBag();

    return (
        <>
            <FlatList
                data={results}
                scrollEnabled={false}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <View className='w-full items-center mt-4'>
                        <View className='w-11/12 flex flex-row justify-between bg-white p-3 rounded-lg items-center' style={{ elevation: 10 }}>
                            <View>
                                <Text className='text-3xl font-bold'>{item.nome}</Text>
                                <Text>{item.nome}</Text>
                                <Text>{item.modelo}</Text>
                                <Text>{item.tamanho}</Text>
                                <Text className='text-3xl font-light text-green-600'>R$ {item.quantidade}</Text>

                                <Pressable onPress={() => console.log(addToCart(item))} style={{ elevation: 5 }} className='flex flex-row items-center gap-2 w-36 justify-center rounded-lg p-2 bg-black mt-4'>
                                    <Feather name={'shopping-bag'} size={24} color={'white'} />
                                    <Text className='text-base font-semibold text-white '>Adicionar</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Image
                                    source={{ uri: item.img_url }}
                                    className='h-52 w-24'
                                />
                            </View>
                        </View>
                    </View>
                )}
            />

            {visible && (
                <NotFoundSearch text={'Realize uma pesquisa!'} />
            )}
        </>
    )
}