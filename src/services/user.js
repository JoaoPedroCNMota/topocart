import api from './api';

//Método de login para api. Substituir '/login' pelo path de login da api.
export const login = (data) => api.post('/login', data);

//Método de logout para api. Substituir '/logout' pelo path de login da api.
export const logout = () => api.get('/logout');

/* 
Método para buscar configuração do cliente e definir no modal ConfigModal
"/user/${id}/configuracoes" busca usuario por id e em seguida busca suas configurações.
A URL deve ser alterada de acordo com a api.
Caso api use headers para identificação de usuário logado, seguir o modelo:
    "export const configs = (id, headers) => api.get(`/user/${id}/configuracoes`, {headers});"
com headers contendo o token ou identificação do usuário, de acordo com a api a ser consumida.
*/
export const getConfigs = (id) => api.get(`/users/${id}/configuracoes`);

//Método para enviar configuração do cliente e definida no modal ConfigModal.
//Seguindo a mesma lógica do metodo getConfigs
//Alterar a URL de acordo com a api a ser cosumida.
export const postConfigs = (id, data) => api.post(`/users/${id}/configuracoes`, data);