// Arquivo: src/pages/Admin/PromotionsPage/index.js

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../services/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Button from '../../../components/Button';
import {
  PageWrapper, Header, Title, FormContainer, FormGrid, FormGroup, Input, Select,
  ActionButtons, PromotionList, PromotionListItem, PromoImage, PromoInfo,
  PromoStatus, PromoActions, LoadingText, InfoText
} from './styles';

const PromotionsPage = () => {
  const { tenant, loading: authLoading } = useAuth();
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingPromo, setEditingPromo] = useState(null);
  const initialFormData = { name: '', type: 'product_discount', productId: '', originalPrice: '', promotionalPrice: '', isActive: true };
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = useCallback(async () => {
    if (!tenant?.id) return;
    setLoading(true);
    try {
      const promotionsRef = collection(db, 'tenants', tenant.id, 'promotions');
      const productsRef = collection(db, 'tenants', tenant.id, 'products');
      
      const [promoSnap, productsSnap] = await Promise.all([
        getDocs(query(promotionsRef, orderBy('createdAt', 'desc'))),
        getDocs(query(productsRef, where('isAvailable', '==', true), orderBy('name')))
      ]);
      
      setPromotions(promoSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setProducts(productsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) { toast.error("Erro ao carregar dados. Verifique o console para mais detalhes sobre índices do Firestore."); console.error(error) }
    finally { setLoading(false); }
  }, [tenant]);

  useEffect(() => {
    if (!authLoading && tenant) {
      fetchData();
    }
  }, [authLoading, tenant, fetchData]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));

    if (name === 'productId') {
      const product = products.find(p => p.id === val);
      setFormData(prev => ({ ...prev, originalPrice: product ? product.price.toString() : '' }));
    }
  };
  
  const resetForm = () => {
    setEditingPromo(null);
    setFormData(initialFormData);
  };
  
  const handleEditClick = (promo) => {
    setEditingPromo(promo);
    const priceAsString = promo.promotionalPrice?.toString() || '';
    setFormData({ ...promo, promotionalPrice: priceAsString });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenant?.id || !formData.name || !formData.productId || !formData.promotionalPrice) return toast.error("Todos os campos são obrigatórios.");
    
    const dataToSave = {
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      promotionalPrice: parseFloat(formData.promotionalPrice),
      createdAt: editingPromo ? formData.createdAt : serverTimestamp(),
    };

    try {
      if (editingPromo) {
        await updateDoc(doc(db, 'tenants', tenant.id, 'promotions', editingPromo.id), dataToSave);
        toast.success('Promoção atualizada!');
      } else {
        await addDoc(collection(db, 'tenants', tenant.id, 'promotions'), dataToSave);
        toast.success('Promoção criada!');
      }
      resetForm();
      fetchData();
    } catch (error) { toast.error('Erro ao salvar promoção.'); }
  };
  
  const handleDelete = async (promoId) => {
    if (!window.confirm("Apagar esta promoção?")) return;
    try {
      await deleteDoc(doc(db, 'tenants', tenant.id, 'promotions', promoId));
      toast.success("Promoção apagada.");
      fetchData();
    } catch (error) { toast.error("Erro ao apagar."); }
  };
  
  const handleToggleActive = async (promo) => {
    try {
      await updateDoc(doc(db, 'tenants', tenant.id, 'promotions', promo.id), { isActive: !promo.isActive });
      toast.success(`Promoção ${!promo.isActive ? 'ativada' : 'desativada'}.`);
      fetchData();
    } catch (error) { toast.error("Erro ao alterar o status."); }
  };

  if (loading) return <PageWrapper><LoadingText>A carregar...</LoadingText></PageWrapper>;

  return (
    <PageWrapper>
      <Header><Title>Gerenciamento de Promoções</Title></Header>
      
      <FormContainer onSubmit={handleSubmit}>
        <h3>{editingPromo ? 'A Editar Promoção' : 'Criar Nova Promoção'}</h3>
        <FormGrid>
          <FormGroup><label>Título da Promoção</label><Input name="name" value={formData.name} onChange={handleInputChange} required /></FormGroup>
          <FormGroup><label>Tipo de Promoção</label><Select name="type" value={formData.type} onChange={handleInputChange}><option value="product_discount">Desconto em Produto</option></Select></FormGroup>
          <FormGroup>
            <label>Produto em Promoção</label>
            <Select name="productId" value={formData.productId} onChange={handleInputChange} required>
              <option value="">-- Escolha um produto --</option>
              {/* <<< CORREÇÃO AQUI: Trocado 'categories' por 'products' >>> */}
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
          </FormGroup>
          <FormGroup><label>Preço Promocional (R$)</label><Input name="promotionalPrice" value={formData.promotionalPrice} onChange={handleInputChange} type="number" step="0.01" required /></FormGroup>
        </FormGrid>
        <ActionButtons>
          {editingPromo && <Button type="button" $variant="secondary" onClick={resetForm}>Cancelar</Button>}
          <Button type="submit">{editingPromo ? 'Salvar Alterações' : 'Adicionar Promoção'}</Button>
        </ActionButtons>
      </FormContainer>

      <h3>Promoções Cadastradas</h3>
      <PromotionList>
        {promotions.length > 0 ? promotions.map(promo => {
          const product = products.find(p => p.id === promo.productId);
          return (
            <PromotionListItem key={promo.id}>
              <PromoImage src={product?.imageUrl || 'https://via.placeholder.com/80'} alt={promo.name} />
              <PromoInfo>
                <h4>{promo.name}</h4>
                <p>Desconto: {product?.name || 'Produto indisponível'} de R$ {promo.originalPrice?.toFixed(2)} por R$ {promo.promotionalPrice?.toFixed(2)}</p>
              </PromoInfo>
              <PromoStatus $isActive={promo.isActive}>{promo.isActive ? 'Ativa' : 'Inativa'}</PromoStatus>
              <PromoActions>
                <Button onClick={() => handleEditClick(promo)}>Editar</Button>
                <Button onClick={() => handleToggleActive(promo)} $variant="secondary">{promo.isActive ? 'Desativar' : 'Ativar'}</Button>
                <Button onClick={() => handleDelete(promo.id)} $variant="danger">Excluir</Button>
              </PromoActions>
            </PromotionListItem>
          );
        }) : <InfoText>Nenhuma promoção cadastrada.</InfoText>}
      </PromotionList>
    </PageWrapper>
  );
};

export default PromotionsPage;