import React, { useState } from 'react';

export default function Clientes({ store }: { store: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Garante um array vazio caso store.clients esteja indefinido
  const listaClientes = store?.clients || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert('O nome do cliente é obrigatório!');

    store?.addClient?.({
      name,
      email,
      avatarUrl: '',
      notes: ''
    });

    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-semibold tracking-wide text-white relative">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
            Gestão de Clientes
          </span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Cadastre e gerencie a sua carteira de contatos.
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-white/5 p-6 rounded-2xl max-w-md space-y-4"
      >
        <h3 className="text-base font-medium text-white tracking-wide">
          <span className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            Adicionar Novo Cliente
          </span>
        </h3>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">
            Nome do Cliente / Empresa
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
            placeholder="Ex: Editora Rocco"
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">
            E-mail de Contato
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
            placeholder="exemplo@email.com"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all cursor-pointer
          bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
          hover:brightness-110
          shadow-[0_0_18px_rgba(168,85,247,0.6)]"
        >
          Salvar Cliente
        </button>
      </form>

      {/* Lista de Clientes */}
      <div className="bg-surface border border-white/5 rounded-2xl p-6">
        <h3 className="text-base font-medium text-white mb-4">
          Sua Carteira ({listaClientes.length})
        </h3>

        {listaClientes.length === 0 ? (
          <p className="text-sm text-zinc-500 py-6">
            Nenhum cliente cadastrado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {listaClientes.map((c: any) => (
              <div
                key={c?.id}
                className="bg-black/30 border border-white/5 p-4 rounded-xl flex justify-between items-start hover:border-brand-500/40 transition"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {c?.name}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {c?.email || 'Sem e-mail cadastrado'}
                  </p>
                </div>

                <button
                  onClick={() => store?.deleteClient?.(c.id)}
                  className="text-xs text-red-400 hover:text-red-500 font-medium transition cursor-pointer"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}