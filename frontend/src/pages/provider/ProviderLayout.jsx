import React from 'react';
import { Outlet } from 'react-router-dom';
import ProviderNavbar from './ProviderNavbar';

function ProviderLayout() {
    return (
        <>
            <ProviderNavbar />
            <main>
                <Outlet /> 
            </main>
        </>
    );
}

export default ProviderLayout;
