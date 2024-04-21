import AdminPage from "~/admin/adminPage";
import ThemeContextProvider from "~/context/themeContext";

export default function Admin() {
  return (
    <main>
      <ThemeContextProvider>
        <AdminPage />
      </ThemeContextProvider>
    </main>
  );
}
