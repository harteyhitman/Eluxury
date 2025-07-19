import { StaticImageData } from 'next/image';
import watch from '../../../../public/card/diamond-watch.jpg'
import emerald from '../../../../public/card/diamond-necklace.jpg'
import briefcase from '../../../../public/card/briefcase.jpg'
import fountainPen from '../../../../public/card/fountain-pen.jpg'
import scarf from '../../../../public/card/scarf.jpg'
import cufflinks from '../../../../public/card/cufflinks.jpg'

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: StaticImageData | string;
  isLimitedEdition: boolean;
  isNew?: boolean;
  discountPercentage?: number;
}

export const featuredProducts: Product[] = [

  {
    id: 'prod-1',
    name: 'Platinum Diamond Watch',
    category: 'Watches',
    price: 125000,
    imageUrl: watch,
    isLimitedEdition: true,
    isNew: true
  },

  {
    id: 'prod-2',
    name: 'Emerald Gold Necklace',
    category: 'Jewelry',
    price: 85000,
    imageUrl: emerald,
    isLimitedEdition: true,
    discountPercentage: 15
  },

  {
    id: 'prod-3',
    name: 'Vintage Leather Briefcase',
    category: 'Accessories',
    price: 4200,
    imageUrl: briefcase,
    isLimitedEdition: true
  },
  {
    id: 'prod-4',
    name: 'Limited Edition Fountain Pen',
    category: 'Writing Instruments',
    price: 9800,
    imageUrl: fountainPen,
    isLimitedEdition: true,
    isNew: true
  },
  {
    id: 'prod-5',
    name: 'Silk Cashmere Scarf',
    category: 'Accessories',
    price: 3200,
    imageUrl: scarf,
    isLimitedEdition: false
  },
  {
    id: 'prod-6',
    name: 'Gold Cufflinks Set',
    category: 'Accessories',
    price: 6500,
    imageUrl: cufflinks,
    isLimitedEdition: false,
    discountPercentage: 10
  }

];