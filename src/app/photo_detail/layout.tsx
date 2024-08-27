import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function get_auth_session() {
    const cookiesStore = cookies();
    const session = cookiesStore.get('auth');
    return session;
  }
const Layout = ({ children }:any) => {
  const session = get_auth_session();
  if (!session) {
    // If no session cookie is found, redirect to login
    redirect('/login');
  }

  return (
    <div >
        {children}
    </div>
  );
};

export default Layout;
