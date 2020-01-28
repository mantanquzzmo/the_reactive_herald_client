import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: process.env.REACT_APP_BASEURL,
  debug: false
});

export default auth;
