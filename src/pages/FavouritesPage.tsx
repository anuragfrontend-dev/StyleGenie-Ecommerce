import Header from '../Header/Header'
import { FavouritesProducts } from '../components/FavouritesProducts';
import './FavouritesPage.css';
import { Dispatch, SetStateAction } from 'react';
import { Product } from '../types';

interface FavouritesPageProp {
  products: Product[];
  quantity: Record<number, number>;
  setQuantity: Dispatch<SetStateAction<Record<number, number>>>;
  addedMessageId: number | null;
  setAddedMessageId: Dispatch<SetStateAction<number | null>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export function FavouritesPage({ products, quantity, setQuantity,
  addedMessageId, setAddedMessageId, search, setSearch }: FavouritesPageProp) {

  return (
    <main className='container'>
      <Header
        search={search}
        setSearch={setSearch}
      />

      <section className='like-cart'>
        <FavouritesProducts
          products={products}
          quantity={quantity}
          setQuantity={setQuantity}
          addedMessageId={addedMessageId}
          setAddedMessageId={setAddedMessageId}
          search={search}
        />
      </section>
    </main>
  )
}