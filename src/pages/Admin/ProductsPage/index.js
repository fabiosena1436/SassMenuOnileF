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
  ProductListItem,
  LoadingText,
  InfoText
} from './styles';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tenantId } = useAuth();

  // Estados para o formulário
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    isAvailable: true,
    isFeatured: false,
  });

  const fetchProductsAndCategories = useCallback(async () => {
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
      console.error("Erro ao buscar dados:", error);
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    fetchProductsAndCategories();
  }, [fetchProductsAndCategories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setEditingProduct(null);
    setIsFormVisible(false);
    setFormData({ name: '', description: '', price: '', category: '', imageUrl: '', isAvailable: true, isFeatured: false });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({ ...product, price: product.price.toString() });
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Tem a certeza que quer apagar este produto?")) return;
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
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Nome, Preço e Categoria são obrigatórios.");
      return;
    }

    const dataToSave = { ...formData, price: parseFloat(formData.price) };

    try {
      if (editingProduct) {
        // Atualizar
        const productRef = doc(db, 'tenants', tenantId, 'products', editingProduct.id);
        await updateDoc(productRef, dataToSave);
        toast.success('Produto atualizado com sucesso!');
      } else {
        // Adicionar
        await addDoc(collection(db, 'tenants', tenantId, 'products'), dataToSave);
        toast.success('Produto adicionado com sucesso!');
      }
      resetForm();
      fetchProductsAndCategories();
    } catch (error) {
      toast.error('Erro ao salvar o produto.');
    }
  };
  
  if (loading) return <PageWrapper><LoadingText>A carregar...</LoadingText></PageWrapper>;

  return (
    <PageWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SectionTitle>Gerir Produtos</SectionTitle>
        <Button onClick={() => { setIsFormVisible(!isFormVisible); setEditingProduct(null); }}>
          {isFormVisible ? 'Fechar Formulário' : 'Adicionar Produto'}
        </Button>
      </div>

      {isFormVisible && (
        <AddForm onSubmit={handleSubmit}>
          <FormGroup>
            <label>Nome do Produto</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <label>Preço (R$)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
          </FormGroup>
          <FormGroup className="form-group-description">
            <label>Descrição</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Categoria</label>
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">-- Selecione --</option>
              {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
            </select>
          </FormGroup>
          <FormGroup>
            <label>URL da Imagem</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label><input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleInputChange} /> Disponível para venda</label>
          </FormGroup>
          <FormGroup>
            <label><input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} /> Marcar como destaque na Home</label>
          </FormGroup>
          <FormActions>
            <Button type="submit" variant="primary">{editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}</Button>
            <Button type="button" variant="secondary" onClick={resetForm}>Cancelar</Button>
          </FormActions>
        </AddForm>
      )}

      <SectionTitle>Lista de Produtos</SectionTitle>
      {products.length > 0 ? (
        <ProductList>
          {products.map(product => (
            <ProductListItem key={product.id}>
              <div className="product-image-container">
                 <img src={product.imageUrl || 'https://via.placeholder.com/100'} alt={product.name} />
              </div>
              <div className="product-content">
                  <p className="product-name">{product.name}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-details">
                      <span className="product-price">Preço: <strong>R$ {product.price?.toFixed(2)}</strong></span>
                      <span className="product-category">Categoria: <strong>{product.category}</strong></span>
                  </div>
              </div>
              <div className="product-actions">
                  <Button onClick={() => handleEditClick(product)} style={{backgroundColor: '#3b82f6'}}>Editar</Button>
                  <Button onClick={() => handleDelete(product.id)} variant="danger">Excluir</Button>
              </div>
            </ProductListItem>
          ))}
        </ProductList>
      ) : (
        <InfoText>Ainda não há produtos cadastrados.</InfoText>
      )}
    </PageWrapper>
  );
};

export default ProductsPage;