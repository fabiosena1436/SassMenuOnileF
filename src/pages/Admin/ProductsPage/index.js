// Arquivo: src/pages/Admin/ProductsPage/index.js

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';

import {
  PageWrapper,
  SectionTitle,
  AddForm,
  FormGroup,
  FormActions,
  ProductList,
  LoadingText,
  InfoText
} from './styles';
import ProductListItem from '../../../components/ProductListItem';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tenant, loading: authLoading } = useAuth();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const initialFormData = {
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    isAvailable: true,
    isFeatured: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  const fetchProductsAndCategories = useCallback(async () => {
    const tenantId = tenant?.id;
    if (!tenantId) return;

    setLoading(true);
    try {
      const productsRef = collection(db, 'tenants', tenantId, 'products');
      const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
      
      const [productsSnap, categoriesSnap] = await Promise.all([
        getDocs(query(productsRef, orderBy('name'))),
        getDocs(query(categoriesRef, orderBy('name'))),
      ]);

      setProducts(productsSnap.docs.map(d => ({ ...d.data(), id: d.id })));
      setCategories(categoriesSnap.docs.map(d => ({ ...d.data(), id: d.id })));
    } catch (error) {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }, [tenant]);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
    } else if (tenant) {
      fetchProductsAndCategories();
    } else {
      setLoading(false);
    }
  }, [authLoading, tenant, fetchProductsAndCategories]);

  const resetFormAndClose = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setIsFormVisible(false);
  };
  
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({ ...initialFormData, ...product, price: product.price.toString() });
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAddNewClick = () => {
      setEditingProduct(null);
      setFormData(initialFormData);
      setIsFormVisible(true);
  }

  const handleDelete = async (productId) => {
    if (!window.confirm("Tem a certeza que quer apagar este produto?")) return;
    const tenantId = tenant?.id;
    if (!tenantId) return;
    try {
      await deleteDoc(doc(db, 'tenants', tenantId, 'products', productId));
      toast.success('Produto apagado!');
      fetchProductsAndCategories();
    } catch (error) {
      toast.error('Erro ao apagar o produto.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tenantId = tenant?.id;
    if (!tenantId) {
      toast.error("Não foi possível identificar a sua loja.");
      return;
    }
    
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Nome, Preço e Categoria são obrigatórios.");
      return;
    }

    const dataToSave = { ...formData, price: parseFloat(formData.price) };

    try {
      if (editingProduct) {
        const productRef = doc(db, 'tenants', tenantId, 'products', editingProduct.id);
        await updateDoc(productRef, dataToSave);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await addDoc(collection(db, 'tenants', tenantId, 'products'), dataToSave);
        toast.success('Produto adicionado com sucesso!');
      }
      resetFormAndClose();
      fetchProductsAndCategories();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error('Erro ao salvar o produto.');
    }
  };
  
  if (loading) {
    return <PageWrapper><LoadingText>A carregar...</LoadingText></PageWrapper>;
  }

  if (!tenant) {
      return <PageWrapper><InfoText>Não foi possível carregar os dados da sua loja.</InfoText></PageWrapper>;
  }
  
  return (
    <PageWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <SectionTitle>Gerir Produtos</SectionTitle>
        <Button onClick={isFormVisible ? () => setIsFormVisible(false) : handleAddNewClick}>
          {isFormVisible ? 'Fechar Formulário' : 'Adicionar Produto'}
        </Button>
      </div>

      {isFormVisible && (
        <AddForm onSubmit={handleSubmit}>
          <FormGroup>
            <label>Nome do Produto</label>
            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </FormGroup>
          <FormGroup>
            <label>Preço (R$)</label>
            <input type="number" name="price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} step="0.01" required />
          </FormGroup>
          <FormGroup className="form-group-description">
            <label>Descrição</label>
            <textarea name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </FormGroup>
          <FormGroup>
            <label>Categoria</label>
            <select name="category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
              <option value="">-- Selecione --</option>
              {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup>
            <label>URL da Imagem</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
          </FormGroup>
          <FormGroup>
            <label><input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})} /> Disponível</label>
          </FormGroup>
          <FormGroup>
            <label><input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} /> Destaque</label>
          </FormGroup> {/* <<< CORREÇÃO AQUI: removido o '-' extra */}
          <FormActions>
            <Button type="submit" $variant="primary">{editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}</Button>
            <Button type="button" $variant="secondary" onClick={() => setIsFormVisible(false)}>Cancelar</Button>
          </FormActions>
        </AddForm>
      )}

      <SectionTitle>Lista de Produtos</SectionTitle>
      {products.length > 0 ? (
        <ProductList>
          {products.map(product => (
            <ProductListItem 
                key={product.id} 
                product={product} 
                onEdit={() => handleEditClick(product)}
                onDelete={() => handleDelete(product.id)}
            />
          ))}
        </ProductList>
      ) : (
        <InfoText>Ainda não há produtos cadastrados.</InfoText>
      )}
    </PageWrapper>
  );
};

export default ProductsPage;