import { useEffect, useState, } from 'react';
import './App.css'
import { getAllProducts, } from '../utils/products';
import Card from './components/card';
// import { data } from 'autoprefixer';



function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCartItems, setShowCartItems] = useState(false);

  useEffect(() => {
    fetchproducts();
  }, []);


  useEffect(() => {
    const itemsInCart = JSON.parse(localStorage.getItem("cart"));
    if (itemsInCart) {
      setCartItems([...itemsInCart]);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    };
  }, [cartItems]);

  const addCartItem = (item) => {
    const items = [...cartItems];
    const itemInd = items.findIndex((data) => data.id === item.id);
    console.log(itemInd);
    if (itemInd == -1) {
      items.push(item);
      setCartItems([...items]);
    };
  };
  const fetchproducts = async () => {
    const products = await getAllProducts();
    setProducts([...products]);
    console.log(products);

  };

  const iterateOn = showCartItems ? cartItems : products;

  return (
    <div className='container mx-auto my-10'>
      <div className=' fixed w-full bg-white h-[100px] top-0 flex items-center justify-center gap-10'>
        <h1 className="  text-4xl font-bold">
          Waseem Shop
        </h1>
        <h1 onClick={() => setShowCartItems(!showCartItems)}
          className='text-4xl font-bold underline cursor-pointer'>
          {showCartItems
            ? "Show All Products"
            : `Cart items ${cartItems.length}`}
        </h1>
      </div>
      {
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
                  { iterateOn.map((data) => {
                      const isAddedToCart =
                        cartItems.findIndex((product) => product.id === data.id) !== -1;
                      return (
                        <Card
                          addToCart={() => addCartItem(data)}
                          key={data.id}
                          item={data}
                          isAddedToCart={isAddedToCart}
                          showRemoveFromCart = {showCartItems === true}
                          removeFromCart = {()=>{
                            const allOtherItem = cartItems.filter((product)=>product.id !== data.id
                          );
                          setCartItems( [...allOtherItem] );
                          }}
                        />
                      );
                    })
                  }
          </div>
          </div>
        </section>
      }
    </div>

  );
};


export default App;
