import { Pencil, Trash2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  status: number;
  created_at: string;
}

interface ArticleCardProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

export default function ArticleCard({ article, onEdit, onDelete }: ArticleCardProps) {
  return (
    <div className="flex flex-col items-center bg-zinc-100 rounded-xl border border-gray-200 gap-2 shadow p-6">
      <div className="text-xl font-semibold">
        <h1 className="text-zinc-950 font-bold mb-2">{article.title}</h1>
      </div>
      <div className="text-lg font-sans">
        <p className="text-gray-700 mb-4 max-w-[700px] break-words overflow-hidden">
          {article.content}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">Status: Ativo</p>
      </div>
      <div className="flex items-center justify-center gap-6 w-full">
        <div>
          <time className="text-sm text-gray-600 block">
            Criado em: {new Date(article.created_at).toLocaleString()}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <Pencil
            className="size-5 text-zinc-600 cursor-pointer hover:text-zinc-900"
            onClick={() => onEdit(article)}
          />
          <Trash2
            className="size-5 text-zinc-600 cursor-pointer hover:text-zinc-900"
            onClick={() => onDelete(article.id)}
          />
        </div>
      </div>
    </div>
  );
}
