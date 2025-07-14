import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebaseConfig';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FaPrint } from 'react-icons/fa';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from '../../../contexts/AuthContext';

import {
  PageWrapper,
  SectionTitle,
  LoadingText,
  ReportsSection,
  MobileCardList,
  DesktopDataGrid,
  OrderCard,
  CardHeader,
  CustomerInfo,
  OrderTotal,
  StatusSelector,
  CardActionsContainer
} from './styles';


const DashboardOverviewPage = () => {
  const { tenant } = useAuth();

  const [orders, setOrders] = useState([]);
  // NOVO: Estado específico para os relatórios
  const [report, setReport] = useState(null);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingReport, setLoadingReport] = useState(true);

  const [selectedStatusTab, setSelectedStatusTab] = useState('Ativos');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- OTIMIZAÇÃO: Hook para buscar os relatórios pré-calculados ---
  useEffect(() => {
    if (!tenant?.id) {
      setLoadingReport(false);
      return;
    }
    const reportRef = doc(db, 'tenants', tenant.id, 'reports', 'summary');
    const unsubscribe = onSnapshot(reportRef, (doc) => {
      if (doc.exists()) {
        setReport(doc.data());
      } else {
        // Se não existir, define valores padrão para não quebrar a UI
        setReport({
          daily: { total: 0, count: 0 },
          weekly: { total: 0, count: 0 },
          monthly: { total: 0, count: 0 },
        });
      }
      setLoadingReport(false);
    });
    return () => unsubscribe();
  }, [tenant]);

  // --- Hook para buscar a lista de pedidos (em tempo real) ---
  useEffect(() => {
    if (!tenant?.id) {
      setLoadingOrders(false);
      return;
    }
    const ordersCollectionRef = collection(db, 'tenants', tenant.id, 'orders');
    const q = query(ordersCollectionRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setOrders(ordersData);
      setLoadingOrders(false);
    }, (error) => {
      console.error("Erro ao buscar pedidos:", error);
      toast.error("Erro ao carregar os pedidos.");
      setLoadingOrders(false);
    });

    return () => unsubscribe();
  }, [tenant]);


  const sendWhatsAppNotification = (phone, customerName, orderId) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    const storeName = tenant?.storeName || "a nossa loja";
    const message = `Olá, ${customerName}! Seu pedido #${orderId.substring(0, 5)} da ${storeName} saiu para entrega e chegará em breve! 🛵`;
    const whatsappLink = `https://wa.me/55${cleanedPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, '_blank');
    toast.success(`Notificação para ${customerName} pronta para envio!`);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    if (!tenant?.id) return toast.error("Não foi possível identificar a sua loja.");

    const orderDocRef = doc(db, 'tenants', tenant.id, 'orders', orderId);
    try {
      await updateDoc(orderDocRef, { status: newStatus });
      toast.success("Status do pedido atualizado!");

      if (newStatus === 'Saiu para Entrega') {
        const order = orders.find(o => o.id === orderId);
        if (order && order.phone) {
          sendWhatsAppNotification(order.phone, order.customerName, order.id);
        } else {
          toast.error("Cliente não possui telefone para notificar.");
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Falha ao atualizar o status.");
    }
  };

  const handlePrintOrder = (orderId) => {
    window.open(`/admin/print/order/${orderId}`, '_blank');
  };

  const columns = [
    { field: 'createdAt', headerName: 'Data', width: 170, valueGetter: (params) => params.row?.createdAt?.toDate() || null, renderCell: (params) => params.value ? params.value.toLocaleString('pt-BR') : 'N/A' },
    { field: 'customerName', headerName: 'Cliente', width: 200, flex: 1 },
    { field: 'grandTotal', headerName: 'Total', width: 130, type: 'number', renderCell: (params) => `R$ ${params.value?.toFixed(2).replace('.', ',') || '0,00'}` },
    {
      field: 'status', headerName: 'Status', width: 180,
      renderCell: (params) => (
        <StatusSelector
          value={params.value}
          onChange={(e) => handleUpdateOrderStatus(params.row.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="Pendente">Pendente</option>
          <option value="Em Preparo">Em Preparo</option>
          <option value="Saiu para Entrega">Saiu para Entrega</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </StatusSelector>
      )
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={(e) => { e.stopPropagation(); handlePrintOrder(params.row.id); }}
          style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#7c3aed', padding: '10px' }}
          aria-label="Imprimir Recibo"
        >
          <FaPrint size={20} />
        </button>
      ),
    },
    { field: 'id', headerName: 'ID Pedido', width: 150, renderCell: (params) => params.value.substring(0, 8) + '...' },
  ];

  const handleTabChange = (event, newValue) => { setSelectedStatusTab(newValue); };

  const filteredOrders = orders.filter(order => {
    if (selectedStatusTab === 'Todos') return true;
    if (selectedStatusTab === 'Ativos') return ['Pendente', 'Em Preparo', 'Saiu para Entrega'].includes(order.status);
    return order.status === selectedStatusTab;
  });

  return (
    <PageWrapper>
      <h1>Visão Geral do Dashboard</h1>
      <SectionTitle>Relatórios Rápidos</SectionTitle>
      {loadingReport ? (<LoadingText>A carregar relatórios...</LoadingText>) : (
        <ReportsSection>
          <h3>Resumo de Vendas</h3>
          {/* --- ALTERADO: Usar os dados do estado 'report' --- */}
          <div><h4>Hoje</h4><p>Vendas: <strong>R$ {report.daily.total.toFixed(2).replace('.', ',')}</strong></p><p>Pedidos: <strong>{report.daily.count}</strong></p></div>
          <div><h4>Esta Semana</h4><p>Vendas: <strong>R$ {report.weekly.total.toFixed(2).replace('.', ',')}</strong></p><p>Pedidos: <strong>{report.weekly.count}</strong></p></div>
          <div><h4>Este Mês</h4><p>Vendas: <strong>R$ {report.monthly.total.toFixed(2).replace('.', ',')}</strong></p><p>Pedidos: <strong>{report.monthly.count}</strong></p></div>
        </ReportsSection>
      )}

      <SectionTitle>Pedidos</SectionTitle>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 1, overflow: 'hidden' }}>
        <Tabs
          value={selectedStatusTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          allowScrollButtonsMobile
          centered={!isMobile}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={`Ativos (${orders.filter(o => ['Pendente', 'Em Preparo', 'Saiu para Entrega'].includes(o.status)).length})`} value="Ativos" />
          <Tab label={`Concluídos (${orders.filter(o => o.status === 'Concluído').length})`} value="Concluído" />
          <Tab label={`Cancelados (${orders.filter(o => o.status === 'Cancelado').length})`} value="Cancelado" />
          <Tab label={`Todos (${orders.length})`} value="Todos" />
        </Tabs>

        <DesktopDataGrid>
          <Box sx={{ height: 600, width: '100%', overflow: 'hidden' }}>
            <DataGrid
              rows={filteredOrders}
              columns={columns}
              initialState={{ columns: { columnVisibilityModel: { id: false } } }}
              pageSizeOptions={[5, 10, 20]}
              loading={loadingOrders}
              localeText={{ noRowsLabel: 'Nenhum pedido para exibir nesta categoria' }}
            />
          </Box>
        </DesktopDataGrid>

        <MobileCardList>
          {loadingOrders ? <LoadingText>A carregar pedidos...</LoadingText> : (
            filteredOrders.length > 0 ? filteredOrders.map(order => (
              <OrderCard key={order.id}>
                <CardHeader>
                  <CustomerInfo><h4>{order.customerName}</h4><span>{order.createdAt?.toDate().toLocaleString('pt-BR') || 'Data indisponível'}</span></CustomerInfo>
                  <OrderTotal>R$ {order.grandTotal?.toFixed(2).replace('.', ',') || '0,00'}</OrderTotal>
                </CardHeader>
                <CardActionsContainer>
                  <StatusSelector value={order.status} onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em Preparo">Em Preparo</option>
                    <option value="Saiu para Entrega">Saiu para Entrega</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </StatusSelector>
                  <button onClick={() => handlePrintOrder(order.id)} className="print-button"><FaPrint size={18} /></button>
                </CardActionsContainer>
              </OrderCard>
            )) : <LoadingText>Nenhum pedido para exibir nesta categoria</LoadingText>
          )}
        </MobileCardList>
      </Box>
    </PageWrapper>
  );
};

export default DashboardOverviewPage;