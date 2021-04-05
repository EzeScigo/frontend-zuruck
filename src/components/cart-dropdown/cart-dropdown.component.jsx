import React, { useState, useRef, useEffect } from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartHidden } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { useOnClickOutside } from '../../hooks';

// import { CSSTransition } from 'react-transition-group';

import CheckOut from '../checkout/checkout.component';
import { CartDropdownContainer } from './cart-dropdown.styles';

const CartDropdown = ({ hidden, toggleCartHidden, history, location }) => {
  const node = useRef();
  useOnClickOutside(node, () => toggleCartHidden());

  const handleGoToCheckOut = () => {
    toggleCartHidden();
    history.push({ 
      pathname: '/checkout', 
      state: { from: location.pathname,
               active: 'checkout',
               isMobile: false,
              }})
  }

  return (
    <CartDropdownContainer>
      <CheckOut 
        hidden={hidden} 
        isDropdown={true} 
        goToCheckOut={() => handleGoToCheckOut()}
      />
    </CartDropdownContainer>
  )
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(CartDropdown)));