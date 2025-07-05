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
  const { tenantId } = useAuth();

  // Estado para o formulário de nova categoria
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para buscar as categorias do lojista logado
  const fetchCategories = useCallback(async () => {
    if (!tenantId) return;
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
  }, [tenantId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Função para lidar com o envio do formulário
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error("O nome da categoria não pode estar vazio.");
      return;
    }
    setIsSubmitting(true);
    try {
      const categoriesRef = collection(db, 'tenants', tenantId, 'categories');
      await addDoc(categoriesRef, {
        name: newCategoryName.trim(),
        // Adicione aqui outros campos se necessário no futuro
      });
      toast.success(`Categoria "${newCategoryName.trim()}" adicionada!`);
      setNewCategoryName(''); // Limpa o campo
      fetchCategories(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      toast.error("Falha ao adicionar a categoria.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para apagar uma categoria
  const handleDeleteCategory = async (categoryId, categoryName) => {
    if (!window.confirm(`Tem a certeza que quer apagar a categoria "${categoryName}"?`)) {
      return;
    }
    try {
      const categoryDocRef = doc(db, 'tenants', tenantId, 'categories', categoryId);
      await deleteDoc(categoryDocRef);
      toast.success(`Categoria "${categoryName}" apagada.`);
      fetchCategories(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao apagar categoria:", error);
      toast.error("Falha ao apagar a categoria.");
    }
  };

  if (loading) {
    return <PageWrapper><LoadingText>A carregar categorias...</LoadingText></PageWrapper>;
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
            placeholder="Ex: Pizzas Tradicionais"
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
                  variant="danger" 
                  onClick={() => handleDeleteCategory(category.id, category.name)}
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