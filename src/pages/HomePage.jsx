import { useState } from 'react';
import Header from '../Header/Header';
import { DisplayProduct } from '../components/DisplayProduct';
import { DisplayRange } from '../components/DisplayRange';
import { SideBar } from '../components/SideBar';

export function HomePage({products,displayProducts,setDisplayProducts,
 setQuantity,quantity,addedMessageId,setAddedMessageId,search,setSearch}) {
  
  const[categoriesActive,setCategoriesActive]=useState('');
  const[activeRange,setActiveRange]=useState('all');
  
  const handleCategories=(categorie)=>{
    if(categorie===categoriesActive){
      setCategoriesActive('all');
      setDisplayProducts(products);
      return;
    }

    setCategoriesActive(categorie);

    if(categorie==='all'){
      setDisplayProducts(products);
    }
    else{
      const filtered = products.filter((product)=>{
        return(product.category===categorie)
      })
      setDisplayProducts(filtered)
      setActiveRange('all');
    }
  }
  
  const handleRange=(min,max)=>{
    const filtered= products.filter((product)=>{
      const priceInINR=product.price*95;
      return(
       priceInINR>=min && priceInINR<=max
      )
    });
    setDisplayProducts(filtered);
    setCategoriesActive('all');
  }

  const handleAllFilter=()=>{
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
        handleCategories={handleCategories}
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