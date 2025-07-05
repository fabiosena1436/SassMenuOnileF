// Arquivo: src/pages/Admin/ProductsPage/index.js

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';

import {
  PageWrapper, Header, Title, FormContainer, FormGrid, FormGroup, Input, Textarea, Select,
  FormActions, ProductListSection, ProductListItem, ProductImage, ProductInfo,
  ProductDetails, Price, Tag, ActionButtons, LoadingText, InfoText
} from './styles';

const ProductsPage = () => {
  const { tenant, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const initialFormData = {
    name: '', description: '', price: '', category: '', imageUrl: '',
    isAvailable: true, isFeatured: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = useCallback(async () => {
    if (!tenant?.id) return;
    setLoading(true);
    try {
      const productsRef = collection(db, 'tenants', tenant.id, 'products');
      const categoriesRef = collection(db, 'tenants', tenant.id, 'categories');
      
      const [productsSnap, categoriesSnap] = await Promise.all([
        getDocs(query(productsRef, orderBy('name'))),
        getDocs(query(categoriesRef, orderBy('name'))),
      ]);

      setProducts(productsSnap.docs.map(d => ({ ...d.data(), id: d.id })));
      setCategories(categoriesSnap.docs.map(d => ({ ...d.data(), id: d.id })));
    } catch (error) { toast.error("Erro ao carregar dados."); }
    finally { setLoading(false); }
  }, [tenant]);

  useEffect(() => {
    if (!authLoading && tenant) {
      fetchData();
    } else if (!authLoading && !tenant) {
        setLoading(false);
    }
  }, [authLoading, tenant, fetchData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
  };
  
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({ ...initialFormData, ...product, price: product.price.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenant?.id || !formData.name || !formData.price || !formData.category) {
      return toast.error("Nome, Preço e Categoria são obrigatórios.");
    }
    const dataToSave = { ...formData, price: parseFloat(formData.price) };

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'tenants', tenant.id, 'products', editingProduct.id), dataToSave);
        toast.success('Produto atualizado!');
      } else {
        await addDoc(collection(db, 'tenants', tenant.id, 'products'), dataToSave);
        toast.success('Produto adicionado!');
      }
      resetForm();
      await fetchData();
    } catch (error) { toast.error('Erro ao salvar o produto.'); }
  };
  
  const handleDelete = async (productId) => {
    if (!window.confirm("Apagar este produto? Esta ação não pode ser desfeita.")) return;
    try {
      await deleteDoc(doc(db, 'tenants', tenant.id, 'products', productId));
      toast.success('Produto apagado!');
      fetchData();
    } catch (error) { toast.error('Erro ao apagar.'); }
  };
  
  // <<< FUNÇÃO PARA ATIVAR/DESATIVAR E DESTACAR/REMOVER DESTAQUE >>>
  const handleToggleBoolean = async (productId, field, currentValue) => {
    // Atualiza a interface imediatamente para uma melhor experiência (Optimistic UI Update)
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, [field]: !currentValue } : p
      )
    );

    try {
      const docRef = doc(db, 'tenants', tenant.id, 'products', productId);
      await updateDoc(docRef, { [field]: !currentValue });
      toast.success('Estado do produto atualizado!');
    } catch (error) {
      toast.error(`Erro ao atualizar. A reverter a alteração.`);
      // Se der erro, reverte a alteração na interface
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === productId ? { ...p, [field]: currentValue } : p
        )
      );
    }
  };

  if (loading) {
    return <PageWrapper><LoadingText>A carregar...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <Header>
        <Title>Gerenciamento de Produtos</Title>
        <Button onClick={() => navigate(`/loja/${tenant.slug}`)} $variant="secondary">Voltar para o Site</Button>
      </Header>
      
      <FormContainer onSubmit={handleSubmit}>
        <h3>{editingProduct ? 'A Editar Produto' : 'Adicionar Novo Produto'}</h3>
        <FormGrid>
          <FormGroup><label>Nome Produto</label><Input name="name" value={formData.name} onChange={handleInputChange} required /></FormGroup>
          <FormGroup><label>Preço (Ex: 12.50)</label><Input name="price" value={formData.price} onChange={handleInputChange} type="number" step="0.01" required /></FormGroup>
          <FormGroup><label>Categoria</label><Select name="category" value={formData.category} onChange={handleInputChange} required><option value="">Selecione uma categoria</option>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</Select></FormGroup>
          <FormGroup><label>URL da Imagem</label><Input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} /></FormGroup>
          <FormGroup className="full-width"><label>Descrição (Opcional)</label><Textarea name="description" value={formData.description} onChange={handleInputChange} /></FormGroup>
        </FormGrid>
        <FormActions>
          {editingProduct && <Button type="button" $variant="secondary" onClick={resetForm}>Cancelar Edição</Button>}
          <Button type="submit">{editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}</Button>
        </FormActions>
      </FormContainer>

      <ProductListSection>
        <h3>Produtos Cadastrados</h3>
        {products.map(product => (
          <ProductListItem key={product.id} $isAvailable={product.isAvailable}>
            <ProductImage src={product.imageUrl || 'https://via.placeholder.com/100'} alt={product.name} />
            <ProductInfo>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <ProductDetails>
                <Price>R$ {(product.price || 0).toFixed(2)}</Price>
                <Tag>{product.category}</Tag>
                {product.isAvailable && <Tag style={{background: '#dcfce7', color: '#166534'}}>Disponível</Tag>}
              </ProductDetails>
            </ProductInfo>
            <ActionButtons>
              <Button onClick={() => handleToggleBoolean(product.id, 'isFeatured', product.isFeatured)} $variant={product.isFeatured ? 'primary' : 'secondary'}>{product.isFeatured ? 'Remover Destaque' : 'Destacar'}</Button>
              <Button onClick={() => handleToggleBoolean(product.id, 'isAvailable', product.isAvailable)} $variant="secondary">{product.isAvailable ? 'Desativar' : 'Ativar'}</Button>
              <Button onClick={() => handleEditClick(product)}>Editar</Button>
              <Button onClick={() => handleDelete(product.id)} $variant="danger">Excluir</Button>
            </ActionButtons>
          </ProductListItem>
        ))}
      </ProductListSection>
    </PageWrapper>
  );
};

export default ProductsPage;