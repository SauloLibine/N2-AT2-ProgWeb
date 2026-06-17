// Importa os dados dos usuários e dos pedidos
import users from "../../data/users.json";
import orders from "../../data/orders.json";

function Relatorio() {
    return (
        <section className="space-y-10">

            {/*RELATÓRIO DE USUÁRIOS*/}
            <div className="rounded-3xl bg-black/30 p-8 backdrop-blur-xl">
                <h1 className="text-4xl font-semibold text-white mb-8">
                    Relatório de Usuários
                </h1>

                <table className="w-full text-white border-collapse">
                    <thead>
                        <tr className="border-b border-white">
                            <th className="p-3 text-left">Nome</th>
                            <th className="p-3 text-left">E-mail</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/*Percorre todos os usuários cadastrados*/}
                        {users.map((user) => {

                            // Procura os pedidos pertencentes ao usuário atual
                            // (JOIN entre users e orders usando uid e userId)
                            const pedidos = orders.filter(
                                (order) => order.userId === user.uid
                            );

                            return (
                                <tr
                                    key={user.uid}
                                    className="border-b border-white/20"
                                >
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/*RELATÓRIO DE PEDIDOS*/}
            <div className="rounded-3xl bg-black/30 p-8 backdrop-blur-xl">
                <h1 className="text-4xl font-semibold text-white mb-8">
                    Relatório de Pedidos
                </h1>

                <table className="w-full text-white border-collapse">
                    <thead>
                        <tr className="border-b border-white">
                            <th className="p-3 text-left">Nome</th>
                            <th className="p-3 text-left">Pedido</th>
                            <th className="p-3 text-left">Produto</th>
                            <th className="p-3 text-left">Quantidade</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Percorre todos os pedidos cadastrados */}
                        {orders.map((order) => {

                            // JOIN:
                            // Procura o usuário cujo uid é igual ao userId do pedido
                            const usuario = users.find(
                                (u) => u.uid === order.userId
                            );

                            return (
                                <tr
                                    key={order.id}
                                    className="border-b border-white/20"
                                >
                                    {/* Exibe o nome do usuário dono do pedido */}
                                    <td className="p-3">
                                        {usuario
                                            ? usuario.name
                                            : "Usuário não encontrado"}
                                    </td>

                                    {/* Exibe o ID do pedido */}
                                    <td className="p-3">
                                        {order.id}
                                    </td>

                                    {/* Lista os produtos presentes no pedido */}
                                    <td className="p-3">
                                        {order.items
                                            .map((item) => item.name)
                                            .join(", ")}
                                    </td>

                                    {/* Soma a quantidade de itens do pedido */}
                                    <td className="p-3">
                                        {order.items.reduce(
                                            (total, item) =>
                                                total + item.quantity,
                                            0
                                        )}
                                    </td>

                                    {/* Exibe o valor total do pedido */}
                                    <td className="p-3">
                                        R$ {order.total}
                                    </td>

                                    {/* Exibe o status do pedido */}
                                    <td className="p-3">
                                        {order.status}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </section>
    );
}

export default Relatorio;
