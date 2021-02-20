import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  MenuItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Switch,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import configFormReducer from "../../utils/configFormReducer";

const useStyles = makeStyles((theme) => ({
  dialogHeader: {
    backgroundColor: "#0070c2",
    color: "white",
  },
  marginZero: {
    margin: 0,
    marginTop: 40,
    marginBottom: 40,
    padding: 0,
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ConfigModal = () => {
  const style = useStyles();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = React.useReducer(configFormReducer, {});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setConfiguracaoPadrao = () => {
    setFormData({
      reset: true
    })
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(">>>>>>>>SUBMIT");
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <SettingsIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </MenuItem>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="configuracoes"
      >
        <DialogTitle id="configuracoes" className={style.dialogHeader}>
          {"Configurações"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form>
              <TextField
                id="fontsize"
                name="fontsize"
                label="Tamanho da Fonte (Padrão)"
                style={{ margin: 8 }}
                fullWidth
                margin="none"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={formData.fontsize || ""}
              />
              <FormControlLabel
                className={style.marginZero}
                label="Tema Escuro"
                labelPlacement="start"
                control={
                  <Switch
                    name="tema"
                    color="primary"
                    checked={formData.tema || false}
                    onChange={handleChange}
                  />
                }
              />
              <FormControl component="fieldset" fullWidth style={{marginBottom:150}}>
                <FormLabel component="legend">
                  Posição Inicial da Grade
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="grade"
                  name="grade"
                  defaultValue="flutuante"
                  checked={formData["grade"] || ""}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="flutuante"
                    control={<Radio color="primary" />}
                    label="Flutuante"
                  />
                  <FormControlLabel
                    value="fixada"
                    control={<Radio color="primary" />}
                    label="Fixada"
                  />
                  <FormControlLabel
                    value="novatela"
                    control={<Radio color="primary" />}
                    label="Nova Tela"
                  />
                </RadioGroup>
              </FormControl>
            </form>
            <div>
              You are submitting the following:
              <ul>
                {Object.entries(formData).map(([name, value]) => (
                  <li key={name}>
                    <strong>{name}</strong>: {value.toString()}
                  </li>
                ))}
              </ul>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={style.spaceBetween}>
          <Button autoFocus onClick={setConfiguracaoPadrao} color="primary">
            Configuração Padrão
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfigModal;
