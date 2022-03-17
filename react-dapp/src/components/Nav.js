import React, { Fragment } from 'react'
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, 
         DropdownToggle, DropdownMenu,
          DropdownItem, UncontrolledDropdown, NavbarText,
          NavbarToggler, NavLink
      } from 'reactstrap';

const NavBarItem = () => {
  return (
    <Fragment>
        <div>
    <Navbar
      style={{height: "10vh", backgroundColor: "white"}}
      expand="md"
      light
    >
    <NavbarBrand href="/" style={{color: "white"}}>
      <img src="logo.png" className="image-fluid " width="50" />
    </NavbarBrand>
    <NavbarBrand href="/" style={{color: "black"}}>
      MarketPlace
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
      </Nav>
      <NavbarText>
        <NavLink href="/components/" style={{color: "black"}}>
          Home
        </NavLink>
      </NavbarText>
      <NavbarText>
        <NavLink href="/components/" style={{color: "black"}}>
          Contact us
        </NavLink>
      </NavbarText>
      <NavbarText>
        <NavLink href="/components/" style={{color: "black"}}>
          About us
        </NavLink>
      </NavbarText>
    </Collapse>
  </Navbar>
</div>
    </Fragment>
  )
}

export default NavBarItem;