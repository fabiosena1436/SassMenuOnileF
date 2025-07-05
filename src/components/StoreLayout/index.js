// Arquivo: src/components/StoreLayout/index.js

import React, { useState, useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // <<< MUDANÇA: Importar onSnapshot
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
    // Se não houver slug, definimos erro e paramos.
    if (!storeSlug) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    
    // Criamos a query para encontrar o lojista pelo slug
    const tenantsCollectionRef = collection(db, 'tenants');
    const q = query(tenantsCollectionRef, where('slug', '==', storeSlug));

    // <<< MUDANÇA PRINCIPAL AQUI: Usamos onSnapshot em vez de getDocs >>>
    // onSnapshot "ouve" as mudanças no banco de dados em tempo real.
    // A variável 'unsubscribe' é uma função que usamos para parar de ouvir quando o componente for desmontado.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        // Se a loja não for encontrada
        console.error(`Nenhuma loja encontrada com o slug: ${storeSlug}`);
        setError(true);
        setStoreData(null);
      } else {
        // Se a loja for encontrada, atualizamos o nosso estado com os dados mais recentes
        const tenantDoc = querySnapshot.docs[0];
        setStoreData({ id: tenantDoc.id, ...tenantDoc.data() });
        setError(false);
      }
      // Marcamos que o carregamento inicial terminou
      setLoading(false);
    }, (err) => {
      // Lidamos com possíveis erros de permissão ou de rede
      console.error("Erro ao ouvir as informações da loja:", err);
      setError(true);
      setLoading(false);
    });

    // Função de limpeza do useEffect:
    // Quando o utilizador sai da página da loja, paramos de "ouvir" para poupar recursos.
    return () => {
      unsubscribe();
    };
  }, [storeSlug]); // O hook re-executa se o slug na URL mudar

  if (loading) {
    return <div>Carregando loja...</div>;
  }

  if (error || !storeData) {
    return <div>Loja não encontrada ou indisponível.</div>;
  }

  // Uma vez que temos os dados, passamo-los para todos os componentes filhos
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