import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../../../services/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';

import {
  PageWrapper, Header, Title, FormContainer, FormGrid, FormGroup, Input, Textarea, Select,
  FormActions, ProductListSection, ProductListItem, ProductImage, ProductInfo,
  ProductDetails, Price, Tag, ActionButtons, LoadingText, InfoText,
  UploadGroup, FileInput, ProgressBar,
  // --- NOVO: Estilo para o seletor ---
  ImageInputMethodToggle
} from './styles';

const FREE_PLAN_PRODUCT_LIMIT = 10;

const ProductsPage = () => {
  const { tenant, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLimitReached, setLimitReached] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const initialFormData = {
    name: '', description: '', price: '', category: '', imageUrl: '',
    isAvailable: true, isFeatured: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // --- NOVO: Estado para controlar o método de input da imagem ---
  const [imageInputMethod, setImageInputMethod] = useState('url'); // 'url' ou 'upload'

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

      const productData = productsSnap.docs.map(d => ({ ...d.data(), id: d.id }));
      setProducts(productData);
      setCategories(categoriesSnap.docs.map(d => ({ ...d.data(), id: d.id })));

      if (tenant.plan === 'basic' && productData.length >= FREE_PLAN_PRODUCT_LIMIT) {
        setLimitReached(true);
      } else {
        setLimitReached(false);
      }
    } catch (error) { 
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar os seus produtos e categorias."); 
    } finally { 
      setLoading(false); 
    }
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
  
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadProgress(0);
    setImageInputMethod('url'); // Volta para o padrão
  };
  
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({ ...initialFormData, ...product, price: product.price.toString() });
    setImageFile(null);
    setUploadProgress(0);
    setImageInputMethod('url');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- NOVO: Lógica para limpar os campos ao trocar de método ---
  const handleImageMethodChange = (method) => {
    setImageInputMethod(method);
    if (method === 'url') {
      setImageFile(null); // Limpa o ficheiro se mudar para URL
    } else {
      setFormData(prev => ({ ...prev, imageUrl: '' })); // Limpa a URL se mudar para upload
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLimitReached && !editingProduct) {
      toast.error("Você atingiu o limite de produtos do seu plano. Faça um upgrade para adicionar mais!");
      return;
    }
    if (!tenant?.id || !formData.name || !formData.price || !formData.category) {
      return toast.error("Nome, Preço e Categoria são obrigatórios.");
    }
    
    if (imageInputMethod === 'upload' && !imageFile && !editingProduct?.imageUrl) {
        return toast.error("Por favor, selecione uma imagem para fazer upload.");
    }
    if (imageInputMethod === 'url' && !formData.imageUrl) {
        return toast.error("Por favor, forneça uma URL para a imagem.");
    }

    let finalImageUrl = formData.imageUrl;

    if (imageInputMethod === 'upload' && imageFile) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `products/${tenant.id}/${Date.now()}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        finalImageUrl = await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Erro no upload:", error);
              toast.error("Falha no upload da imagem.");
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      } catch (error) {
        return;
      }
    }

    const dataToSave = { ...formData, price: parseFloat(formData.price), imageUrl: finalImageUrl };

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'tenants', tenant.id, 'products', editingProduct.id), dataToSave);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await addDoc(collection(db, 'tenants', tenant.id, 'products'), dataToSave);
        toast.success('Produto adicionado com sucesso!');
      }
      resetForm();
      await fetchData();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error('Ocorreu um erro ao salvar o produto.');
    }
  };
  
  const handleDelete = async (productId) => {
    if (!window.confirm("Tem a certeza que deseja apagar este produto? Esta ação não pode ser desfeita.")) return;
    try {
      await deleteDoc(doc(db, 'tenants', tenant.id, 'products', productId));
      toast.success('Produto apagado com sucesso!');
      fetchData();
    } catch (error) { 
        console.error("Erro ao apagar:", error);
        toast.error('Ocorreu um erro ao apagar o produto.'); 
    }
  };
  
  const handleToggleBoolean = async (productId, field, currentValue) => {
    const optimisticProducts = products.map(p => p.id === productId ? { ...p, [field]: !currentValue } : p);
    setProducts(optimisticProducts);
    try {
      const docRef = doc(db, 'tenants', tenant.id, 'products', productId);
      await updateDoc(docRef, { [field]: !currentValue });
      toast.success('Estado do produto atualizado!');
    } catch (error) {
      console.error("Erro ao atualizar estado:", error);
      toast.error(`Erro ao atualizar. A reverter a alteração.`);
      const revertedProducts = products.map(p => p.id === productId ? { ...p, [field]: currentValue } : p);
      setProducts(revertedProducts);
    }
  };

  if (loading) {
    return <PageWrapper><LoadingText>A carregar os seus produtos...</LoadingText></PageWrapper>;
  }

  const isProPlan = tenant?.plan === 'pro';

  return (
    <PageWrapper>
      <Header>
        <Title>Gerenciamento de Produtos</Title>
        <Button onClick={() => navigate(`/loja/${tenant.slug}`)} variant="secondary">Ver a minha Loja</Button>
      </Header>
      
      {isLimitReached && (
        <InfoText>
            <strong>Atenção:</strong> Você atingiu o limite de {FREE_PLAN_PRODUCT_LIMIT} produtos do plano Básico. Para adicionar mais, <a href="/admin/assinatura">faça um upgrade para o plano Pro</a>.
        </InfoText>
      )}

      <fieldset disabled={isLimitReached && !editingProduct}>
        <FormContainer onSubmit={handleSubmit}>
            <h3>{editingProduct ? 'A Editar Produto' : 'Adicionar Novo Produto'}</h3>
            <FormGrid>
            <FormGroup><label>Nome Produto</label><Input name="name" value={formData.name} onChange={handleInputChange} required /></FormGroup>
            <FormGroup><label>Preço (Ex: 12.50)</label><Input name="price" value={formData.price} onChange={handleInputChange} type="number" step="0.01" required /></FormGroup>
            <FormGroup><label>Categoria</label><Select name="category" value={formData.category} onChange={handleInputChange} required><option value="">Selecione uma categoria</option>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</Select></FormGroup>
            
            {/* --- LÓGICA CONDICIONAL PARA IMAGEM --- */}
            <UploadGroup>
              <label>Imagem do Produto</label>
              {isProPlan ? (
                <>
                  <ImageInputMethodToggle>
                    <input type="radio" id="urlMethod" name="imageMethod" value="url" checked={imageInputMethod === 'url'} onChange={() => handleImageMethodChange('url')} />
                    <label htmlFor="urlMethod">Usar Link (URL)</label>

                    <input type="radio" id="uploadMethod" name="imageMethod" value="upload" checked={imageInputMethod === 'upload'} onChange={() => handleImageMethodChange('upload')} />
                    <label htmlFor="uploadMethod">Fazer Upload</label>
                  </ImageInputMethodToggle>
                  
                  {imageInputMethod === 'url' && (
                    <Input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Cole a URL da imagem" />
                  )}
                  
                  {imageInputMethod === 'upload' && (
                    <>
                      <FileInput type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />
                      {uploadProgress > 0 && uploadProgress < 100 && <ProgressBar style={{ width: `${uploadProgress}%` }} />}
                    </>
                  )}
                </>
              ) : (
                <Input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Cole a URL da imagem" />
              )}
            </UploadGroup>

            <FormGroup className="full-width"><label>Descrição (Opcional)</label><Textarea name="description" value={formData.description} onChange={handleInputChange} /></FormGroup>
            </FormGrid>
            <FormActions>
            {editingProduct && <Button type="button" variant="secondary" onClick={resetForm}>Cancelar Edição</Button>}
            <Button type="submit">{editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}</Button>
            </FormActions>
        </FormContainer>
      </fieldset>

      <ProductListSection>
        <h3>Produtos Cadastrados ({products.length}/{tenant.plan === 'basic' ? FREE_PLAN_PRODUCT_LIMIT : 'Ilimitado'})</h3>
        {products.length === 0 && !loading ? (
            <InfoText>Nenhum produto cadastrado ainda. Use o formulário acima para começar.</InfoText>
        ) : (
            products.map(product => (
              <ProductListItem key={product.id} $isAvailable={product.isAvailable}>
                <ProductImage src={product.imageUrl || 'https://placehold.co/100x100/E9ECEF/495057?text=Sem+Foto'} alt={product.name} />
                <ProductInfo>
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <ProductDetails>
                    <Price>R$ {(product.price || 0).toFixed(2)}</Price>
                    <Tag>{product.category}</Tag>
                  </ProductDetails>
                </ProductInfo>
                <ActionButtons>
                  <Button onClick={() => handleToggleBoolean(product.id, 'isFeatured', product.isFeatured)} variant={product.isFeatured ? 'primary' : 'secondary'}>{product.isFeatured ? 'Remover Destaque' : 'Destacar'}</Button>
                  <Button onClick={() => handleToggleBoolean(product.id, 'isAvailable', product.isAvailable)} variant="secondary">{product.isAvailable ? 'Desativar' : 'Ativar'}</Button>
                  <Button onClick={() => handleEditClick(product)}>Editar</Button>
                  <Button onClick={() => handleDelete(product.id)} variant="danger">Excluir</Button>
                </ActionButtons>
              </ProductListItem>
            ))
        )}
      </ProductListSection>
    </PageWrapper>
  );
};

export default ProductsPage;