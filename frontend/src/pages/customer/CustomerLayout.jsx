import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

function CustomerLayout() {
    return (
        <>
            <CustomerNavbar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default CustomerLayout;
