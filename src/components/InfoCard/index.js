import React from 'react';
import { Card, IconWrapper, Content, Title, Value, Description } from './styles';

export function InfoCard({ icon, title, value, description }) {
  return (
    <Card>
      <IconWrapper>{icon}</IconWrapper>
      <Content>
        <Title>{title}</Title>
        <Value>{value}</Value>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
}