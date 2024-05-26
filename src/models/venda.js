import db from '../db/dbconfig.js';

class Venda {
  constructor({
    id,
    cliente_id,
    veiculo_id,
    valorTotal,
    formaPagamento,
    parcelas,
    created_at,
    updated_at,
  }) {
    this.id = id || null;
    this.cliente_id = cliente_id;
    this.veiculo_id = veiculo_id;
    this.valorTotal = valorTotal;
    this.formaPagamento = formaPagamento;
    this.parcelas = parcelas;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async listaVenda() {
    return db.select('*').from('venda');
  }

  static async listaVendaPorId(id) {
    const resultado = await db.select('*').from('venda').where({ id });
    return resultado[0];
  }

  async criarVenda() {
    const [registroCriado] = await db('venda').insert(this).returning('id');
    const [registroSelecionado] = await db('venda').where('id', registroCriado.id);
    return new Venda(registroSelecionado);
  }

  async atualizarVendaPorId(id) {
    await db('venda')
      .where({ id })
      .update({ ...this, updated_at: new Date().toISOString() });

    const resultado = await db.select('*').from('venda').where({ id });
    return new Venda(resultado[0]);
  }

  static async excluirVenda(id) {
    await db('venda').where({ id }).del();
  }

  async salvar() {
    if (this.id) {
      return this.atualizarVendaPorId(this.id);
    }
    return this.criarVenda();
  }
}

export default Venda;