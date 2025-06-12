import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoPost = {
      title: titulo,
      content: conteudo,
      status: 1,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPost),
      });

      if (!response.ok) throw new Error("Erro ao salvar o post");

      alert("Post criado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar o post.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-zinc-50 p-10 rounded shadow-2xl w-full max-w-md gap-2">
      <div className="text-2xl font-medium text-zinc-700 text-center">
        <h1 className="text-zinc-700 font-bold text-2xl">Criar Novo Post</h1>
      </div>
      <div className="w-100">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xl font-medium text-zinc-700 mb-1">Título</label>
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xl font-medium text-zinc-700 mb-1">Conteúdo</label>
            <textarea
              placeholder="Conteúdo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              className="w-full h-40 border rounded p-2 resize-none overflow-auto"
              required
            />
          </div>

          <div className="flex justify-center gap-7 text-zinc-700 font-bold text-xl">
            <div className="rounded">
              <button
                type="button"
                className="px-4 py-2 rounded cursor-pointer "
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>
            </div>
            <div className="rounded">
              <button
                type="submit"
                className="px-4 py-2 rounded  cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
