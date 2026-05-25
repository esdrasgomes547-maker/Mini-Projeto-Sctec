
// Base class with private field and encapsulation
abstract class ItemTrabalho {
  final String _id;
  String _titulo;

  ItemTrabalho({required String id, required String titulo})
      : _id = id,
        _titulo = titulo;

  String get id => _id;
  String get titulo => _titulo;

  String exibirResumo();
}

// Tarefa class extending ItemTrabalho
class Tarefa extends ItemTrabalho {
  final String responsavel;
  final String status;
  final String prioridade;
  final double valor;
  final int horas;

  Tarefa({
    required String id,
    required String titulo,
    required this.responsavel,
    required this.status,
    required this.prioridade,
    required this.valor,
    required this.horas,
  }) : super(id: id, titulo: titulo);

  @override
  String exibirResumo() {
    return 'Tarefa [$status] - $titulo (Responsável: $responsavel, Prioridade: $prioridade)';
  }
}

void main() {
  // 1. Ingestão - Dados brutos
  final List<Map<String, dynamic>> dadosBrutos = [
    {'id': 1, 'titulo': ' Corrigir bug login ', 'responsavel': 'Ana', 'status': 'concluída', 'prioridade': 'alta', 'valor': 'R$ 120,00', 'horas': '2'},
    {'id': 2, 'titulo': 'Criar tela de perfil', 'responsavel': 'Bruno', 'status': 'em andamento', 'prioridade': 'media', 'valor': 'R$ 250,50', 'horas': '5'},
    {'id': 3, 'titulo': null, 'responsavel': 'Carla', 'status': 'pendente', 'prioridade': 'baixa', 'valor': 'R$ 60,00', 'horas': null},
    {'id': 4, 'titulo': 'Ajustar navegação', 'responsavel': null, 'status': 'concluída', 'prioridade': 'alta', 'valor': null, 'horas': '3'},
    {'id': 5, 'titulo': 'Revisar regras de negócio', 'responsavel': 'Daniel', 'status': 'cancelada', 'prioridade': 'media', 'valor': 'R$ 0,00', 'horas': '0'},
    {'id': 6, 'titulo': 'Implementar validação de dados', 'responsavel': 'Eduarda', 'status': 'concluída', 'prioridade': 'alta', 'valor': 'R$ 200,00', 'horas': '2'},
  ];

  // 2. Tratamento - Sanitização
  final List<Tarefa> tarefas = [];
  final List<Map<String, dynamic>> itensIncompletos = [];

  for (final item in dadosBrutos) {
    if (item['titulo'] == null || item['responsavel'] == null || item['valor'] == null || item['horas'] == null) {
      itensIncompletos.add(item);
    }

    // Sanitização de valores
    final String titulo = (item['titulo'] as String?)?.trim() ?? 'Sem título';
    final String responsavel = (item['responsavel'] as String?)?.trim() ?? 'Não informado';
    final String status = (item['status'] as String?)?.trim() ?? 'sem status';
    
    // Regex para limpar valor: Remove "R$ ", troca vírgula por ponto
    final String valorStr = (item['valor'] as String?) ?? '0,00';
    final double valor = double.tryParse(valorStr.replaceAll('R\$ ', '').replaceAll(',', '.')) ?? 0.0;
    
    final int horas = int.tryParse(item['horas'].toString()) ?? 0;

    tarefas.add(Tarefa(
      id: item['id'].toString(),
      titulo: titulo,
      responsavel: responsavel,
      status: status,
      prioridade: item['prioridade'] ?? 'baixa',
      valor: valor,
      horas: horas,
    ));
  }

  // 3. Análise
  
  // RF12: Set de status únicos
  final Set<String> statusUnicos = tarefas.map((t) => t.status).toSet();
  
  // RF08: Soma concluídas
  final double somaConcluidas = tarefas.where((t) => t.status == 'concluída').fold(0.0, (sum, t) => sum + t.valor);
  
  // RF09: Média pendentes
  final List<Tarefa> pendentes = tarefas.where((t) => t.status == 'pendente').toList();
  final double mediaPendentes = pendentes.isEmpty ? 0.0 : pendentes.fold(0.0, (sum, t) => sum + t.valor) / pendentes.length;

  // RF10: Mapa de horas por status
  final Map<String, int> horasPorStatus = {};
  for (final tarefa in tarefas) {
    horasPorStatus[tarefa.status] = (horasPorStatus[tarefa.status] ?? 0) + tarefa.horas;
  }

  // 4. Relatório Final
  print('--- RELATÓRIO GERENCIAL ---');
  print('Status encontrados: $statusUnicos');
  print('Valor total (concluídas): R$ ${somaConcluidas.toStringAsFixed(2)}');
  print('Média de valor (pendentes): R$ ${mediaPendentes.toStringAsFixed(2)}');
  print('Horas trabalhadas por status: $horasPorStatus');
  print('Itens com campos nulos originados: ${itensIncompletos.length}');
}
