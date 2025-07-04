// Ficheiro: src/utils/slugify.js

export const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD') // Normaliza para decompor acentos
      .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
      .trim()
      .replace(/\s+/g, '-') // Substitui espaços por -
      .replace(/[^\w-]+/g, '') // Remove todos os caracteres que não são palavras ou hífens
      .replace(/--+/g, '-'); // Substitui múltiplos hífens por um único
  };