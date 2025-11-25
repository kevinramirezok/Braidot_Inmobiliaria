import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Email o contraseña incorrectos');
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-braidot-primary-bordo to-braidot-primary-bordo-light">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-braidot-primary-bordo mb-2">
            Panel Admin
          </h1>
          <p className="text-braidot-neutral-600">
            Braidot Inmobiliaria
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-braidot-negro mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent transition-all"
              placeholder="admin@braidot.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-braidot-negro mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-braidot-neutral-300 rounded-lg focus:ring-2 focus:ring-braidot-primary-bordo focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white font-bold py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-sm text-braidot-neutral-600 hover:text-braidot-primary-bordo transition-colors"
          >
            ← Volver al sitio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;