import React from 'react';
import {MDCMenu} from '@material/menu';


function Menu() {


    return(
        <div class="mdc-menu mdc-menu-surface">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            <li class="mdc-list-item" role="menuitem">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">A Menu Item</span>
            </li>
            <li class="mdc-list-item" role="menuitem">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">Another Menu Item</span>
            </li>
        </ul>
        </div>
    )
}

export default Menu