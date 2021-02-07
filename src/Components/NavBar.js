import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, Box} from "@material-ui/core";

import UserIcon from "./User/UserIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            {/* box para jogar UserIcon para direita */}
            {/* Barra de menu apenas para demonstração */}
          </Box>
          <UserIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
