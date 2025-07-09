// Arquivo: src/components/StoreLayout/index.js

import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom'; // 1. Importar o useLocation
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { StoreContext } from '../../contexts/StoreContext';
import Navbar from '../Navbar';
import Footer from '../Footer';

const StoreLayout = () => {
  const { storeSlug } = useParams();
  const location = useLocation(); // 2. Obter as informações da localização atual

  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!storeSlug) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    
    const tenantsCollectionRef = collection(db, 'tenants');
    const q = query(tenantsCollectionRef, where('slug', '==', storeSlug));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setError(true);
        setStoreData(null);
      } else {
        const tenantDoc = querySnapshot.docs[0];
        setStoreData({ id: tenantDoc.id, ...tenantDoc.data() });
        setError(false);
      }
      setLoading(false);
    }, (err) => {
      setError(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [storeSlug]);

  // 3. Lógica para decidir se o Footer deve ser mostrado
  // Verificamos se a URL termina exatamente com o slug (HomePage) ou com '/cardapio'
  const shouldShowFooter = location.pathname.endsWith(storeSlug) || location.pathname.endsWith('/cardapio');

  if (loading) {
    return <div>Carregando loja...</div>;
  }

  if (error || !storeData) {
    return <div>Loja não encontrada ou indisponível.</div>;
  }

  return (
    <StoreContext.Provider value={storeData}>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 70px)' }}>
        <Outlet /> 
      </main>
      
      {/* 4. Renderização condicional do Footer */}
      {shouldShowFooter && <Footer />}
    </StoreContext.Provider>
  );
};

export default StoreLayout;