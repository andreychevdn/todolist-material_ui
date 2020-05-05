const authorizationReducer = (state, action) => {
  let { login, password1, password2, email } = state.registrationForm;
  let { fieldName: field } = action;
  let stateCopy = { ...state };

  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isRegistration: true,
      };
    case "SIGN_UP":
      return {
        ...state,
        isRegistration: false,
      };
    case "ON_DRAFTS_REGISTRATION_FORM_CHANGE":
      stateCopy.registrationForm = { ...state.registrationForm };
      stateCopy.registrationForm[field] = {
        ...state.registrationForm[field],
        draft: action.value,
      };
      return stateCopy;
    case "SAVE_DATA_REGISTRATION_FORM":
      stateCopy.isRegistration = true;
      stateCopy.registrationForm = { ...state.registrationForm };
      stateCopy.registrationForm.login = {
        ...state.registrationForm.login,
        value: login.draft,
        draft: "",
      };
      stateCopy.registrationForm.password1 = {
        ...state.registrationForm.password1,
        value: password1.draft,
        draft: "",
      };
      stateCopy.registrationForm.password2 = {
        ...state.registrationForm.password2,
        value: password2.draft,
        draft: "",
      };
      stateCopy.registrationForm.email = {
        ...state.registrationForm.email,
        value: email.draft,
        draft: "",
      };
      return stateCopy;
    case "ON_DRAFTS_AUTHORIZATION_FORM_CHANGE":
      stateCopy.authorizationForm = { ...state.authorizationForm };
      stateCopy.authorizationForm[field] = {
        ...state.authorizationForm[field],
        draft: action.value,
      };
      return stateCopy;
    case "SIGN_IN":
      return {
        ...state,
        isValid: true,
      };
    default:
      return state;
  }
};

export default authorizationReducer;
