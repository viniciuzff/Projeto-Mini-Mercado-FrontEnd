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
          <div style={s.brandIcon}>S</div>
          <span style={s.brandName}>SellerOS</span>
        </div>
        <div style={s.hero}>
          <h1 style={s.heroTitle}>Gerencie seu negócio com simplicidade</h1>
          <p style={s.heroSub}>Controle de estoque, vendas e relatórios em um só lugar.</p>
          <div style={s.stats}>
            <div style={s.stat}><span style={s.statNum}>100%</span><span style={s.statLabel}>On-line</span></div>
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
              <label style={s.label}>E-mail</label>
              <input style={s.input} type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={s.field}>
              <label style={s.label}>Senha</label>
              <input style={s.input} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button style={loading ? s.btnDisabled : s.btn} type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p style={s.footer}>Não tem conta? <Link to="/register" style={s.link}>Cadastre-se grátis</Link></p>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { display: "flex", minHeight: "100vh" },
  left: { flex: 1, background: "linear-gradient(135deg, #0f1117 0%, #1a1d2e 100%)", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #1e2130" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  brandIcon: { width: "36px", height: "36px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "16px" },
  brandName: { fontSize: "18px", fontWeight: "600", color: "#fff" },
  hero: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" },
  heroTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "42px", color: "#fff", lineHeight: 1.2, maxWidth: "420px" },
  heroSub: { fontSize: "16px", color: "#6b7280", maxWidth: "360px", lineHeight: 1.6 },
  stats: { display: "flex", alignItems: "center", gap: "28px", marginTop: "16px" },
  stat: { display: "flex", flexDirection: "column", gap: "4px" },
  statNum: { fontSize: "24px", fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: "11px", color: "#4b5280", textTransform: "uppercase", letterSpacing: "0.08em" },
  statDivider: { width: "1px", height: "40px", background: "#1e2130" },
  right: { width: "480px", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", background: "#0f1117" },
  card: { width: "100%", maxWidth: "380px" },
  title: { fontSize: "26px", fontWeight: "700", color: "#fff", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#6b7280", marginBottom: "36px" },
  error: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  field: { marginBottom: "20px" },
  label: { display: "block", fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { width: "100%", padding: "12px 14px", border: "1px solid #1e2130", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#13151f", color: "#fff", boxSizing: "border-box" },
  btn: { width: "100%", padding: "13px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "pointer", marginTop: "8px" },
  btnDisabled: { width: "100%", padding: "13px", background: "#1e2236", color: "#4b5280", border: "none", borderRadius: "10px", fontSize: "15px", cursor: "not-allowed", marginTop: "8px" },
  footer: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#6b7280" },
  link: { color: "#818cf8" },
};