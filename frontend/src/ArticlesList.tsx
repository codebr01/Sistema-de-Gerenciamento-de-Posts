import { useEffect, useState } from 'react';
import EditArticle from './EditArticle';
import ArticleCard from './components/ArticleCard';

interface Article {
  id: string;
  title: string;
  content: string;
  status: number;
  created_at: string;
}

export default function ArticlesList() {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    fetch('http://127.0.0.1:8000/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar artigos');
        return res.json();
      })
      .then((data) => {
        setArticles(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Tem certeza que deseja deletar este post?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao deletar post");
      }

      setArticles((prev) => prev.filter((article) => article.id !== id));
      alert("Post deletado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar o post.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-zinc-950">
        <p className="text-white text-lg">Carregando artigos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-zinc-950">
        <p className="text-black text-3xl">Ops, a API está offline: {error}</p>
      </div>
    );
  }

  if (editingArticle) {
    return (
      <EditArticle
        article={editingArticle}
        onCancel={() => setEditingArticle(null)}
        onSave={() => {
          setEditingArticle(null);
          fetchArticles();
        }}
      />
    );
  }


  return (
    <div className="flex flex-col max-w-3xl w-full mx-auto min-h-screen space-y-10 gap-10">
      {articles.filter(article => article.status === 1).length === 0 ? (
        <p className="text-center text-zinc-800 text-2xl">Nenhum artigo ativo encontrado.</p>
      ) : (
        articles
          .filter(article => article.status === 1)
          .map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={setEditingArticle}
              onDelete={handleDelete}
            />
          ))
      )}
    </div>
  );
}
