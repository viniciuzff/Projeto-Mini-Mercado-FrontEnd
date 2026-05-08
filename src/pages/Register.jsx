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
          <div style={s.brandIcon}>S</div>
          <span style={s.brandName}>SellerOS</span>
        </div>
        <div style={s.hero}>
          <h1 style={s.heroTitle}>Comece a vender melhor hoje</h1>
          <p style={s.heroSub}>Cadastre-se gratuitamente e tenha controle total do seu negócio.</p>
          <div style={s.features}>
            {["✓ Controle de estoque em tempo real", "✓ Registro de vendas simplificado", "✓ Painel de controle com métricas", "✓ Ativação via WhatsApp"].map((f, i) => (
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
              <label style={s.label}>E-mail</label>
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

          <p style={s.footer}>Já tem conta? <Link to="/login" style={s.link}>Entrar</Link></p>
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
  heroTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "40px", color: "#fff", lineHeight: 1.2, maxWidth: "420px" },
  heroSub: { fontSize: "16px", color: "#6b7280", maxWidth: "360px", lineHeight: 1.6 },
  features: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" },
  feature: { fontSize: "14px", color: "#9ca3af" },
  right: { width: "560px", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", background: "#0f1117" },
  card: { width: "100%", maxWidth: "460px" },
  title: { fontSize: "26px", fontWeight: "700", color: "#fff", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#6b7280", marginBottom: "32px" },
  error: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  successBox: { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  field: { marginBottom: "16px" },
  label: { display: "block", fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { width: "100%", padding: "11px 14px", border: "1px solid #1e2130", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#13151f", color: "#fff", boxSizing: "border-box" },
  btn: { width: "100%", padding: "13px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "pointer", marginTop: "8px" },
  btnDisabled: { width: "100%", padding: "13px", background: "#1e2236", color: "#4b5280", border: "none", borderRadius: "10px", fontSize: "15px", cursor: "not-allowed", marginTop: "8px" },
  footer: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#6b7280" },
  link: { color: "#818cf8" },
};