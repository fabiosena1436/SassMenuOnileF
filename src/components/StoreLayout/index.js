// Arquivo: src/components/StoreLayout/index.js

import React, { useState, useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { StoreContext } from '../../contexts/StoreContext';
import Navbar from '../Navbar';
import Footer from '../Footer';

const StoreLayout = () => {
  const { storeSlug } = useParams();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!storeSlug) {
        setLoading(false);
        setError(true);
        return;
      }

      setLoading(true);
      setError(false);
      
      try {
        const tenantsCollectionRef = collection(db, 'tenants');
        const q = query(tenantsCollectionRef, where('slug', '==', storeSlug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.error(`Nenhuma loja encontrada com o slug: ${storeSlug}`);
          setError(true);
        } else {
          // Obtemos o ID do documento e todos os dados do lojista
          const tenantDoc = querySnapshot.docs[0];
          setStoreData({ id: tenantDoc.id, ...tenantDoc.data() });
        }
      } catch (e) {
        console.error("Erro ao buscar informações da loja:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeSlug]);

  if (loading) {
    return <div>Carregando loja...</div>;
  }

  if (error) {
    // Redireciona para uma página de erro ou para a página inicial
    return <Navigate to="/" replace />;
  }

  // Usamos o StoreContext.Provider para passar todos os dados da loja para os componentes filhos
  return (
    <StoreContext.Provider value={storeData}>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 140px)' }}>
        <Outlet /> 
      </main>
      <Footer />
    </StoreContext.Provider>
  );
};

export default StoreLayout;