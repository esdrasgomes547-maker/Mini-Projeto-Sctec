
export enum TaskStatus {
  CONCLUIDA = 'concluída',
  EM_ANDAMENTO = 'em andamento',
  PENDENTE = 'pendente',
  CANCELADA = 'cancelada',
}

export enum TaskPrioridade {
  ALTA = 'alta',
  MEDIA = 'media',
  BAIXA = 'baixa',
}

export abstract class ItemTrabalho {
  private _id: number;
  protected _titulo: string;

  constructor(id: number, titulo: string) {
    this._id = id;
    this._titulo = titulo;
  }

  get id(): number {
    return this._id;
  }

  get titulo(): string {
    return this._titulo;
  }

  abstract exibirResumo(): string;
}

export class Tarefa extends ItemTrabalho {
  responsavel: string;
  status: TaskStatus;
  prioridade: TaskPrioridade;
  valor: number;
  horas: number;

  constructor(
    id: number,
    titulo: string,
    responsavel: string,
    status: TaskStatus,
    prioridade: TaskPrioridade,
    valor: number,
    horas: number
  ) {
    super(id, titulo);
    this.responsavel = responsavel;
    this.status = status;
    this.prioridade = prioridade;
    this.valor = valor;
    this.horas = horas;
  }

  exibirResumo(): string {
    return `[${this.status.toUpperCase()}] ID: ${this.id} - ${this._titulo} (R$ ${this.valor.toFixed(2)})`;
  }

  static fromRaw(data: any): Tarefa {
    return new Tarefa(
      data.id || 0,
      typeof data.titulo === 'string' ? data.titulo.trim() : 'Sem Título',
      data.responsavel || 'Não informado',
      Object.values(TaskStatus).includes(data.status) ? (data.status as TaskStatus) : TaskStatus.PENDENTE,
      Object.values(TaskPrioridade).includes(data.prioridade) ? (data.prioridade as TaskPrioridade) : TaskPrioridade.BAIXA,
      this.parseValor(data.valor),
      data.horas !== null ? parseInt(data.horas) : 0
    );
  }

  private static parseValor(valor: any): number {
    if (typeof valor !== 'string') return 0;
    const cleaned = valor.replace('R$ ', '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  }
}
