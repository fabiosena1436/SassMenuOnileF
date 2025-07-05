// Arquivo: src/components/Footer/index.js

import React from 'react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { useStore } from '../../contexts/StoreContext';

import {
  FooterContainer,
  FooterContent,
  InfoSection,
  SocialLinks,
  SocialLink,
  Copyright,
  InfoItem
} from './styles';

const Footer = () => {
  const store = useStore();

  if (!store) {
    return null;
  }

  const { storeName, whatsapp, instagram, address } = store;

  return (
    <FooterContainer>
      <FooterContent>
        <InfoSection>
          <h3>{storeName}</h3>
          {address && (
            <InfoItem>
              <FaMapMarkerAlt />
              <span>{address}</span>
            </InfoItem>
          )}
        </InfoSection>
        <SocialLinks>
          {whatsapp && (
            <SocialLink
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </SocialLink>
          )}
          {instagram && (
            <SocialLink
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialLink>
          )}
        </SocialLinks>
      </FooterContent>
      <Copyright>
        &copy; {new Date().getFullYear()} {storeName}. Todos os direitos reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;