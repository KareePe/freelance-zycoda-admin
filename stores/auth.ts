import { defineStore } from "pinia";
import axios from "axios";

interface UserPayloadInterface {
  username: string;
  password: string;
}

const env = useRuntimeConfig();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      let payload = {
        username: username,
        password: password,
      };

      const result = await axios.post(
        env.public.API_BASE_DEV + "/auth",
        payload
      );

      if (result.data.status === "OK") {
        const token = useCookie("token", { maxAge: 60 * 60 });
        const uuid = useCookie("uuid", { maxAge: 60 * 60 }); // useCookie new hook in nuxt 3
        token.value = result.data.message[0].username;
        uuid.value = result.data.message[0].userId; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      } else {
        const token = useCookie("token");
        token.value = null;
        this.authenticated = false;
      }
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      const uuid = useCookie("uuid");
      this.authenticated = false; // set authenticated  state value to false
      token.value = null;
      uuid.value = null; // clear the token cookie
    },
  },
});
