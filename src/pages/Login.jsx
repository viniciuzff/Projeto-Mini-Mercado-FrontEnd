import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await login(email, password);
    setLoading(false);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      setError(res.error || "Erro ao fazer login");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.left}>
        <div style={s.brand}>
          <span style={s.brandIcon}></span>
          <span style={s.brandName}>Sistema de Gestão de Mini Mercado</span>
        </div>
        <div style={s.hero}>
          <h1 style={s.heroTitle}>Gerencie seu negócio com simplicidade</h1>
          <p style={s.heroSub}>Controle estoque, vendas e relatórios em um só lugar.</p>
          <div style={s.stats}>
            <div style={s.stat}><span style={s.statNum}>100%</span><span style={s.statLabel}>Online</span></div>
            <div style={s.statDivider}/>
            <div style={s.stat}><span style={s.statNum}>∞</span><span style={s.statLabel}>Produtos</span></div>
            <div style={s.statDivider}/>
            <div style={s.stat}><span style={s.statNum}>24/7</span><span style={s.statLabel}>Acesso</span></div>
          </div>
        </div>
      </div>

      <div style={s.right}>
        <div style={s.card}>
          <h2 style={s.title}>Bem-vindo de volta</h2>
          <p style={s.subtitle}>Entre com sua conta para continuar</p>

          {error && <div style={s.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input
                style={s.input}
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Senha</label>
              <input
                style={s.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button style={loading ? s.btnDisabled : s.btn} type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p style={s.footer}>
            Não tem conta? <Link to="/register">Cadastre-se grátis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { display: "flex", minHeight: "100vh" },
  left: { flex: 1, background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  brandIcon: { fontSize: "28px" },
  brandName: { fontSize: "20px", fontWeight: "600", color: "#fff" },
  hero: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" },
  heroTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "42px", color: "#fff", lineHeight: 1.2, maxWidth: "400px" },
  heroSub: { fontSize: "16px", color: "rgba(255,255,255,0.75)", maxWidth: "360px", lineHeight: 1.6 },
  stats: { display: "flex", alignItems: "center", gap: "24px", marginTop: "16px" },
  stat: { display: "flex", flexDirection: "column", gap: "4px" },
  statNum: { fontSize: "24px", fontWeight: "600", color: "#fff" },
  statLabel: { fontSize: "12px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em" },
  statDivider: { width: "1px", height: "40px", background: "rgba(255,255,255,0.2)" },
  right: { width: "480px", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" },
  card: { width: "100%", maxWidth: "380px" },
  title: { fontSize: "28px", fontWeight: "600", color: "#1c1917", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#78716c", marginBottom: "32px" },
  error: { background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  field: { marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: "500", color: "#44403c", marginBottom: "6px" },
  input: { width: "100%", padding: "12px 14px", border: "1.5px solid #e8e5e0", borderRadius: "10px", fontSize: "14px", outline: "none", transition: "border 0.2s", background: "#fafaf9" },
  btn: { width: "100%", padding: "13px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "pointer", marginTop: "8px", transition: "background 0.2s" },
  btnDisabled: { width: "100%", padding: "13px", background: "#86efac", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "not-allowed", marginTop: "8px" },
  footer: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#78716c" },
};