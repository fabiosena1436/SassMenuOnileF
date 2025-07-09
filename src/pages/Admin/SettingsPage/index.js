// Arquivo: src/pages/Admin/SettingsPage/index.js (Versão Final e Completa)

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';

import {
  PageWrapper, SectionTitle, LoadingText, SettingsBlock,
  Form, FormGroup, CurrentValueDisplay, ActionButtons, SettingsGrid
} from './styles';

const SettingsPage = () => {
  const { tenant, loading: authLoading } = useAuth();

  // Estados locais para controlar os campos de edição
  const [editData, setEditData] = useState({
    storeName: '',
    deliveryFee: '', 
    openingHoursText: '', 
    logoUrl: '', 
    bannerUrl: '',
    whatsapp: '', 
    instagram: '', 
    address: '', 
    pixKey: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Popula os campos de edição quando os dados do lojista são carregados
  useEffect(() => {
    if (tenant) {
      setEditData({
        storeName: tenant.storeName ?? '',
        deliveryFee: tenant.deliveryFee?.toString() ?? '0',
        openingHoursText: tenant.openingHoursText ?? '',
        logoUrl: tenant.logoUrl ?? '',
        bannerUrl: tenant.bannerUrl ?? '',
        whatsapp: tenant.whatsapp ?? '',
        instagram: tenant.instagram ?? '',
        address: tenant.address ?? '',
        pixKey: tenant.pixKey ?? ''
      });
    }
  }, [tenant]);

  // Função genérica para lidar com a mudança nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  // Função genérica para atualizar/remover configurações
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
  
  // Função para lidar com o submit dos formulários
  const handleSubmit = (e, field, value) => {
    e.preventDefault();
    let data = {};
    if(field === 'deliveryFee') {
        const feeValue = parseFloat(value);
        if (isNaN(feeValue) || feeValue < 0) return toast.error('Valor inválido para taxa.');
        data[field] = feeValue;
    } else {
        data[field] = value.trim();
    }
    handleUpdateSetting(data, 'Configuração salva com sucesso!');
  };

  // Função para remover um campo
  const handleRemove = (field, name) => {
    if(!window.confirm(`Tem a certeza que quer remover ${name}?`)) return;
    handleUpdateSetting({ [field]: deleteField() }, `${name} removido com sucesso!`);
  }
  
  if (authLoading || !tenant) {
    return <PageWrapper><LoadingText>A carregar configurações...</LoadingText></PageWrapper>;
  }

  return (
    <PageWrapper>
      <h1>Configurações da Loja</h1>

      <SectionTitle>Informações Gerais</SectionTitle>
      <SettingsBlock>
          <CurrentValueDisplay>
              <h4>Nome da Loja Atual</h4>
              <p>{tenant.storeName || <span className="no-value">Não definido</span>}</p>
          </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'storeName', editData.storeName)}>
            <FormGroup>
              <label>Editar Nome da Loja:</label>
              <input type="text" name="storeName" value={editData.storeName} onChange={handleInputChange}/>
            </FormGroup>
            <ActionButtons>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar Nome'}</Button>
            </ActionButtons>
          </Form>
      </SettingsBlock>

      <SectionTitle>Identidade Visual</SectionTitle>
      <SettingsGrid>
        <SettingsBlock>
          <CurrentValueDisplay>
            <h4>Logo Atual</h4>
            {tenant.logoUrl ? <img src={tenant.logoUrl} alt="Logo atual" style={{maxWidth: '150px', maxHeight: '100px', objectFit: 'contain'}}/> : <p className="no-value">Nenhuma logo definida</p>}
          </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'logoUrl', editData.logoUrl)}>
            <FormGroup>
              <label>URL da nova Logo:</label>
              <input type="text" name="logoUrl" value={editData.logoUrl} onChange={handleInputChange} placeholder="https://servidor.com/sua-logo.png" />
            </FormGroup>
            <ActionButtons>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar Logo'}</Button>
              {tenant.logoUrl && <Button type="button" variant="danger" onClick={() => handleRemove('logoUrl', 'a Logo')}>Remover</Button>}
            </ActionButtons>
          </Form>
        </SettingsBlock>
        <SettingsBlock>
          <CurrentValueDisplay>
            <h4>Banner Atual</h4>
            {tenant.bannerUrl ? <img src={tenant.bannerUrl} alt="Banner atual" style={{width: '100%', objectFit: 'cover', borderRadius: '8px'}}/> : <p className="no-value">Nenhum banner definido</p>}
          </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'bannerUrl', editData.bannerUrl)}>
            <FormGroup>
              <label>URL do novo Banner:</label>
              <input type="text" name="bannerUrl" value={editData.bannerUrl} onChange={handleInputChange} placeholder="https://servidor.com/seu-banner.jpg" />
            </FormGroup>
             <ActionButtons>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar Banner'}</Button>
              {tenant.bannerUrl && <Button type="button" variant="danger" onClick={() => handleRemove('bannerUrl', 'o Banner')}>Remover</Button>}
            </ActionButtons>
          </Form>
        </SettingsBlock>
      </SettingsGrid>
      
      <SectionTitle>Pagamento e Entrega</SectionTitle>
      <SettingsGrid>
        <SettingsBlock>
          <CurrentValueDisplay>
              <h4>Chave PIX Atual</h4>
              <p>{tenant.pixKey || <span className="no-value">Nenhuma</span>}</p>
          </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'pixKey', editData.pixKey)}>
            <FormGroup><label>Editar Chave PIX:</label><input type="text" name="pixKey" value={editData.pixKey} onChange={handleInputChange}/></FormGroup>
            <ActionButtons>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar Chave PIX'}</Button>
                {tenant.pixKey && <Button type="button" variant="danger" onClick={() => handleRemove('pixKey', 'a Chave PIX')}>Remover</Button>}
            </ActionButtons>
          </Form>
        </SettingsBlock>
        <SettingsBlock>
            <CurrentValueDisplay>
                <h4>Taxa de Entrega Atual</h4>
                <p>R$ {(tenant.deliveryFee || 0).toFixed(2).replace('.', ',')}</p>
            </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'deliveryFee', editData.deliveryFee)}>
            <FormGroup><label>Editar Taxa de Entrega (R$):</label><input type="number" name="deliveryFee" value={editData.deliveryFee} onChange={handleInputChange} step="0.01" min="0" /></FormGroup>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar Taxa'}</Button>
          </Form>
        </SettingsBlock>
      </SettingsGrid>

      <SectionTitle>Informações de Contato</SectionTitle>
       <SettingsGrid>
        <SettingsBlock>
            <CurrentValueDisplay>
                <h4>WhatsApp para Pedidos</h4>
                <p>{tenant.whatsapp || <span className="no-value">Não definido</span>}</p>
            </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'whatsapp', editData.whatsapp)}>
            <FormGroup><label>Editar WhatsApp (só números com DDD):</label><input type="tel" name="whatsapp" value={editData.whatsapp} onChange={handleInputChange} placeholder="5518999998888" /></FormGroup>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar WhatsApp'}</Button>
          </Form>
        </SettingsBlock>
        <SettingsBlock>
          <CurrentValueDisplay>
              <h4>Instagram</h4>
              <p>{tenant.instagram || <span className="no-value">Não definido</span>}</p>
          </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'instagram', editData.instagram)}>
            <FormGroup><label>Editar Instagram (link completo):</label><input type="text" name="instagram" value={editData.instagram} onChange={handleInputChange} placeholder="https://instagram.com/seu-perfil"/></FormGroup>
            <ActionButtons>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar Instagram'}</Button>
                {tenant.instagram && <Button type="button" variant="danger" onClick={() => handleRemove('instagram', 'o Instagram')}>Remover</Button>}
            </ActionButtons>
          </Form>
        </SettingsBlock>
      </SettingsGrid>
       <SettingsBlock style={{ gridColumn: '1 / -1' }}> {/* Ocupa a largura toda */}
          <CurrentValueDisplay>
              <h4>Endereço da Loja</h4>
              <p>{tenant.address || <span className="no-value">Não definido</span>}</p>
          </CurrentValueDisplay>
          <Form onSubmit={(e) => handleSubmit(e, 'address', editData.address)}>
            <FormGroup><label>Editar Endereço Completo:</label><input type="text" name="address" value={editData.address} onChange={handleInputChange} placeholder="Rua Exemplo, 123, Bairro - Cidade, SP" /></FormGroup>
            <ActionButtons>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'A salvar...' : 'Salvar Endereço'}</Button>
                {tenant.address && <Button type="button" variant="danger" onClick={() => handleRemove('address', 'o Endereço')}>Remover</Button>}
            </ActionButtons>
          </Form>
        </SettingsBlock>

    </PageWrapper>
  );
};

export default SettingsPage;