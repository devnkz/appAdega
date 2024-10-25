import { useState, useEffect } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Card_Produto } from "./Card_Produtos";
import { Button_Menu } from "../button_menu";

export interface produtoProps {
    id_produto: number,
    nome: String,
    tamanho: String,
    tipo: String,
    modelo: String,
    url_img: string,
    quantidade: number
}

export function ListProdutos() {
    const [produtos, setProdutos] = useState<produtoProps[]>([])
    const [tipoProduto, setTipoProduto] = useState<string>('Produtos');


    const getProdutos = async () => {
        try {
            const response = await fetch(`http://192.168.1.10:3333/api/produtoRoutes/${tipoProduto}`);
            const data: produtoProps[] = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        getProdutos();
    }, [tipoProduto]);


    return (
        <>
            <View
                className='p-4 flex items-center'>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Button_Menu onPress={() => setTipoProduto('produtos')} label={'Produtos'} activeCategory={tipoProduto} />
                    <Button_Menu onPress={() => setTipoProduto('cervejas')} label={'Cervejas'} activeCategory={tipoProduto} />
                    <Button_Menu onPress={() => setTipoProduto('whisky')} label={'Whisky'} activeCategory={tipoProduto} />
                    <Button_Menu onPress={() => setTipoProduto('refrigerantes')} label={'Refrigerantes'} activeCategory={tipoProduto} />
                </ScrollView>
            </View>
            <FlatList
                scrollEnabled={false}
                data={produtos}
                renderItem={({ item }) => (
                    <View>
                        <Card_Produto produto={item}/>
                    </View>
                )}
                contentContainerStyle={{ gap: 12 }}
            />
        </>
    )
}