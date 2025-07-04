// Ficheiro completo: src/pages/SuperAdmin/SuperAdminDashboardPage/index.js

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import { PageWrapper, Title, TenantTable, Th, Td, Tr } from './styles';

const SuperAdminDashboardPage = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const tenantsRef = collection(db, 'tenants');
        const q = query(tenantsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const tenantsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setTenants(tenantsList);
      } catch (error) {
        console.error("Erro ao buscar lojistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  if (loading) {
    return <PageWrapper><Title>Carregando Lojistas...</Title></PageWrapper>;
  }

  return (
    <PageWrapper>
      <Title>Painel Super Admin - Gestão de Lojistas</Title>
      <TenantTable>
        <thead>
          <Tr>
            <Th>Nome da Loja</Th>
            <Th>Plano</Th>
            <Th>Status da Assinatura</Th>
            <Th>Email do Dono</Th>
          </Tr>
        </thead>
        <tbody>
          {tenants.map(tenant => (
            <Tr key={tenant.id}>
              <Td>{tenant.storeName}</Td>
              <Td>{tenant.plan}</Td>
              <Td className={tenant.mp_subscription_status === 'authorized' ? 'status-active' : 'status-cancelled'}>
                {tenant.mp_subscription_status || 'N/A'}
              </Td>
              {/* Para obter o email, precisaríamos de outra consulta. Deixaremos para um próximo passo. */}
              <Td>--</Td> 
            </Tr>
          ))}
        </tbody>
      </TenantTable>
    </PageWrapper>
  );
};

export default SuperAdminDashboardPage;