// Arquivo: src/pages/Admin/PromotionsPage/index.js

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../services/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Button from '../../../components/Button';
import {
  PageWrapper,
  Header,
  Title,
  FormContainer,
  FormGroup,
  Select,
  Input,
  CheckboxLabel,
  ActionButtons,
  PromotionList,
  PromotionCard,
  CardContent,
  CardActions,
  LoadingText,
  InfoText,
} from './styles';

const PromotionsPage = () => {
  const { tenant, loading: authLoading } = useAuth(); // <<< OBTEMOS O ESTADO DE CARREGAMENTO
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    type: 'product_discount',
    productId: '',
    originalPrice: '',
    promotionalPrice: '',
    isActive: true,
  });

  const fetchPromotionsAndProducts = useCallback(async () => {
    if (!tenant?.id) return;
    setLoadingData(true);
    try {
      const promotionsRef = collection(db, 'tenants', tenant.id, 'promotions');
      const productsRef = collection(db, 'tenants', tenant.id, 'products');
      
      // <<< MUDANÇA AQUI: Removemos a ordenação da consulta >>>
      const productsQuery = query(productsRef, where('isAvailable', '==', true));

      const [promoSnap, productsSnap] = await Promise.all([
        getDocs(query(promotionsRef, orderBy('createdAt', 'desc'))),
        getDocs(productsQuery)
      ]);
      
      const productsData = productsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      // <<< MUDANÇA AQUI: Ordenamos os produtos no código, depois de os recebermos >>>
      productsData.sort((a, b) => a.name.localeCompare(b.name));
      
      setPromotions(promoSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setProducts(productsData);

    } catch (error) {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoadingData(false);
    }
  }, [tenant]);

  // <<< LÓGICA DE CARREGAMENTO CORRIGIDA >>>
  useEffect(() => {
    // Se a autenticação ainda está a decorrer, esperamos.
    if (authLoading) {
      setLoadingData(true);
    } 
    // Se a autenticação terminou e temos um lojista, buscamos os dados.
    else if (tenant) {
      fetchPromotionsAndProducts();
    } 
    // Se a autenticação terminou e não há lojista, paramos de carregar.
    else {
      setLoadingData(false);
    }
  }, [authLoading, tenant, fetchPromotionsAndProducts]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  
  useEffect(() => {
    if (formData.type === 'product_discount' && formData.productId) {
      const selectedProduct = products.find(p => p.id === formData.productId);
      if (selectedProduct) {
        setFormData(prev => ({ ...prev, originalPrice: selectedProduct.price.toString() }));
      }
    } else {
      setFormData(prev => ({...prev, originalPrice: ''}));
    }
  }, [formData.productId, formData.type, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenant?.id || !formData.name) {
      toast.error("O nome da promoção é obrigatório.");
      return;
    }

    const dataToSave = {
      ...formData,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      promotionalPrice: parseFloat(formData.promotionalPrice) || 0,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'tenants', tenant.id, 'promotions'), dataToSave);
      toast.success("Promoção criada com sucesso!");
      setFormData({ name: '', type: 'product_discount', productId: '', originalPrice: '', promotionalPrice: '', isActive: true });
      fetchPromotionsAndProducts();
    } catch (error) {
      toast.error("Erro ao criar a promoção.");
    }
  };

  const handleDelete = async (promoId) => {
    if (!window.confirm("Tem a certeza que quer apagar esta promoção?")) return;
    try {
      await deleteDoc(doc(db, 'tenants', tenant.id, 'promotions', promoId));
      toast.success("Promoção apagada.");
      fetchPromotionsAndProducts();
    } catch (error) {
      toast.error("Erro ao apagar a promoção.");
    }
  };

  if (authLoading) {
      return <PageWrapper><LoadingText>A carregar painel...</LoadingText></PageWrapper>
  }

  return (
    <PageWrapper>
      <Header>
        <Title>Gestão de Promoções</Title>
      </Header>

      <FormContainer onSubmit={handleSubmit}>
        <h3>Criar Nova Promoção</h3>
        <FormGroup>
          <label>Nome da Promoção</label>
          <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: Combo do Dia" required />
        </FormGroup>
        <FormGroup>
          <label>Tipo de Promoção</label>
          <Select name="type" value={formData.type} onChange={handleInputChange}>
            <option value="product_discount">Desconto em Produto (De/Por)</option>
          </Select>
        </FormGroup>

        {formData.type === 'product_discount' && (
          <>
            <FormGroup>
              <label>Selecione o Produto</label>
              <Select name="productId" value={formData.productId} onChange={handleInputChange} required>
                <option value="">-- Escolha um produto --</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </Select>
            </FormGroup>
            <FormGroup>
              <label>Preço Original (De)</label>
              <Input name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} type="number" step="0.01" placeholder="Preço normal do produto" disabled />
            </FormGroup>
            <FormGroup>
              <label>Preço Promocional (Por)</label>
              <Input name="promotionalPrice" value={formData.promotionalPrice} onChange={handleInputChange} type="number" step="0.01" required />
            </FormGroup>
          </>
        )}
        
        <CheckboxLabel>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
          Ativar promoção imediatamente
        </CheckboxLabel>
        
        <ActionButtons>
          <Button type="submit">Criar Promoção</Button>
        </ActionButtons>
      </FormContainer>

      {loadingData ? <LoadingText>A carregar promoções...</LoadingText> : (
        <PromotionList>
          {promotions.length > 0 ? promotions.map(promo => {
            const product = products.find(p => p.id === promo.productId);
            return (
              <PromotionCard key={promo.id}>
                <CardContent status={promo.isActive ? 'Ativa' : 'Inativa'}>
                  <h4>{promo.name}</h4>
                  {product && <p>Produto: {product.name}</p>}
                  {promo.type === 'product_discount' && <p>De: R$ {promo.originalPrice.toFixed(2)} | Por: R$ {promo.promotionalPrice.toFixed(2)}</p>}
                  <span>Status: {promo.isActive ? 'Ativa' : 'Inativa'}</span>
                </CardContent>
                <CardActions>
                  <Button $variant="danger" onClick={() => handleDelete(promo.id)}>Apagar</Button>
                </CardActions>
              </PromotionCard>
            )
          }) : <InfoText>Nenhuma promoção criada ainda.</InfoText>}
        </PromotionList>
      )}

    </PageWrapper>
  );
};

export default PromotionsPage;