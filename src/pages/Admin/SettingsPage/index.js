// Arquivo: src/pages/Admin/SettingsPage/index.js

import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import { db } from '../../../services/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext'; // Usaremos o useAuth para obter o tenant

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
  const { tenant, loading: authLoading } = useAuth(); // Obtemos o tenant e o estado de loading

  // Estados locais para os campos do formulário
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState('0');
  const [openingHoursText, setOpeningHoursText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [address, setAddress] = useState('');
  const [pixKey, setPixKey] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quando o tenant é carregado, preenchemos o formulário com os dados guardados
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

  // Função genérica para atualizar as configurações
  const handleUpdateSettings = async (dataToUpdate) => {
    if (!tenant?.id) {
      toast.error("Não foi possível identificar a sua loja.");
      return;
    }
    setIsSubmitting(true);
    try {
      const tenantDocRef = doc(db, 'tenants', tenant.id);
      await updateDoc(tenantDocRef, dataToUpdate);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error);
      toast.error("Falha ao salvar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Função para salvar todas as configurações de uma vez
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const feeValue = parseFloat(deliveryFee);
    if (isNaN(feeValue) || feeValue < 0) {
      toast.error('Valor inválido para taxa de entrega.'); return;
    }
    
    handleUpdateSettings({
      isStoreOpen,
      deliveryFee: feeValue,
      openingHoursText,
      logoUrl,
      bannerUrl,
      whatsapp,
      instagram,
      address,
      pixKey
    });
  };

  if (authLoading) {
    return <PageWrapper><LoadingText>Carregando configurações...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <h1>Configurações da Loja</h1>
      <Form onSubmit={handleFormSubmit}>
        
        <SettingsBlock>
          <SectionTitle>Status e Horários</SectionTitle>
          <StatusDisplay isOpen={isStoreOpen}>
            Status Atual: {isStoreOpen ? 'ABERTA' : 'FECHADA'}
          </StatusDisplay>
          <Button type="button" onClick={() => setIsStoreOpen(!isStoreOpen)} style={{ marginBottom: '20px' }}>
            {isStoreOpen ? 'FECHAR LOJA' : 'ABRIR LOJA'}
          </Button>

          <FormGroup>
            <label htmlFor="hoursText">Texto do Horário de Funcionamento:</label>
            <textarea id="hoursText" value={openingHoursText} onChange={(e) => setOpeningHoursText(e.target.value)} placeholder="Ex: Seg a Sex: 18h - 23h&#10;Sáb e Dom: 18h - 00h" />
          </FormGroup>
        </SettingsBlock>

        <SettingsBlock>
          <SectionTitle>Identidade Visual</SectionTitle>
           <SettingsGrid>
              <FormGroup>
                <label htmlFor="logoUrl">URL da Logo:</label>
                <input type="text" id="logoUrl" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://servidor.com/sua-logo.png" />
                {logoUrl && <img src={logoUrl} alt="Pré-visualização do logo" />}
              </FormGroup>
              <FormGroup>
                <label htmlFor="bannerUrl">URL do Banner da Página Inicial:</label>
                <input type="text" id="bannerUrl" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} placeholder="https://servidor.com/seu-banner.jpg" />
                {bannerUrl && <img src={bannerUrl} alt="Pré-visualização do banner" />}
              </FormGroup>
           </SettingsGrid>
        </SettingsBlock>

        <SettingsBlock>
          <SectionTitle>Contato e Redes Sociais</SectionTitle>
          <SettingsGrid>
            <FormGroup>
              <label htmlFor="whatsapp">WhatsApp (só números com código do país):</label>
              <input id="whatsapp" type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Ex: 5511999998888" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="instagram">Instagram (só o usuário):</label>
              <input id="instagram" type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Ex: seuusuario" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="address">Endereço Completo:</label>
              <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ex: Rua Exemplo, 123, Bairro, Cidade - SP" />
            </FormGroup>
          </SettingsGrid>
        </SettingsBlock>
        
        <SettingsBlock>
          <SectionTitle>Pagamento e Entrega</SectionTitle>
          <SettingsGrid>
            <FormGroup>
              <label htmlFor="pixKey">Chave PIX:</label>
              <input type="text" id="pixKey" value={pixKey} onChange={(e) => setPixKey(e.target.value)} placeholder="Sua chave PIX" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="deliveryFee">Taxa de Entrega (R$):</label>
              <input type="number" id="deliveryFee" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} placeholder="Ex: 5.00" step="0.01" min="0" />
            </FormGroup>
          </SettingsGrid>
        </SettingsBlock>

        <Button type="submit" disabled={isSubmitting} style={{ marginTop: '20px' }}>
          {isSubmitting ? 'Salvando...' : 'Salvar Todas as Configurações'}
        </Button>
      </Form>
    </PageWrapper>
  );
};

export default SettingsPage;