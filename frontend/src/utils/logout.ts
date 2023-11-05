import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";

export const onLogout = async () => {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    await useLogout();
    authStore.setAuthenticated(false)
    authStore.$reset();
    userStore.$reset();
    await navigateTo("/account/login", { replace: true });
};