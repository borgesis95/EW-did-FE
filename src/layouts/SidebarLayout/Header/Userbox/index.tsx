import { useRef, useState } from 'react';
import Cookie from 'js-cookie';
import * as jose from 'jose';
import {
  Avatar,
  Box,
  Button,
  Hidden,
  lighten,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const userInfo = Cookie.get('user');

  const data = userInfo && jose.decodeJwt(JSON.parse(userInfo).jwt);

  const user = {
    name: data?.address,
    jobtitle: data?.username
  };

  const ref = useRef<any>(null);

  return (
    <>
      <UserBoxButton color="secondary" ref={ref}>
        <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
      </UserBoxButton>
    </>
  );
}

export default HeaderUserbox;
