import { defineStore } from "pinia";

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      if (username === "admin" && password === "admin@1234") {
        const token = useCookie("token", { maxAge: 60 * 60 }); // useCookie new hook in nuxt 3
        token.value = "admin"; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      } else {
        const token = useCookie("token");
        token.value = null;
        this.authenticated = false;
      }
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});
