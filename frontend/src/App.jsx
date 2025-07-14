import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CaftanListPage from './pages/CaftanListPage';
import ManageAdminsPage from './pages/ManageAdminsPage';
import AdminLayout from './layouts/AdminLayout';
import CreateCaftanPage from './pages/CreateCaftanPage';
import EditCaftanPage from './pages/EditCaftanPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from './features/authSlice'; // ✅ هذا هو الصحيح
import HomePage from './pages/HomePage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CaftanPage from './pages/CaftanPage';
import CaftanDetailPage from './pages/CaftanDetailPage';
import UserLayout from './layouts/UserLayout';
import CaftanByCategoryPage from './pages/CaftanByCategoryPage';
const App = () => {
  const dispatch = useDispatch();
  const { user, access, refresh } = useSelector((state) => state.auth);

  const isAuthenticated = !!user;

  useEffect(() => {
    // ✅ فقط إلا كان عندي access و refresh ومازال user ما جاش
    if (access && refresh && !user) {
      dispatch(fetchMe());
    }
  }, [access, refresh, user, dispatch]);


  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/caftans" element={<UserLayout><CaftanPage /></UserLayout>} />
        <Route path="/caftans/by_category" element={<UserLayout><CaftanByCategoryPage /></UserLayout>} />
        <Route path="/caftans/:slug" element={<UserLayout><CaftanDetailPage /></UserLayout>} />
        

          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated ? (
                <AdminLayout>
                  <DashboardPage />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/caftans"
            element={
              isAuthenticated ? (
                <AdminLayout>
                  <CaftanListPage />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/caftans/create"
            element={
              isAuthenticated ? (
                <AdminLayout>
                  <CreateCaftanPage />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/caftans/edit/:id"
            element={
              isAuthenticated ? (
                <AdminLayout>
                  <EditCaftanPage />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/admins"
            element={
              isAuthenticated ? (
                <AdminLayout>
                  <ManageAdminsPage />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
     
    </Router>
  );
};

export default App;
