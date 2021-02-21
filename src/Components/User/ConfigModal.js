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
import { getConfigs, postConfigs } from '../../services/user'

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
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [config, setConfig] = React.useState({})

  React.useEffect(() => {
    //passar identificação do cliente
    // getConfigs(id_usuario) 
    //   .then((resp) => setConfig(resp.data))
    //   .catch((err) => alert("erro ao buscar configurações do cliente " + err))
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setConfiguracaoPadrao = () => {
    setConfig({
      fontSize: '14px',
      tema: false,
      grade: 'flutuante'
    })
  };

  const enviarConfiguracoes = (e) => {
    e.preventDefault();
    handleClose();
    // postConfigs(id_usuario, config)
    //   .then((resp) => {
    //     alert("configuração enviada com sucesso")
    //   })
    //   .catch((err) => alert("erro ao enviar configuração " + err))
    alert("definiu configuração")
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
                onChange={(e) => setConfig({ ...config, fontSize: e.target.value })}
                value={config.fontSize}
              />
              <FormControlLabel
                className={style.marginZero}
                label="Tema Escuro"
                labelPlacement="start"
                control={
                  <Switch
                    name="tema"
                    color="primary"
                    checked={config.tema || false}
                    onChange={(e) => setConfig({ ...config, tema: !config.tema })}
                  />
                }
              />
              <FormControl component="fieldset" fullWidth style={{ marginBottom: 150 }}>
                <FormLabel component="legend">
                  Posição Inicial da Grade
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="grade"
                  name="grade"
                  defaultValue="flutuante"
                  onChange={(e) => setConfig({ ...config, grade: e.target.value })}
                >
                  <FormControlLabel
                    value="flutuante"
                    control={<Radio color="primary" />}
                    label="Flutuante"
                    checked={config.grade === 'flutuante'}
                  />
                  <FormControlLabel
                    value="fixada"
                    control={<Radio color="primary" />}
                    label="Fixada"
                    checked={config.grade === 'fixada'}
                  />
                  <FormControlLabel
                    value="novatela"
                    control={<Radio color="primary" />}
                    label="Nova Tela"
                    checked={config.grade === 'novatela'}
                  />
                </RadioGroup>
              </FormControl>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={style.spaceBetween}>
          <Button autoFocus onClick={setConfiguracaoPadrao} color="primary">
            Configuração Padrão
          </Button>
          <Button onClick={enviarConfiguracoes} color="primary" autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfigModal;
