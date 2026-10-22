import { useState } from 'react';
import Header from '../Header/Header';
import { DisplayProduct } from '../components/DisplayProduct';
import { DisplayRange } from '../components/DisplayRange';
import { SideBar } from '../components/SideBar';
import { Dispatch, SetStateAction } from 'react';
import { Product } from '../types';

interface HomePageProps {
  products: Product[];
  displayProducts: Product[];
  setDisplayProducts: Dispatch<SetStateAction<Product[]>>;
  setQuantity: Dispatch<SetStateAction<Record<number, number>>>;
  quantity: Record<number, number>;
  addedMessageId: number | null;
  setAddedMessageId: Dispatch<SetStateAction<number | null>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}


export function HomePage({ products, displayProducts, setDisplayProducts,
  setQuantity, quantity, addedMessageId, setAddedMessageId, search, setSearch }: HomePageProps) {

  const [categoriesActive, setCategoriesActive] = useState<string>('');
  const [activeRange, setActiveRange] = useState<string>('all');

  const handleCategories = (category: string) => {
    if (category === categoriesActive) {
      setCategoriesActive('all');
      setDisplayProducts(products);
      return;
    }

    setCategoriesActive(category);

    if (category === 'all') {
      setDisplayProducts(products);
    }
    else {
      const filtered = products.filter((product) => {
        return (product.category === category)
      })
      setDisplayProducts(filtered)
      setActiveRange('all');
    }
  }

  const handleRange = (min: number, max: number) => {
    const filtered = products.filter((product) => {
      const priceInINR = product.price * 95;
      return (
        priceInINR >= min && priceInINR <= max
      )
    });
    setDisplayProducts(filtered);
    setCategoriesActive('all');
  }

  const handleAllFilter = () => {
    setDisplayProducts(products);
  }

  return (
    <main className='container'>
      <Header
        search={search}
        setSearch={setSearch}
      />
      <DisplayRange
        handleAllFilter={handleAllFilter}
        handleRange={handleRange}
        setCategoriesActive={setCategoriesActive}
        activeRange={activeRange}
        setActiveRange={setActiveRange}
      />
      <SideBar
        handleCategories={handleCategories}
        categoriesActive={categoriesActive}
      />
      <section className="cart-container">
        <DisplayProduct
          displayProducts={displayProducts}
          setQuantity={setQuantity}
          quantity={quantity}
          setAddedMessageId={setAddedMessageId}
          addedMessageId={addedMessageId}
          search={search}
        />
      </section>
    </main>
  )
}