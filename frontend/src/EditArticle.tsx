import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  status: number;
  created_at: string;
}

interface EditArticleProps {
  article: Article;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditArticle({ article, onCancel, onSave }: EditArticleProps) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [status, setStatus] = useState(article.status.toString());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`http://127.0.0.1:8000/api/posts/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, status: Number(status) }),
    });

    if (!res.ok) {
      alert('Erro ao atualizar o artigo.');
      return;
    }

    alert('Artigo atualizado com sucesso!');
    onSave();
  };

  return (
    <div className="flex flex-col items-center bg-zinc-50 p-10 rounded shadow-2xl w-full max-w-md gap-2">
      <div className="text-2xl font-medium text-zinc-700 text-center">
        <h1 className="text-zinc-700 font-bold text-2xl">Editar Post</h1>
      </div>
      <div className="w-100">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xl font-medium text-zinc-700 mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium text-zinc-700 mb-1">Conteúdo</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 border rounded p-2 resize-none overflow-auto"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xl font-medium text-zinc-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded p-2 shadow"
              required
            >
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
          </div>

          <div className="flex justify-center gap-7 text-zinc-700 font-bold text-xl">
            <div className="rounded">
              <button
                type="button"
                className="px-4 py-2 rounded cursor-pointer"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
            <div className="rounded">
              <button
                type="submit"
                className="px-4 py-2 rounded cursor-pointer"
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
