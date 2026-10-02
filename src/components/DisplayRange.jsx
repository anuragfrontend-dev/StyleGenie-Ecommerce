import './DisplayRange.css'

export function DisplayRange({handleAllFilter,handleRange,
  setCategoriesActive,setActiveRange,activeRange}) {
  
  
  return (
    <div className="range-container">
    <button className={`range ${activeRange==='all'? 'active':''}`} 
      onClick={()=>{
        handleAllFilter();
        setActiveRange('all');
        setCategoriesActive('all');
        }}>
      All
    </button>
    <button className={`range ${activeRange==='0-2000'? 'active':''}`} 
      onClick={()=>{
        handleRange(0 , 2000)
        setActiveRange('0-2000')
      }}>
        ₹0 - ₹2,000
      </button>
    <button className={`range ${activeRange==='2000-5000'? 'active':''}`}  
      onClick={()=>{
        handleRange(2000 , 5000);
        setActiveRange('2000-5000');
      }}>
        ₹2,000 - ₹5,000
    </button>
    <button className={`range ${activeRange==='5000-10000'? 'active':''}`}  
      onClick={()=>{
        handleRange(5000 , 10000);
        setActiveRange('5000-10000');
        }}>
          ₹5,000 - ₹10,000
    </button>
    <button className={`range ${activeRange==='10000-50000'? 'active':''}`}  
      onClick={()=>{
        handleRange(10000 , 50000);
        setActiveRange('10000-50000');
        }}>
        ₹10,000 - ₹50,000
    </button>
    <button className={`range ${activeRange==='50000-100000'? 'active':''}`}  
      onClick={()=>{
        handleRange(50000 , 100000);
        setActiveRange('50000-100000');
        }}>
          ₹50,000 - ₹100,000
    </button>
    <button className={`range ${activeRange==='100000-500000'? 'active':''}`}  
      onClick={()=>{
        handleRange(100000 , 500000);
        setActiveRange('100000-500000');
        }}>
          ₹100,000 - ₹500,000
    </button>
    <button className={`range ${activeRange==='500000-1000000'? 'active':''}`}  
      onClick={()=>{
        handleRange(500000 , 1000000);
        setActiveRange('500000-1000000');
        }}>
          ₹500,000 - ₹1,000,000
    </button>
    </div>
  )
}

