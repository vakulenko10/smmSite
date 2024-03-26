
"use client"
import React, { useEffect, useState } from 'react';
import Container from './Container';
import HeaderBurger from './HeaderBurger';
import LinksContainer from './LinksContainer';

// const [isSmallHeaderActive, setIsSmallHeaderActive] = useState(false);
{/* <LinksContainer isSmallHeaderActive={isSmallHeaderActive} setIsSmallHeaderActive={setIsSmallHeaderActive}/> */}
const Header = () => {
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);
  const [isSmallHeaderActive, setIsSmallHeaderActive] = useState(false);
  // const [windowYPosition, setWindowYPosition] = useState(null)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     setWindowYPosition(currentScrollPos);
  //     setVisible(prevScrollPos > currentScrollPos || currentScrollPos < window.innerHeight-1);
  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [prevScrollPos]);
  const handleBurgerChange = (e) => {
    setIsSmallHeaderActive(e.target.checked);
  };
  return (
    <header className={` w-full  backdrop-blur-[2px] text-white z-[999] ${isSmallHeaderActive?' md:absolute fixed':'absolute'} `}>
      <Container>
        <nav className="px-4 lg:px-6 py-2.5 flex justify-between items-center">
          <h5 className={`text-2xl md:visible  `}>anya trubitsyna</h5>
          <LinksContainer isSmallHeaderActive={isSmallHeaderActive} setIsSmallHeaderActive={setIsSmallHeaderActive} />
          <HeaderBurger classes={''} handleBurgerChange={handleBurgerChange} isSmallHeaderActive={isSmallHeaderActive}/>
        </nav>
      </Container>
    </header>
  );
};

export default Header;