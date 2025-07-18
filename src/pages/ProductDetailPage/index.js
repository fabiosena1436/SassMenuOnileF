import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { useCart } from '../../contexts/CartContext';
import { db } from '../../services/firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Button from '../../components/Button';

import {
  PageWrapper, LoadingText, ProductBanner, ProductContent, ProductName, ProductDescription,
  CustomizationSection, SectionTitle, OptionGroup, OptionLabel, ToppingGrid, ToppingItemLabel,
  ToppingImage, ToppingInfo, ActionBar, QuantityControl, TotalPrice, BackButton
} from './styles';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // <<< A CORREÇÃO ESTÁ NESTA FUNÇÃO >>>
  const fetchData = useCallback(async () => {
    if (!store?.id || !productId) return;
    setLoading(true);

    // Etapa 1: Tentar carregar o produto. Se isto falhar, é um erro crítico.
    try {
      const productRef = doc(db, 'tenants', store.id, 'products', productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists() || !productSnap.data().isAvailable) {
        toast.error("Produto não encontrado ou indisponível.");
        navigate(`/loja/${store.slug}/cardapio`);
        setLoading(false);
        return;
      }

      const productData = { id: productSnap.id, ...productSnap.data() };
      setProduct(productData);

      // Seta o tamanho padrão se houver
      if (productData.hasCustomizableSizes && productData.availableSizes?.length > 0) {
        setSelectedSize(productData.availableSizes[0]);
      }

    } catch (error) {
      console.error("Erro CRÍTICO ao carregar o produto:", error);
      toast.error("Erro ao carregar o produto.");
      setLoading(false);
      return; // Interrompe a execução
    }

    // Etapa 2: Tentar carregar os adicionais. Se isto falhar, a página ainda funciona.
    try {
      const toppingsRef = collection(db, 'tenants', store.id, 'toppings');
      const toppingsSnap = await getDocs(toppingsRef);
      setToppings(toppingsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.warn("Aviso: Não foi possível carregar os adicionais (toppings).", error);
      // Não mostramos um erro para o utilizador, pois o produto principal carregou.
    }
    
    // Etapa 3: Finalizar o carregamento
    setLoading(false);

  }, [store, productId, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!product) return;
    let basePrice = product.price || 0;
    if (product.hasCustomizableSizes && selectedSize) {
      basePrice = selectedSize.price;
    }
    const toppingsPrice = selectedToppings.reduce((total, topping) => total + (topping.price || 0), 0);
    setTotalPrice((basePrice + toppingsPrice) * quantity);
  }, [product, selectedSize, selectedToppings, quantity]);

  const handleToppingChange = (topping) => {
    setSelectedToppings(prev =>
      prev.some(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    );
  };
  
  const handleAddToCart = () => {
    if (!store.isStoreOpen) {
      toast.error("A loja está fechada e não aceita pedidos no momento.");
      return;
    }

    if (product.hasCustomizableSizes && !selectedSize) {
      toast.error("Por favor, selecione um tamanho.");
      return;
    }

    const cartItemId = `${product.id}-${selectedSize?.name || 'unico'}-${Date.now()}`;
    
    addToCart({
      cartItemId,
      id: product.id,
      name: product.name,
      quantity,
      totalPrice: totalPrice / quantity,
      size: selectedSize,
      toppings: selectedToppings,
      imageUrl: product.imageUrl,
    });
    
    toast.success(`${product.name} adicionado ao carrinho!`);
    navigate(`/loja/${store.slug}/cardapio`);
  };

  if (loading || !store) return <LoadingText>A carregar produto...</LoadingText>;

  // Adicionado um retorno seguro caso o produto não seja carregado por algum motivo
  if (!product) {
    return (
      <PageWrapper>
        <LoadingText>Não foi possível encontrar o produto.</LoadingText>
        <BackButton to={`/loja/${store.slug}/cardapio`}>&larr; Voltar ao Cardápio</BackButton>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <BackButton to={`/loja/${store.slug}/cardapio`}>&larr;</BackButton>
      <ProductBanner src={product.imageUrl || 'https://placehold.co/1200x400/E9ECEF/495057?text=Sem+Foto'} alt={product.name} />
      <ProductContent>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        
        {product.hasCustomizableSizes && (
          <CustomizationSection>
            <SectionTitle>1. Escolha o Tamanho</SectionTitle>
            <OptionGroup>
              {product.availableSizes.map(size => (
                <OptionLabel key={size.name} $isActive={selectedSize?.name === size.name}>
                  <input type="radio" name="size" checked={selectedSize?.name === size.name} onChange={() => setSelectedSize(size)} />
                  {size.name} - R$ {size.price.toFixed(2)}
                </OptionLabel>
              ))}
            </OptionGroup>
          </CustomizationSection>
        )}

        {toppings.length > 0 && (
          <CustomizationSection>
              <SectionTitle>2. Adicionais</SectionTitle>
              <ToppingGrid>
               {toppings.map(topping => (
                 <ToppingItemLabel key={topping.id}>
                   <input type="checkbox" checked={selectedToppings.some(t => t.id === topping.id)} onChange={() => handleToppingChange(topping)} />
                   <div className="custom-checkbox" />
                   <ToppingImage src={topping.imageUrl || 'https://placehold.co/50x50/E9ECEF/495057?text=Sem+Foto'} alt={topping.name} />
                   <ToppingInfo>
                     <span>{topping.name}</span>
                     <strong>+ R$ {topping.price.toFixed(2)}</strong>
                   </ToppingInfo>
                 </ToppingItemLabel>
               ))}
              </ToppingGrid>
            </CustomizationSection>
        )}
      </ProductContent>

      <ActionBar>
        <QuantityControl>
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={!store.isStoreOpen}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} disabled={!store.isStoreOpen}>+</button>
        </QuantityControl>
        
        <Button onClick={handleAddToCart} disabled={!store.isStoreOpen}>
          {store.isStoreOpen ? (
            <>Adicionar <TotalPrice>R$ {totalPrice.toFixed(2)}</TotalPrice></>
          ) : (
            'Loja Fechada'
          )}
        </Button>
      </ActionBar>
    </PageWrapper>
  );
};

export default ProductDetailPage;