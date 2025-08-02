// import React, { useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { useNavigate } from 'react-router-dom';
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import RandomProductsDisplay from '../components/RandomProductsDisplay';
// import AvailableProductsDisplay from '../components/AvailableProductsDisplay';
// import LatestProductsDisplay from '../components/LatestProductsDisplay';
// import { ChevronRight } from 'lucide-react';
// import Divider from '../components/Divider';
// import pik from '../assets/pik.png';
// import ScrollableCards from '../pages/ScrollableCards';
// import '../pagescss/Home.css';

// const Home = () => {
//   const loadingCategory = useSelector(state => state.product.loadingCategory);
//   const categoryData = useSelector(state => state.product.allCategory);
//   const subCategoryData = useSelector(state => state.product.allSubCategory);
//   const navigate = useNavigate();
//   const randomProductsRef = useRef(null);

//   const scrollToRandomProducts = () => {
//     if (randomProductsRef.current) {
//       randomProductsRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleRedirectProductListpage = (id, cat) => {
//     const subcategory = subCategoryData.find(sub =>
//       sub.category.some(c => c._id === id)
//     );
//     if (subcategory) {
//       const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
//       navigate(url);
//     }
//   };

//   return (
//     <section className="home-section">
//       <div className="home-container">
//         <div className="home-hero-container">
//           <div className="home-hero-content">
//             <div className="home-hero-row">
//               {/* Text Content */}
//               <div className="home-text-content">
//                 <h1 className="home-title">
//                   Welcome to the 3DMMP
//                 </h1>
//                 <p className="home-description">
//                   "Whether you're a developer, architect, or creative studio, our platform is your one-stop destination for a curated collection of premium and free 3D content."
//                 </p>

//                 <div className="home-cta-container">
//                   <button
//                     className="home-cta-button"
//                     onClick={scrollToRandomProducts}
//                   >
//                     GET STARTED
//                   </button>
//                   <ScrollableCards />
//                 </div>
//               </div>

//               {/* Image Section */}
//               <div className="home-image-container">
//                 <img 
//                   src={pik} 
//                   alt="3D Model Showcase" 
//                   className="home-hero-image"
//                 />
//               </div>
//             </div>
//           </div>
          
//           <Divider/>
          
//           <div ref={randomProductsRef}>
//             <RandomProductsDisplay count={50} />
//             <Divider/>
//           </div>
          
//           <LatestProductsDisplay />
//           <Divider/>
          
//           <AvailableProductsDisplay count={10} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import RandomProductsDisplay from '../components/RandomProductsDisplay';
import AvailableProductsDisplay from '../components/AvailableProductsDisplay';
import LatestProductsDisplay from '../components/LatestProductsDisplay';
import { ChevronRight } from 'lucide-react';
import Divider from '../components/Divider';
import pik from '../assets/pik.png';
import ScrollableCards from '../pages/ScrollableCards';
import '../pagescss/Home.css';
import Division from '../components/Division';


const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();
  const randomProductsRef = useRef(null);

const scrollToRandomProducts = () => {
  window.scrollBy({
    top: 650, // Scrolls 500px downward
    left: 0,
    behavior: 'smooth'
  });
};


  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === id)
    );
    if (subcategory) {
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
      navigate(url);
    }
  };

  return (
    <section className="home-section">
      <div className="home-container">
        <div className="home-hero-container">
          <div className="home-hero-content">
            <div className="home-hero-row">
              {/* Text Content */}
              <div className="home-text-content">
                <h1 className="home-title">
                  Welcome to the 3DMMP
                </h1>
                <p className="home-description">
                  "Whether you're a developer, architect, or creative studio, our platform is your one-stop destination for a curated collection of premium and free 3D content."
                </p>

                <div className="home-cta-container">
                  <button
                    className="home-cta-button"
                    onClick={scrollToRandomProducts}
                  >
                    GET STARTED
                  </button>
                  <ScrollableCards />
                </div>
              </div>

              {/* Image Section */}
              {/* <div className="home-image-container">
                <img 
                  src={pik} 
                  alt="3D Model Showcase" 
                  className="home-hero-image"
                />
              </div> */}
            <div className="home-model-container">
  <div style={{ maxWidth: '800px', width: '100%' }}>
    {/* <model-viewer
      src="/assets/models/scene.gltf"
      alt="My 3D model"
      auto-rotate
      camera-controls
      ar
      camera-orbit="0deg 75deg 1.8m"   // Optional zoom tweak
      field-of-view="29deg"           // Optional zoom tweak
      style={{ width: '100%', height: '500px', borderRadius: '10px' }}
    ></model-viewer> */}
   <model-viewer
  src="/assets/models/scene.gltf"
  alt="Car Model"
  auto-rotate
  camera-controls
  camera-orbit="0deg 65deg 2.8m" 
  field-of-view="22deg"
  style={{ width: '100%', height: '500px', borderRadius: '10px' }}
></model-viewer>


  </div>
</div>  

            </div>
          </div>
          
          <Divider/>
          
          <div ref={randomProductsRef}>
            <RandomProductsDisplay count={50} />
            <Division/>
          </div>
          
          <LatestProductsDisplay />
          <Division/>
          
          <AvailableProductsDisplay count={10} />
        </div>
      </div>
    </section>
  );
};

export default Home;