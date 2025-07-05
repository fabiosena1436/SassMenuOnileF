// Arquivo: src/components/AcaiCustomizationModal/index.js

import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Button from '../Button';
import {
    ModalOverlay, ModalContent, ModalHeader, ModalBody, SectionTitle, OptionsGrid,
    OptionButton, NotesTextarea, ModalFooter, PriceDisplay, QuantitySelector
} from './styles';

const AcaiCustomizationModal = ({ isOpen, onClose, productToCustomize }) => {
    const { addToCart } = useCart();
    const store = useStore();

    const [allToppings, setAllToppings] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    // Busca os adicionais (toppings) da loja quando a modal abre
    useEffect(() => {
        if (isOpen && store?.id) {
            const fetchToppings = async () => {
                const toppingsRef = collection(db, 'tenants', store.id, 'toppings');
                const toppingsSnap = await getDocs(toppingsRef);
                setAllToppings(toppingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            };
            fetchToppings();
        }
    }, [isOpen, store]);

    // Reseta o estado quando um novo produto é selecionado
    useEffect(() => {
        if (productToCustomize) {
            // Se o produto tem tamanhos, seleciona o primeiro por padrão
            const defaultSize = productToCustomize.availableSizes?.[0] || null;
            setSelectedSize(defaultSize);
            setSelectedToppings([]);
            setQuantity(1);
            setNotes('');
        }
    }, [productToCustomize]);

    // Calcula o preço total sempre que uma opção muda
    useEffect(() => {
        if (!productToCustomize) return;

        const sizePrice = selectedSize ? selectedSize.price : (productToCustomize.price || 0);
        const toppingsPrice = selectedToppings.reduce((acc, toppingId) => {
            const topping = allToppings.find(t => t.id === toppingId);
            return acc + (topping ? topping.price : 0);
        }, 0);

        const finalPrice = (sizePrice + toppingsPrice) * quantity;
        setTotalPrice(finalPrice);
    }, [selectedSize, selectedToppings, quantity, productToCustomize, allToppings]);

    const handleToppingClick = (toppingId) => {
        setSelectedToppings(prev =>
            prev.includes(toppingId)
                ? prev.filter(id => id !== toppingId)
                : [...prev, toppingId]
        );
    };

    const handleAddToCart = () => {
        if (!productToCustomize) return;
        
        // Cria um ID único para este item no carrinho, baseado nas suas opções.
        // Isto permite ter o mesmo açaí com diferentes adicionais como itens separados.
        const toppingsString = selectedToppings.sort().join('-');
        const cartItemId = `${productToCustomize.id}-${selectedSize?.name || 'unico'}-${toppingsString}`;

        const itemToAdd = {
            cartItemId: cartItemId,
            id: productToCustomize.id,
            name: productToCustomize.name,
            imageUrl: productToCustomize.imageUrl,
            quantity: quantity,
            totalPrice: totalPrice / quantity, // Preço unitário
            size: selectedSize,
            toppings: selectedToppings.map(id => allToppings.find(t => t.id === id)),
            notes: notes
        };

        addToCart(itemToAdd);
        onClose(); // Fecha a modal
    };

    if (!isOpen || !productToCustomize) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>{productToCustomize.name}</h2>
                    <button onClick={onClose}>&times;</button>
                </ModalHeader>
                <ModalBody>
                    {productToCustomize.availableSizes && productToCustomize.availableSizes.length > 0 && (
                        <section>
                            <SectionTitle>Escolha o Tamanho</SectionTitle>
                            <OptionsGrid>
                                {productToCustomize.availableSizes.map(size => (
                                    <OptionButton
                                        key={size.name}
                                        $isSelected={selectedSize?.name === size.name}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size.name} (+ R$ {size.price.toFixed(2)})
                                    </OptionButton>
                                ))}
                            </OptionsGrid>
                        </section>
                    )}

                    {allToppings.length > 0 && (
                        <section>
                            <SectionTitle>Adicionais</SectionTitle>
                            <OptionsGrid>
                                {allToppings.map(topping => (
                                    <OptionButton
                                        key={topping.id}
                                        $isSelected={selectedToppings.includes(topping.id)}
                                        onClick={() => handleToppingClick(topping.id)}
                                    >
                                        {topping.name} (+ R$ {topping.price.toFixed(2)})
                                    </OptionButton>
                                ))}
                            </OptionsGrid>
                        </section>
                    )}
                    <section>
                        <SectionTitle>Observações</SectionTitle>
                        <NotesTextarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Ex: Sem cebola, ponto da carne, etc."
                        />
                    </section>
                </ModalBody>
                <ModalFooter>
                    <QuantitySelector>
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                    </QuantitySelector>
                    <Button onClick={handleAddToCart}>
                        Adicionar (R$ {totalPrice.toFixed(2)})
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};

export default AcaiCustomizationModal;