// Arquivo: src/components/StoreLayout/index.js

import React, { useState, useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { StoreContext } from '../../contexts/StoreContext';
import Navbar from '../Navbar'; // Supondo que você tenha um Navbar genérico
import Footer from '../Footer'; // Supondo que você tenha um Footer genérico

const StoreLayout = () => {
  const { storeSlug } = useParams(); // Pega o ":storeSlug" da URL
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStoreInfo = async () => {
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
          const storeData = querySnapshot.docs[0].data();
          const tenantId = querySnapshot.docs[0].id;
          
          setStoreInfo({
            tenantId: tenantId,
            name: storeData.storeName,
            // Adicione outras configurações da loja que você queira usar globalmente
            // Ex: storeData.logoUrl, storeData.themeColor, etc.
          });
        }
      } catch (e) {
        console.error("Erro ao buscar informações da loja:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreInfo();
  }, [storeSlug]); // O useEffect roda sempre que o slug na URL mudar

  if (loading) {
    return <div>Carregando loja...</div>;
  }

  if (error) {
    // Você pode criar uma página de erro mais elaborada
    return <div>Loja não encontrada.</div>;
  }

  // Se tudo deu certo, nós renderizamos o provedor do contexto
  // com as informações da loja, e dentro dele, as páginas filhas (Outlet).
  return (
    <StoreContext.Provider value={storeInfo}>
      {/* Aqui você pode colocar o layout comum da sua loja, como a Navbar e o Footer */}
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </StoreContext.Provider>
  );
};

export default StoreLayout;