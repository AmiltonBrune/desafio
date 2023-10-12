import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdLogout, MdMenu, MdClose } from 'react-icons/md';

import { useAuth, useModal } from 'hooks';

import userImage from 'assets/svgs/user.svg';

import {
  Container,
  Header,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToggleMenu,
  ThemeToggleFooter,
  Profile,
  ProfileImagem,
} from './styles';

import { sidebarMock } from 'mocks';

const Sidebar = () => {
  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { toggleLoading } = useModal();

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  const handleSignOut = async () => {
    toggleLoading();
    await signOut();
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>
      </Header>
      <Profile>
        <ProfileImagem src={userImage} alt='user' />
        <span>{user?.email}</span>
      </Profile>
      <MenuContainer>
        {sidebarMock.map(({ name, route, Icon }) => (
          <MenuItemLink
            key={name}
            to={`${route}`}
            active={location.pathname === `${route}` ? true : false}
            onClick={handleToggleMenu}
          >
            {<Icon />}
            {name}
          </MenuItemLink>
        ))}
      </MenuContainer>
      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <MenuItemButton onClick={handleSignOut}>
          <MdLogout />
          sair
        </MenuItemButton>
      </ThemeToggleFooter>
    </Container>
  );
};

export default Sidebar;
