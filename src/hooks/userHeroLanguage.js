// src/data/useHeroSliderData.js
import { useTranslation } from 'react-i18next';

export const useHeroSliderData = () => {
  const { t } = useTranslation();

  return [
    {
      headerText: t('heroSlider1'),
      img: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
    },
    {
      headerText: t('heroSlider2'), 
      img: 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
    },
    {
      headerText: t('heroSlider2'),
      img: 'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp',
    }
  ];
};