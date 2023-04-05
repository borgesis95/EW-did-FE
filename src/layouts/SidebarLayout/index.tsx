import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Header from './Header';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <>
      <Box>
        <Header />
        {/* <Sidebar /> */}

        <div> {children}</div>
      </Box>
    </>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node
};

export default SidebarLayout;
