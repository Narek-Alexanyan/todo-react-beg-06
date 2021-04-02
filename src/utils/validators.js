export const isRequired = (value) => !!value.length ? undefined : "the Field is Required!";
export const maxLength = (length) => (value) => value.length > length ? "Max Length is" + length : undefined;
export const minLength = (length) => (value) => value.length < length ? "Min Length is" + length : undefined;
export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? undefined : "Invalid Email";
}
