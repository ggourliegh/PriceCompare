import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Tag, ShoppingCart, Camera, UtensilsCrossed, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

const navItems = [
  { to: '/', icon: Tag, label: 'Specials' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/list', icon: ShoppingCart, label: 'My List' },
  { to: '/scan', icon: Camera, label: 'Scanner' },
  { to: '/fridge', icon: UtensilsCrossed, label: 'Fridge' },
];

export default function Layout() {
  const location = useLocation();
  const shoppingList = useStore(s => s.shoppingList);
  const listCount = shoppingList.length;

  return (
    <div className="flex flex-col min-h-dvh bg-surface-alt">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">PC</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-text leading-tight">PriceCompare</h1>
              <p className="text-[10px] text-text-muted leading-tight">NZ Grocery Savings</p>
            </div>
          </div>
          <div className="text-xs text-text-muted">
            {getCurrentPageTitle(location.pathname)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-bottom">
        <div className="max-w-lg mx-auto flex">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 pt-2.5 text-[10px] font-medium transition-colors relative ${
                  isActive
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                  )}
                  <div className="relative">
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                    {label === 'My List' && listCount > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 bg-danger text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {listCount > 9 ? '9+' : listCount}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

function getCurrentPageTitle(pathname: string): string {
  switch (pathname) {
    case '/': return 'This Week\'s Deals';
    case '/search': return 'Find Products';
    case '/list': return 'Shopping List';
    case '/scan': return 'Price Scanner';
    case '/fridge': return 'Fridge to Recipe';
    default: return '';
  }
}
