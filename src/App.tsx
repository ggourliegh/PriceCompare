import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SpecialsPage from './pages/SpecialsPage';
import SearchPage from './pages/SearchPage';
import ShoppingListPage from './pages/ShoppingListPage';
import ScannerPage from './pages/ScannerPage';
import FridgePage from './pages/FridgePage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SpecialsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/list" element={<ShoppingListPage />} />
          <Route path="/scan" element={<ScannerPage />} />
          <Route path="/fridge" element={<FridgePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
