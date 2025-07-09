// Arquivo: src/pages/SuperAdmin/SuperAdminDashboardPage/index.js

import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../../services/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';

import {
  PageWrapper, Header, Title, SearchInput, Table, Th, Td, Tr, SelectRole,
  LoadingText, InfoText, Tag, TenantLink
} from './styles';

const SuperAdminDashboardPage = () => {
  const { user: superAdminUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersCollectionRef = collection(db, 'users');
        const tenantsCollectionRef = collection(db, 'tenants');

        const [usersSnapshot, tenantsSnapshot] = await Promise.all([
          getDocs(usersCollectionRef),
          getDocs(tenantsCollectionRef)
        ]);

        setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setTenants(tenantsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Falha ao carregar dados do painel.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    if (userId === superAdminUser.uid) {
        toast.error("Não pode alterar a sua própria função.");
        return;
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { role: newRole });
      
      setUsers(prevUsers => 
        prevUsers.map(u => u.id === userId ? { ...u, role: newRole } : u)
      );
      toast.success("Função do utilizador atualizada!");

    } catch (error) {
      console.error("Erro ao atualizar função:", error);
      toast.error("Não foi possível atualizar a função.");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);
  
  const tenantsByOwner = useMemo(() => {
    return tenants.reduce((acc, tenant) => {
        if(tenant.ownerId) {
            acc[tenant.ownerId] = tenant;
        }
        return acc;
    }, {});
  }, [tenants]);

  if (loading) {
    return <PageWrapper><LoadingText>A carregar gestor de utilizadores...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <Header>
        <Title>Gestão de Utilizadores</Title>
        <SearchInput
          type="text"
          placeholder="Pesquisar por email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>
      
      <Table>
        <thead>
          <Tr>
            <Th>Email</Th>
            <Th>Função (Role)</Th>
            <Th>Loja Associada</Th>
            <Th>ID do Utilizador</Th>
          </Tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? filteredUsers.map(u => {
            const associatedTenant = tenantsByOwner[u.id];
            return (
              <Tr key={u.id}>
                <Td data-label="Email">{u.email || 'Email não disponível'}</Td>
                <Td data-label="Função">
                   <SelectRole
                     value={u.role || 'user'}
                     onChange={(e) => handleRoleChange(u.id, e.target.value)}
                     disabled={u.id === superAdminUser.uid}
                   >
                     <option value="user">Utilizador</option>
                     <option value="lojista">Lojista</option>
                     <option value="superadmin">Super Admin</option>
                   </SelectRole>
                </Td>
                <Td data-label="Loja">
                    {associatedTenant ? (
                        <TenantLink href={`/loja/${associatedTenant.slug}`} target="_blank">
                            {associatedTenant.storeName} {associatedTenant.plan && <Tag>{associatedTenant.plan}</Tag>}
                        </TenantLink>
                    ) : (
                        '-'
                    )}
                </Td>
                <Td data-label="ID do Utilizador">{u.id}</Td>
              </Tr>
            )
          }) : (
            <Tr>
              <Td colSpan="4"><InfoText>Nenhum utilizador encontrado.</InfoText></Td>
            </Tr>
          )}
        </tbody>
      </Table>
    </PageWrapper>
  );
};

export default SuperAdminDashboardPage;