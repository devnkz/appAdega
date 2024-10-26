import { Text, ScrollView, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SeachBar } from '../../components/searchBar';
import { ListProdutos } from '../../components/Flat_List';
import { Header } from '../../components/header';
import { BagProvider } from '../../components/contextBag';
import { Results_SeachBar } from '../../components/FlatList_ResultSearchBar';
import { NotFoundSearch } from '../../components/pesquiseNotFound';



const Home = () => {

    //Alterar visibilidade quando clicar na SearchBar
    const [visible, setVisible] = useState(true)
    const [buttonAlterVisible, setButtonAlterVisible] = useState(false)
    const [TypeIcon, setTypeIcon] = useState('search');
    const [ResultNotFound, setResultNotFound] = useState(false);

    function alterVisibleFalse() {
        setVisible(false)
        setButtonAlterVisible(true)
        setTypeIcon('arrow-left')
    }

    function alterVisibleTrue() {
        setVisible(true)
        setButtonAlterVisible(false)
        setTypeIcon('search')
    }

    //Funcao de busca da searchBar
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<number>();

    const handleSearch = async () => {
        if (query.trim() === '') return;

        try {
            const response = await fetch(`http://192.168.1.10:3333/api/produtoRoutes/pesquisa?q=${query}`);
            if (!response.ok) {
                throw new Error('Erro na resposta da rede');
            }
            const data = await response.json();
            setResults(data);

            if ((Array.isArray(data) && data.length === 0) ||
                (typeof data === 'object' && Object.keys(data).length === 0)) {
                setResultNotFound(true);
            } else {
                setResultNotFound(false);
            }


        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };


    //Confirmar e exibir pesquisa conforme parar de digitar
    let timer: NodeJS.Timeout;

    const handleInputChange = (input: string) => {
        setQuery(input);
        clearTimeout(timer);

        timer = setTimeout(() => {
            handleSearch();
        }, 500);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <BagProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#d3d3d3' }}>
                    <Header />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <>
                            {visible && (
                                <>
                                    <Text className='text-3xl w-4/5 ml-6 mt-4 font-bold'>Somente as melhores, Bebidas matam sua sede</Text>
                                    <Text className='ml-6'>Faça um pedido e receba no conforto de sua casa</Text>
                                </>
                            )}
                            <View className='items-center p-4'>
                                <SeachBar name={TypeIcon}
                                    iconPress={() => { alterVisibleTrue() }} value={query} onChangeText={handleInputChange}
                                    onpress={() => {
                                        alterVisibleFalse();
                                    }} />
                            </View>
                            {buttonAlterVisible && (
                                <>
                                    <Results_SeachBar results={results} />
                                    {ResultNotFound && (<NotFoundSearch text={'Item não encontrado!'} />)}
                                </>
                            )}
                            {visible && (
                                <ListProdutos />
                            )}
                        </>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider >
        </BagProvider>
    )
}

export default Home;