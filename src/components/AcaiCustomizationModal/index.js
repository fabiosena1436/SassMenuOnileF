// Ficheiro completo: src/components/AcaiCustomizationModal/index.js

import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'; // <-- O 'where' que faltava foi importado
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';
import toast from 'react-hot-toast';
import Button from '../Button';
import {
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ProductTitle, SizeSelection, SizeOption,
    ToppingsSection, ToppingOption, ModalFooter, PriceInfo
} from './styles';
import { FaTimes } from 'react-icons/fa';

const AcaiCustomizationModal = ({ isOpen, onClose, productToCustomize }) => {
    const { addToCart } = useCart();
    const storeInfo = useStore();
    
    const [sizes, setSizes] = useState([]);
    const [toppingCategories, setToppingCategories] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (isOpen && storeInfo && storeInfo.tenantId) {
            const fetchData = async () => {
                try {
                    const tenantId = storeInfo.tenantId;

                    const sizesRef = collection(db, 'tenants', tenantId, 'sizes');
                    const sizesSnapshot = await getDocs(query(sizesRef, orderBy('price')));
                    setSizes(sizesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                    const toppingCategoriesRef = collection(db, 'tenants', tenantId, 'toppingCategories');
                    const toppingCategoriesSnapshot = await getDocs(query(toppingCategoriesRef, orderBy('name')));
                    
                    const categoriesData = await Promise.all(
                        toppingCategoriesSnapshot.docs.map(async (catDoc) => {
                            const category = { id: catDoc.id, ...catDoc.data() };
                            const toppingsRef = collection(db, 'tenants', tenantId, 'toppings');
                            const toppingsQuery = query(toppingsRef, where('category', '==', category.name));
                            const toppingsSnapshot = await getDocs(toppingsQuery);
                            const toppingsData = toppingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                            return { ...category, toppings: toppingsData };
                        })
                    );
                    setToppingCategories(categoriesData);

                } catch (error) {
                    console.error("Erro ao carregar opções de customização:", error);
                    toast.error("Não foi possível carregar as opções.");
                }
            };
            fetchData();
        }
    }, [isOpen, storeInfo]);

    useEffect(() => {
        if (productToCustomize) {
            setSelectedSize(null);
            setSelectedToppings([]);
        }
    }, [productToCustomize]);

    useEffect(() => {
        let newTotal = 0;
        if (selectedSize) {
            newTotal += selectedSize.price;
        }
        selectedToppings.forEach(topping => {
            if (topping.price) {
                newTotal += topping.price;
            }
        });
        setTotalPrice(newTotal);
    }, [selectedSize, selectedToppings]);

    const handleToggleTopping = (topping) => {
        setSelectedToppings(prev => {
            const isSelected = prev.find(t => t.id === topping.id);
            if (isSelected) {
                return prev.filter(t => t.id !== topping.id);
            } else {
                return [...prev, topping];
            }
        });
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Por favor, selecione um tamanho.');
            return;
        }
        const cartItem = {
            ...productToCustomize,
            id: productToCustomize.id,
            id_cart: `${productToCustomize.id}-${selectedSize.name}-${Date.now()}`,
            name: `${productToCustomize.name} (${selectedSize.name})`,
            price: totalPrice,
            quantity: 1,
            size: selectedSize.name,
            toppings: selectedToppings,
        };
        addToCart(cartItem);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ProductTitle>Monte seu {productToCustomize?.name}</ProductTitle>
                    <ModalCloseButton onClick={onClose}><FaTimes /></ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <SizeSelection>
                        <h4>Escolha o tamanho:</h4>
                        {sizes.map(size => (
                            <SizeOption
                                key={size.id}
                                selected={selectedSize?.id === size.id}
                                onClick={() => setSelectedSize(size)}
                            >
                                <span>{size.name}</span>
                                <span>+ R$ {size.price.toFixed(2)}</span>
                            </SizeOption>
                        ))}
                    </SizeSelection>
                    {toppingCategories.map(category => (
                        <ToppingsSection key={category.id}>
                            <h4>{category.name}</h4>
                            {category.toppings.map(topping => (
                                <ToppingOption key={topping.id}>
                                    <input
                                        type="checkbox"
                                        id={topping.id}
                                        checked={!!selectedToppings.find(t => t.id === topping.id)}
                                        onChange={() => handleToggleTopping(topping)}
                                    />
                                    <label htmlFor={topping.id}>{topping.name}</label>
                                    {topping.price > 0 && <span>+ R$ {topping.price.toFixed(2)}</span>}
                                </ToppingOption>
                            ))}
                        </ToppingsSection>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <PriceInfo>Total: R$ {totalPrice.toFixed(2)}</PriceInfo>
                    <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};

export default AcaiCustomizationModal;