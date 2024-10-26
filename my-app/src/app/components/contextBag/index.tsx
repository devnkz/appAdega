import { useState, useEffect, createContext, useContext } from "react";
import { produtoProps } from "../Flat_List";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartContextType {
    cart: produtoProps[];
    addToCart: (product: produtoProps) => void;
    goToBag: (router: any) => void;
    clearCart: () => void;
}

const BagContext = createContext<CartContextType | undefined>(undefined);

export const BagProvider = ({ children }) => {

    const router = useRouter();
    const [cart, setCart] = useState<produtoProps[]>([]);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem('cart');
                if (savedCart) {
                    setCart(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error("Erro ao carregar o carrinho do AsyncStorage:", error);
            }
        };
        loadCart();
    }, []);

    const addToCart = async (produto: produtoProps) => {
        const produtoInCart = cart.some(item => item.id_produto === produto.id_produto);
        if (!produtoInCart) {
            const updatedCart = [...cart, produto];
            setCart(updatedCart);
            try {
                await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
                alert("Produto adicionado ao carrinho: " + produto.nome);
            } catch (error) {
                console.error("Erro ao salvar o carrinho no AsyncStorage:", error);
            }
        } else {
            alert('Produto já adicionado');
        }
    };


    const goToBag = () => {
        const cartString = JSON.stringify(cart);
         router.push({
            pathname: '/Carrinho',
            params: { cart: cartString },
        });
    };

    const clearCart = async () => {
        try {
            setCart([]);
            console.log(cart)
            await AsyncStorage.removeItem('cart');
            alert("Carrinho limpo!");
        } catch (error) {
            console.error("Erro ao limpar o carrinho:", error);
        }
    };



    return (
        <BagContext.Provider value={{ cart, addToCart, goToBag, clearCart }}>
            {children}
        </BagContext.Provider>
    );
};

export const useBag = () => {
    const context = useContext(BagContext);
    if (!context) {
        throw new Error('useBag deve ser usado dentro de um BagProvider');
    }
    return context;
}; 
