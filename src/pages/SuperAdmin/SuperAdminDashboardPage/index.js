import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebaseConfig';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import { FaUsers, FaStore, FaDollarSign, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

import {
  PageWrapper, Header, Title, SearchInput, Table, Th, Td, Tr, SelectRole,
  LoadingText, InfoText, Tag, TenantLink,
  StatsGrid, StatCard, StatIcon, StatInfo, StatLabel, StatValue,
  LogoutButton
} from './styles';

const SuperAdminDashboardPage = () => {
  const { user: superAdminUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const tenantsQuery = query(collection(db, 'tenants'), orderBy('createdAt', 'desc'));

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao escutar utilizadores:", error);
      toast.error("Falha ao carregar utilizadores.");
      setLoading(false);
    });

    const unsubscribeTenants = onSnapshot(tenantsQuery, (snapshot) => {
      const tenantsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTenants(tenantsData);
    }, (error) => {
      console.error("Erro ao escutar lojas:", error);
      toast.error("Falha ao carregar lojas.");
    });

    return () => {
      unsubscribeUsers();
      unsubscribeTenants();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sessão terminada com sucesso!');
      navigate('/super-admin/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Não foi possível sair. Tente novamente.");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (userId === superAdminUser.uid) {
      toast.error("Não pode alterar a sua própria função.");
      return;
    }
    try {
      const userDocRef = doc(db, 'users', userId);
      // --- AQUI ESTÁ A CORREÇÃO ---
      // Corrigido de userDocR para userDocRef
      await updateDoc(userDocRef, { role: newRole }); 
      toast.success("Função do utilizador atualizada!");
    } catch (error) {
      console.error("Erro ao atualizar função:", error);
      toast.error("Não foi possível atualizar a função.");
    }
  };
  
  const dashboardStats = useMemo(() => {
    const totalUsers = users.length;
    const totalStores = tenants.length;
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsersLast7Days = users.filter(u => u.createdAt?.toDate() > sevenDaysAgo).length;

    const estimatedRevenue = tenants.reduce((acc, tenant) => {
        if (tenant.plan === 'premium') return acc + 29.90;
        if (tenant.plan === 'basic') return acc + 9.90;
        return acc;
    }, 0);

    return { totalUsers, totalStores, newUsersLast7Days, estimatedRevenue };
  }, [users, tenants]);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);
  
  const tenantsByOwner = useMemo(() => {
    return tenants.reduce((acc, tenant) => {
      if(tenant.ownerId) acc[tenant.ownerId] = tenant;
      return acc;
    }, {});
  }, [tenants]);

  if (loading) {
    return <PageWrapper><LoadingText>A carregar painel de controlo...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <Header>
        <Title>Painel Super Admin</Title>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          Sair
        </LogoutButton>
      </Header>
      
      <StatsGrid>
        <StatCard>
          <StatIcon color="#3498db"><FaUsers /></StatIcon>
          <StatInfo>
            <StatLabel>Total de Utilizadores</StatLabel>
            <StatValue>{dashboardStats.totalUsers}</StatValue>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#2ecc71"><FaStore /></StatIcon>
          <StatInfo>
            <StatLabel>Total de Lojas</StatLabel>
            <StatValue>{dashboardStats.totalStores}</StatValue>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#e67e22"><FaChartLine /></StatIcon>
          <StatInfo>
            <StatLabel>Novos Utilizadores (7d)</StatLabel>
            <StatValue>+{dashboardStats.newUsersLast7Days}</StatValue>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#1abc9c"><FaDollarSign /></StatIcon>
          <StatInfo>
            <StatLabel>Receita Mensal Estimada</StatLabel>
            <StatValue>R$ {dashboardStats.estimatedRevenue.toFixed(2).replace('.', ',')}</StatValue>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <Header style={{ marginTop: '2rem' }}>
        <Title as="h2" style={{ fontSize: '1.8rem' }}>Gestão de Utilizadores</Title>
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