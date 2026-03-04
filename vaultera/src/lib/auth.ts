// Mock authentication service
interface User {
  id: string;
  email: string;
  name: string;
}

// Demo credentials
const DEMO_USER = {
  email: "adaeze@vaultera.com",
  password: "vaultera123",
};

export function signIn(email: string, password: string): boolean {
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // Store auth state (you can enhance this with proper session management)
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "user_1",
          email: email,
          name: "Adaeze",
        })
      );
    }
    return true;
  }
  return false;
}

export function signOut(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("user");
}
