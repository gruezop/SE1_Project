import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {TfiMenu} from 'react-icons/tfi'
import {TiTimesOutline} from 'react-icons/ti'
import {RiMoneyDollarCircleLine} from 'react-icons/ri'


function Navigation() {

  const [click, setClick] = useState(false)
  const closeMenu = () => setClick(false);
  const onClick = () => setClick(!click);
  

  return (
    <>
      <div className="nav">
        <div className="nav-container">
          <Link to='/' className="nav-logo" onClick={(closeMenu)}>
            <RiMoneyDollarCircleLine/>SPENT
          </Link>
          <div className="nav-menu-icon" onClick={onClick}>
            {click ? <TiTimesOutline/> : <TfiMenu/>}            
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            <li className='nav-menu-item'><Link to ='/' className='nav-menu-links' onClick={closeMenu}> Home </Link></li> 
            <li className='nav-menu-item'><Link to='../expensediary' className='nav-menu-links' onClick={closeMenu}>Expense Diary</Link></li>
            <li className='nav-menu-item'><Link to='../help' className='nav-menu-links' onClick={closeMenu}>Help</Link></li>
            <li className='nav-menu-item'><Link to='../contactus' className='nav-menu-links' onClick={closeMenu}>Contact Us</Link></li>
          
          
          </ul>

        </div>

      </div>
    </>
   
  );
}

export default Navigation;