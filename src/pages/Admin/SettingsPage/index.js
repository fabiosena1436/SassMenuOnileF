// Arquivo: src/pages/Admin/SettingsPage/index.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';

import {
  PageWrapper,
  SectionTitle,
  Form,
  FormGroup,
  LoadingText,
  StatusDisplay,
  SettingsBlock,
  SettingsGrid
} from './styles';

const SettingsPage = () => {
  const { tenant, loading: authLoading } = useAuth();

  // Estados locais para os campos do formulário
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState('');
  const [openingHoursText, setOpeningHoursText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [address, setAddress] = useState('');
  const [pixKey, setPixKey] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Popula os campos quando os dados do lojista são carregados
  useEffect(() => {
    if (tenant) {
      setIsStoreOpen(tenant.isStoreOpen ?? true);
      setDeliveryFee(tenant.deliveryFee?.toString() ?? '0');
      setOpeningHoursText(tenant.openingHoursText ?? '');
      setLogoUrl(tenant.logoUrl ?? '');
      setBannerUrl(tenant.bannerUrl ?? '');
      setWhatsapp(tenant.whatsapp ?? '');
      setInstagram(tenant.instagram ?? '');
      setAddress(tenant.address ?? '');
      setPixKey(tenant.pixKey ?? '');
    }
  }, [tenant]);

  // Função genérica para atualizar qualquer configuração no documento do lojista
  const handleUpdateSetting = async (dataToUpdate, successMessage) => {
    if (!tenant?.id) return toast.error("Não foi possível encontrar os dados da sua loja.");

    setIsSubmitting(true);
    try {
      const tenantDocRef = doc(db, 'tenants', tenant.id);
      await updateDoc(tenantDocRef, dataToUpdate);
      toast.success(successMessage || 'Configuração salva!');
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar.");
      console.error("Erro ao atualizar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStoreStatus = () => {
    const newStatus = !isStoreOpen;
    setIsStoreOpen(newStatus); // Atualiza o estado local para feedback imediato
    handleUpdateSetting({ isStoreOpen: newStatus }, `Loja marcada como ${newStatus ? 'ABERTA' : 'FECHADA'}.`);
  };
  
  // Função de HOF (Higher-Order Function) para simplificar os handlers de submit
  const handleSubmit = (handler) => (e) => {
    e.preventDefault();
    handler();
  };
  
  if (authLoading || !tenant) {
    return <PageWrapper><LoadingText>A carregar configurações...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <h1>Configurações da Loja</h1>

      <SectionTitle>Status e Horários</SectionTitle>
      <SettingsBlock>
        <StatusDisplay $isOpen={isStoreOpen}>
          Status Atual da Loja: {isStoreOpen ? 'ABERTA' : 'FECHADA'}
        </StatusDisplay>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>Quando a loja está fechada, os clientes não podem finalizar pedidos.</p>
        <Button onClick={handleToggleStoreStatus} disabled={isSubmitting} style={{ backgroundColor: isStoreOpen ? '#f59e0b' : '#22c55e', marginTop: '10px' }}>
          {isStoreOpen ? 'FECHAR LOJA' : 'ABRIR LOJA'}
        </Button>
        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />
        <Form onSubmit={handleSubmit(() => handleUpdateSetting({ openingHoursText }, 'Horário de funcionamento salvo!'))}>
          <FormGroup>
            <label>Texto de Horário de Funcionamento (visível para o cliente):</label>
            <textarea value={openingHoursText} onChange={(e) => setOpeningHoursText(e.target.value)} placeholder="Ex: Seg a Sex: 18h - 23h&#10;Sáb e Dom: 18h - 00h" />
          </FormGroup>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Horário'}</Button>
        </Form>
      </SettingsBlock>
      
      <SectionTitle>Identidade Visual</SectionTitle>
      <SettingsGrid>
        <Form onSubmit={handleSubmit(() => handleUpdateSetting({ logoUrl: logoUrl.trim() }, 'URL da Logo salva!'))}>
          <FormGroup>
            <label>URL da Logo:</label>
            <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://servidor.com/sua-logo.png" />
            {logoUrl && <img src={logoUrl} alt="Pré-visualização do logo" />}
          </FormGroup>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Logo'}</Button>
        </Form>
        <Form onSubmit={handleSubmit(() => handleUpdateSetting({ bannerUrl: bannerUrl.trim() }, 'URL do Banner salvo!'))}>
          <FormGroup>
            <label>URL do Banner da Página Inicial:</label>
            <input type="text" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} placeholder="https://servidor.com/seu-banner.jpg" />
            {bannerUrl && <img src={bannerUrl} alt="Pré-visualização do banner" />}
          </FormGroup>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Banner'}</Button>
        </Form>
      </SettingsGrid>

      <SectionTitle>Contato e Redes Sociais</SectionTitle>
      <Form onSubmit={handleSubmit(() => handleUpdateSetting({ whatsapp: whatsapp.trim(), instagram: instagram.trim(), address: address.trim() }, 'Informações de contato salvas!'))}>
        <FormGroup>
          <label>WhatsApp (só números com código do país)</label>
          <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Ex: 5511999998888" />
        </FormGroup>
        <FormGroup>
          <label>Instagram (só o usuário, sem @)</label>
          <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Ex: seuusuario" />
        </FormGroup>
        <FormGroup>
          <label>Endereço</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ex: Rua Exemplo, 123, Bairro, Cidade - SP" />
        </FormGroup>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Informações de Contato'}</Button>
      </Form>
      
      <SectionTitle>Pagamento e Entrega</SectionTitle>
      <SettingsGrid>
        <Form onSubmit={handleSubmit(() => handleUpdateSetting({ pixKey: pixKey.trim() }, 'Chave PIX atualizada!'))}>
          <FormGroup>
            <label>Chave PIX:</label>
            <input type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)} placeholder="Sua chave PIX" />
          </FormGroup>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Chave PIX'}</Button>
        </Form>
        <Form onSubmit={handleSubmit(() => {
            const feeValue = parseFloat(deliveryFee);
            if (isNaN(feeValue) || feeValue < 0) {
              return toast.error('Valor inválido para taxa.');
            }
            handleUpdateSetting({ deliveryFee: feeValue }, 'Taxa de entrega atualizada!');
        })}>
          <FormGroup>
            <label>Taxa de Entrega (R$):</label>
            <input type="number" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} placeholder="Ex: 5.00" step="0.01" min="0" />
          </FormGroup>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Taxa de Entrega'}</Button>
        </Form>
      </SettingsGrid>
    </PageWrapper>
  );
};

export default SettingsPage;