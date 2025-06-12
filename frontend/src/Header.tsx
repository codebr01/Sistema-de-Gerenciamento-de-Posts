import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="h-16 flex items-center justify-center text-black gap-7">
      <div className="text-zinc-700 font-bold text-2xl px-10 py-10 rounded hover:bg-zinc-200">
        <button onClick={() => navigate("/all/posts")} className="cursor-pointer">
          Posts
        </button>
      </div>
      <div className="text-zinc-700 font-bold text-2xl px-10 py-10 rounded hover:bg-zinc-200">
        <button onClick={() => navigate("/create/post")} className="cursor-pointer">
          Cadastrar Novo Post
        </button>
      </div>
    </div>
  );
}