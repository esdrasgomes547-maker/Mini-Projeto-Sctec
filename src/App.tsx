/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Tarefa } from './types';

const rawData = [
  {'id': 1, 'titulo': ' Corrigir bug login ', 'responsavel': 'Ana', 'status': 'concluída', 'prioridade': 'alta', 'valor': 'R$ 120,00', 'horas': '2'},
  {'id': 2, 'titulo': 'Criar tela de perfil', 'responsavel': 'Bruno', 'status': 'em andamento', 'prioridade': 'media', 'valor': 'R$ 250,50', 'horas': '5'},
  {'id': 3, 'titulo': null, 'responsavel': 'Carla', 'status': 'pendente', 'prioridade': 'baixa', 'valor': 'R$ 60,00', 'horas': null},
  {'id': 4, 'titulo': 'Ajustar navegação', 'responsavel': null, 'status': 'concluída', 'prioridade': 'alta', 'valor': null, 'horas': '3'},
  {'id': 5, 'titulo': 'Revisar regras de negócio', 'responsavel': 'Daniel', 'status': 'cancelada', 'prioridade': 'media', 'valor': 'R$ 0,00', 'horas': '0'},
  {'id': 6, 'titulo': 'Implementar validação de dados', 'responsavel': 'Eduarda', 'status': 'concluída', 'prioridade': 'alta', 'valor': 'R$ 200,00', 'horas': '2'},
];

const processedTasks = rawData.map(d => Tarefa.fromRaw(d));

export default function App() {
  const totalValue = processedTasks.reduce((sum, task) => sum + task.valor, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">TaskReport</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Relatório Gerencial</h2>
        <p>Total de Tarefas: {processedTasks.length}</p>
        <p>Valor Total: R$ {totalValue.toFixed(2).replace('.', ',')}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Responsável</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Prioridade</th>
              <th className="px-4 py-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            {processedTasks.map(task => (
              <tr key={task.id} className="border-b">
                <td className="px-4 py-2">{task.id}</td>
                <td className="px-4 py-2">{task.titulo}</td>
                <td className="px-4 py-2">{task.responsavel}</td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2">{task.prioridade}</td>
                <td className="px-4 py-2">R$ {task.valor.toFixed(2).replace('.', ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

