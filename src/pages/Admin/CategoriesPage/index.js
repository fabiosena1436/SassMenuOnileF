// Arquivo: src/pages/Admin/CategoriesPage/index.js

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';

import {
  PageWrapper,
  SectionTitle,
  FormContainer,
  FormGroup,
  CategoryList,
  CategoryListItem,
  CategoryInfo,
  ActionButtons,
  LoadingText,
  InfoText
} from './styles';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tenant, loading: authLoading } = useAuth(); // <<< MUDANÇA 1: Obtemos o objeto 'tenant' e o 'authLoading'

  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = useCallback(async () => {
    // <<< MUDANÇA 2: Obtemos o ID de dentro do objeto 'tenant'
    const tenantId = tenant?.id;

    if (!tenantId) {
      // Se não houver ID do lojista, não fazemos nada. O useEffect abaixo irá parar o loading.
      return;
    }
    
    setLoading(true);
    try {
      const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
      const q = query(categoriesRef, orderBy('name'));
      const querySnapshot = await getDocs(q);
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      toast.error("Não foi possível carregar as categorias.");
    } finally {
      setLoading(false);
    }
  }, [tenant]); // A dependência agora é o objeto 'tenant'

  useEffect(() => {
    // <<< MUDANÇA 3: A lógica de carregamento está mais robusta
    if (authLoading) {
      // Se a autenticação ainda está a carregar, esperamos.
      setLoading(true);
    } else if (tenant) {
      // Se já temos o lojista, buscamos as categorias.
      fetchCategories();
    } else {
      // Se a autenticação terminou e não há lojista, paramos de carregar.
      setLoading(false);
    }
  }, [authLoading, tenant, fetchCategories]);


  const handleAddCategory = async (e) => {
    e.preventDefault();
    const tenantId = tenant?.id;
    if (!tenantId) {
      toast.error("Erro: ID da loja não encontrado. Faça login novamente.");
      return;
    }
    if (!newCategoryName.trim()) {
      toast.error("O nome da categoria não pode estar vazio.");
      return;
    }
    setIsSubmitting(true);
    try {
      const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
      await addDoc(categoriesRef, {
        name: newCategoryName.trim(),
      });
      toast.success(`Categoria "${newCategoryName.trim()}" adicionada!`);
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      toast.error("Falha ao adicionar a categoria.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    const tenantId = tenant?.id;
    if (!tenantId) return;

    if (!window.confirm(`Tem a certeza que quer apagar a categoria "${categoryName}"?`)) {
      return;
    }
    try {
      const categoryDocRef = doc(db, 'tenants', tenantId, 'categories', categoryId);
      await deleteDoc(categoryDocRef);
      toast.success(`Categoria "${categoryName}" apagada.`);
      fetchCategories();
    } catch (error) {
      console.error("Erro ao apagar categoria:", error);
      toast.error("Falha ao apagar a categoria.");
    }
  };

  if (loading) {
    return <PageWrapper><LoadingText>A carregar categorias...</LoadingText></PageWrapper>;
  }

  if (!tenant) {
      return <PageWrapper><InfoText>Não foi possível carregar os dados da sua loja. Por favor, tente fazer login novamente.</InfoText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <SectionTitle>Gerir Categorias</SectionTitle>

      <FormContainer onSubmit={handleAddCategory}>
        <FormGroup>
          <label htmlFor="categoryName">Nome da Nova Categoria</label>
          <input
            id="categoryName"
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Ex: Bebidas"
            disabled={isSubmitting}
          />
        </FormGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'A adicionar...' : 'Adicionar Categoria'}
        </Button>
      </FormContainer>

      <CategoryList>
        {categories.length > 0 ? (
          categories.map(category => (
            <CategoryListItem key={category.id}>
              <CategoryInfo>{category.name}</CategoryInfo>
              <ActionButtons>
                <Button 
                  $variant="danger" 
                  onClick={() => handleDeleteCategory(category.id, category.name)}
                  style={{padding: '8px 12px', fontSize: '0.9em'}}
                >
                  Apagar
                </Button>
              </ActionButtons>
            </CategoryListItem>
          ))
        ) : (
          <InfoText>Nenhuma categoria cadastrada ainda.</InfoText>
        )}
      </CategoryList>
    </PageWrapper>
  );
};

export default CategoriesPage;