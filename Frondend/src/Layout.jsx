import React from 'react';
import { Box } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children }) => {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box p={4}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;

