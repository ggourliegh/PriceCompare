import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Tag, ShoppingCart, Camera, UtensilsCrossed, Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect, useRef, useState } from 'react';

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
  const prevCountRef = useRef(listCount);
  const [badgeAnimating, setBadgeAnimating] = useState(false);

  // Trigger badge pop animation when items are added
  useEffect(() => {
    if (listCount > prevCountRef.current) {
      setBadgeAnimating(true);
      const timeout = setTimeout(() => setBadgeAnimating(false), 500);
      return () => clearTimeout(timeout);
    }
    prevCountRef.current = listCount;
  }, [listCount]);

  return (
    <div className="flex flex-col min-h-dvh gradient-surface">
      {/* Frosted Glass Header */}
      <header className="glass-heavy border-b border-white/60 sticky top-0 z-40 safe-area-top">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white text-sm font-extrabold tracking-tight">PC</span>
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-tight gradient-text">
                PriceCompare
              </h1>
              <p className="text-[10px] text-text-muted font-medium leading-tight tracking-wide uppercase">
                NZ Grocery Savings
              </p>
            </div>
          </div>

          {/* Current Page Indicator */}
          <div className="text-xs font-semibold text-text-secondary bg-surface-dark/80 px-3 py-1.5 rounded-full">
            {getCurrentPageTitle(location.pathname)}
          </div>
        </div>
      </header>

      {/* Main Content with Page Transition */}
      <main className="flex-1 max-w-lg mx-auto w-full pb-24">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Premium Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
        {/* Gradient fade above nav */}
        <div className="h-6 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
        <div className="glass-heavy border-t border-white/60">
          <div className="max-w-lg mx-auto flex">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex-1 flex flex-col items-center pt-2 pb-1.5 text-[10px] font-semibold transition-all duration-300 relative group ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator pill at top */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? 'w-10 bg-gradient-to-r from-primary to-accent opacity-100'
                          : 'w-0 opacity-0'
                      }`}
                    />

                    {/* Icon container with active background */}
                    <div
                      className={`relative flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-primary/10 scale-105'
                          : 'group-hover:bg-surface-dark/60'
                      }`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        fill={isActive ? 'currentColor' : 'none'}
                        className="transition-all duration-300"
                      />

                      {/* Shopping cart badge */}
                      {label === 'My List' && listCount > 0 && (
                        <span
                          className={`absolute -top-1 -right-0.5 bg-danger text-white text-[9px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-lg shadow-danger/30 ${
                            badgeAnimating ? 'animate-badge-pop' : ''
                          }`}
                        >
                          {listCount > 9 ? '9+' : listCount}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`mt-0.5 transition-all duration-300 ${
                        isActive ? 'font-bold' : ''
                      }`}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
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
