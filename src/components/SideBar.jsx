import './SideBar.css'

export function SideBar({ handleCategories,categoriesActive }) {
  

  return (
    <div className="side-bar">
      <div className="porular-text-container">
        <div className='popular-text'>Popular</div>
      </div>
      <div className="categorie-items">
        <button className={`side-bar-categorie ${categoriesActive==='sports-accessories'? 'categoryActive':''}`} 
        onClick={() => {
          handleCategories('sports-accessories');
        }}>
          <div className='side-bar-profile'>
            <img src="toy.webp" />
          </div>
           Toys
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='groceries'? 'categoryActive':''}`}
          onClick={()=>{
            handleCategories('groceries');
          }}>
          <div className='side-bar-profile'>
            <img src="food.webp" />
          </div>
          Foods
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='smartphones'? 'categoryActive':''}`}
          onClick={() => {
            handleCategories('smartphones');
          }}>
          <div className='side-bar-profile'>
            <img src="smart-phone.webp" />
          </div>
          Phone
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='mens-shirts'? 'categoryActive':''}`}
          onClick={() => {
            handleCategories('mens-shirts');
          }}>
          <div className='side-bar-profile'>
            <img src="men.webp"  />
          </div>
          Men
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='mens-shoes'? 'categoryActive':''}`}
          onClick={() => {
            handleCategories('mens-shoes');
          }}>
          <div className='side-bar-profile'>
            <img src="mens-shoes.webp"  />
          </div>
          Shoes
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='fragrances'? 'categoryActive':''}`}
          onClick={()=>{
            handleCategories('fragrances');
          }}>
          <div className='side-bar-profile'>
            <img src="fragrances.webp"  />
          </div>
          Perfume
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='laptops'? 'categoryActive':''}`}
          onClick={() => {
            handleCategories('laptops');
          }}>
          <div className='side-bar-profile'>
            <img src="laptop.webp" />
          </div>
          Laptop
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='mens-watches'? 'categoryActive':''}`} 
          onClick={()=>{
            handleCategories('mens-watches');
          }}>
          <div className='side-bar-profile'>
            <img src="watch.webp" />
          </div>
          Watch
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='skin-care'? 'categoryActive':''}`} 
          onClick={()=>{
            handleCategories('skin-care');
          }}>
          <div className='side-bar-profile'>
            <img src="skin-care.webp" />
          </div>
          Skin-care
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='womens-dresses'? 'categoryActive':''}`} 
          onClick={()=>{
            handleCategories('womens-dresses');
          }}>
          <div className='side-bar-profile'>
            <img src="women.webp" />
          </div>
          Women
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='kitchen-accessories'? 'categoryActive':''}`}
          onClick={()=>{
            handleCategories('kitchen-accessories');
          }}>
          <div className='side-bar-profile'>
            <img src="kitchen.webp" />
          </div>
          Kitchen
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='furniture'? 'categoryActive':''}`}
          onClick={()=>{
            handleCategories('furniture');
          }}>
          <div className='side-bar-profile'>
            <img src="furniture.webp" />
          </div>
          Furniture
        </button>
      </div>
    </div>
  )
}