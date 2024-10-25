import { Pressable, View, Image, Text } from 'react-native';
import { produtoProps } from '..';
import { Feather } from '@expo/vector-icons';
import { useBag } from '../../contextBag';

export function Card_Produto({ produto } : { produto: produtoProps}) {

    const { addToCart } = useBag();

    return (
        <View className='w-full items-center'>
            <View className='w-11/12 flex flex-row justify-between bg-white p-3 rounded-lg items-center' style={{ elevation: 10 }}>
                <View>
                    <Text className='text-3xl font-bold'>{produto.nome}</Text>
                    <Text>{produto.tipo}</Text>
                    <Text>{produto.modelo}</Text>
                    <Text>{produto.tamanho}</Text>
                    <Text className='text-3xl font-light text-green-600'>R$ {produto.quantidade}</Text>

                    <Pressable onPress={() => {addToCart(produto)}} style={{ elevation: 5 }} className='flex flex-row items-center gap-2 w-36 justify-center rounded-lg p-2 bg-black mt-4'>
                        <Feather name={'shopping-bag'} size={24} color={'white'} />
                        <Text className='text-base font-semibold text-white '>Adicionar</Text>
                    </Pressable>
                </View>
                <View>
                    <Image
                        source={{ uri: produto.url_img }}
                        className='h-52 w-24'
                    />
                </View>
            </View>
        </View>
    )
}