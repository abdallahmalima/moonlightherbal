/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
   
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
              
                {
                    label: 'Products',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/products'
                },

                {
                    label: 'Posts',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/posts'
                },
                {
                    label: 'Headers',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/headers'
                },
                {
                    label: 'Testimonials',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/testimonials'
                },
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
