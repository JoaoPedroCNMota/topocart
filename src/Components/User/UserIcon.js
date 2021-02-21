import React from "react";
import {
  MenuItem,
  Popper,
  IconButton,
  Button,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from "@material-ui/core";

import ConfigModal from "./ConfigModal";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from '../../services/user'

const UserIcon = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);

  //busca usuário logado por token no sessionStorage.
  //Deve ser alterado de acordo com a api a ser consumida.
  const [isLogged] = React.useState(sessionStorage.getItem('token'));

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const callLogout = () => {
    sessionStorage.removeItem('token'); //apenas para demonstração
    window.location.reload();           //apenas para demonstração
    // logout()
    //   .then(() => {
    //     alert("Realoizou logout");
    //   })
  }

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      {isLogged && (
        <>
          <IconButton
            color="#ffffff"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <AccountCircleOutlinedIcon fontSize="large" style={{ color: 'white', fontSize: 50 }} />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            transition
            disablePortal
            placement="bottom-end"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <Typography align="center">{"usuario.nome"}</Typography>
                      <Divider />
                      <ConfigModal />
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <ExitToAppIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" onClick={callLogout} />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
      {!isLogged && (
        <Button
          style={{ color: 'white' }}
          onClick={() => {
            sessionStorage.setItem('token', '1');
            alert("redirecionar para pagina de login");
            window.location.reload();
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default UserIcon;
