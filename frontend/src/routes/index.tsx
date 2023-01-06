import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientModalEdit from "../components/client/clientModalEdit";
import UserProvider from "../context/UserContext";
import Client from "../pages/client";

import ApiUser from "../pages/api-user";

import ApiCat from "../pages/api-cat";
import ApiDog from "../pages/api-dog";
import { LoginPage } from "../pages/login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/api-user" element={<ApiUser />} />
          <Route path="/api-cat" element={<ApiCat props="200" />} />
          <Route path="/api-dog" element={<ApiDog />} />
          <Route path="/client" element={<Client />} />
          <Route path="/client/:id" element={<ClientModalEdit />} />
          <Route path="*" element={<ApiCat props="404" />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
