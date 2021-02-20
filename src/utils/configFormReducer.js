const configFormReducer = (state, event) => {
  if (event.reset) {
    return {
      fontsize: "14px",
      tema: false,
      grade: "flutuante",
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default configFormReducer;
