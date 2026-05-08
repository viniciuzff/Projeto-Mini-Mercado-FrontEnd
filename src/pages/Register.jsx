import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSeller } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", cnpj: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await registerSeller(form);
    setLoading(false);
    if (res.usuario) {
      setSuccess("Cadastro realizado! Verifique seu WhatsApp.");
      setTimeout(() => navigate("/activate"), 2000);
    } else {
      setError(res.error || res.erro || "Erro ao cadastrar");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.left}>
        <div style={s.brand}>
          <span style={s.brandIcon}>🛒</span>
          <span style={s.brandName}>Mini Mercado</span>
        </div>
        <div style={s.hero}>
          <h1 style={s.heroTitle}>Comece a vender melhor hoje</h1>
          <p style={s.heroSub}>Cadastre-se gratuitamente e tenha controle total do seu negócio.</p>
          <div style={s.features}>
            {["✓ Controle de estoque em tempo real", "✓ Registro de vendas simplificado", "✓ Dashboard com métricas", "✓ Ativação via WhatsApp"].map((f, i) => (
              <div key={i} style={s.feature}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={s.right}>
        <div style={s.card}>
          <h2 style={s.title}>Criar conta</h2>
          <p style={s.subtitle}>Preencha seus dados para começar</p>

          {error && <div style={s.error}>{error}</div>}
          {success && <div style={s.successBox}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Nome completo</label>
                <input style={s.input} name="name" placeholder="João Silva" onChange={handleChange} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>CNPJ</label>
                <input style={s.input} name="cnpj" placeholder="00.000.000/0001-00" onChange={handleChange} required />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input style={s.input} name="email" type="email" placeholder="seu@email.com" onChange={handleChange} required />
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Celular</label>
                <input style={s.input} name="phone" placeholder="(11) 99999-9999" onChange={handleChange} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Senha</label>
                <input style={s.input} name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
              </div>
            </div>
            <button style={loading ? s.btnDisabled : s.btn} type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Criar conta grátis"}
            </button>
          </form>

          <p style={s.footer}>
            Já tem conta? <Link to="/login">Entrar</Link>
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
  hero: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" },
  heroTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "40px", color: "#fff", lineHeight: 1.2, maxWidth: "400px" },
  heroSub: { fontSize: "16px", color: "rgba(255,255,255,0.75)", maxWidth: "360px", lineHeight: 1.6 },
  features: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" },
  feature: { fontSize: "14px", color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: "8px" },
  right: { width: "560px", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" },
  card: { width: "100%", maxWidth: "460px" },
  title: { fontSize: "28px", fontWeight: "600", color: "#1c1917", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#78716c", marginBottom: "32px" },
  error: { background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  successBox: { background: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  field: { marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: "500", color: "#44403c", marginBottom: "6px" },
  input: { width: "100%", padding: "11px 14px", border: "1.5px solid #e8e5e0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafaf9" },
  btn: { width: "100%", padding: "13px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "pointer", marginTop: "8px" },
  btnDisabled: { width: "100%", padding: "13px", background: "#86efac", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "not-allowed", marginTop: "8px" },
  footer: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#78716c" },
};