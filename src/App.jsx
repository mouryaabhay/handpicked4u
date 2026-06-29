import "./App.css";
import ResourcesProvider from "@/store/resources";
import BookmarksProvider from "@/store/bookmarks";
import ThemesProvider from "@/store/themes";
import { BrowserRouter } from "react-router-dom";
import NavSidebar from "@/components/sidebar/nav-sidebar";
import AppHeader from "@/components/header/header-layout";
import ThemedToaster from "@/components/themed-toaster";
import PageRoutes from "@/router";

function App() {
  return (
    <ResourcesProvider>
      <BookmarksProvider>
        <ThemesProvider>
          <BrowserRouter>
            <NavSidebar>
              <div className="flex flex-col min-h-screen w-screen">
                <AppHeader />
                <ThemedToaster />
                <main className="flex-1 overflow-y-auto pt-[--header-height]">
                  <PageRoutes />
                </main>
              </div>
            </NavSidebar>
          </BrowserRouter>
        </ThemesProvider>
      </BookmarksProvider>
    </ResourcesProvider>
  );
}

export default App;
