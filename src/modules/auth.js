import JtockAuth from "j-tockauth";

const auth = new JtockAuth ({
  host: "http://localhost:3000",
  prefixUrl: "/api/v1",
  debug: false
});

export default auth;