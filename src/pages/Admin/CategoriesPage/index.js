// Arquivo: src/pages/Admin/CategoriesPage/index.js (VERSÃO MULTI-TENANT)

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext'; // Passo 1
import Button from '../../../components/Button';
import {
  PageWrapper,
  SectionTitle,
  AddForm,
  FormGroup,
  CategoryList,
  CategoryListItem,
  LoadingText
} from './styles';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const { tenantId } = useAuth(); // Passo 2

  // Função para buscar as categorias (agora depende do tenantId)
  const fetchCategories = useCallback(async () => {
    if (!tenantId) return; // Só executa se tivermos o tenantId
    setLoading(true);
    // Passo 3: O caminho da coleção agora inclui o tenantId
    const categoriesCollectionRef = collection(db, 'tenants', tenantId, 'categories');
    const data = await getDocs(categoriesCollectionRef);
    setCategories(data.docs.map(d => ({ ...d.data(), id: d.id })));
    setLoading(false);
  }, [tenantId]); // Passo 4

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Função para ADICIONAR uma categoria
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim() === '' || !tenantId) return;
    const categoriesCollectionRef = collection(db, 'tenants', tenantId, 'categories'); // Passo 3
    await addDoc(categoriesCollectionRef, {
      name: newCategoryName,
      name_lowercase: newCategoryName.toLowerCase(),
    });
    setNewCategoryName('');
    fetchCategories(); // Recarrega a lista
  };

  // Função para DELETAR uma categoria
  const handleDeleteCategory = async (id) => {
    if (!tenantId) return;
    const categoryDoc = doc(db, 'tenants', tenantId, 'categories', id); // Passo 3
    await deleteDoc(categoryDoc);
    fetchCategories();
  };
  
  // Funções para EDITAR uma categoria
  const handleEditCategory = async (id) => {
    if (!tenantId) return;
    const categoryDoc = doc(db, 'tenants', tenantId, 'categories', id); // Passo 3
    await updateDoc(categoryDoc, { name: editingCategoryName, name_lowercase: editingCategoryName.toLowerCase() });
    setEditingCategoryId(null);
    fetchCategories();
  };

  const startEditing = (category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
  };

  if (loading) {
    return <PageWrapper><LoadingText>Carregando categorias...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <SectionTitle>Gerenciar Categorias</SectionTitle>
      <AddForm onSubmit={handleAddCategory}>
        <FormGroup>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nome da nova categoria"
          />
          <Button type="submit">Adicionar</Button>
        </FormGroup>
      </AddForm>

      <CategoryList>
        {categories.map((category) => (
          <CategoryListItem key={category.id}>
            {editingCategoryId === category.id ? (
              <>
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                />
                <div>
                  <button onClick={() => handleEditCategory(category.id)} className="icon-btn-save"><FaCheck /></button>
                  <button onClick={() => setEditingCategoryId(null)} className="icon-btn-cancel"><FaTimes /></button>
                </div>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <div>
                  <button onClick={() => startEditing(category)} className="icon-btn-edit"><FaEdit /></button>
                  <button onClick={() => handleDeleteCategory(category.id)} className="icon-btn-delete"><FaTrash /></button>
                </div>
              </>
            )}
          </CategoryListItem>
        ))}
      </CategoryList>
    </PageWrapper>
  );
};

export default CategoriesPage;