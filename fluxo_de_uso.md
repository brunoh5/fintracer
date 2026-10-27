1. Usuário se Cadastra
2. Usuário cadastra Cliente, Veiculo, Serviço e Produto
3. Usuário cria ordem de serviço
  - Escolher o cliente (Possibilidade de não ter um cliente cadastrado)
  - Escolher o veiculo cadastrado (Possibilidade de não ter um usuário cadastrado)
  - Descrever o problema com o veiculo e poder adicionar observações
  - Escolher os serviços / peças
  - Escolher o formato de pagamento
  - Emitir PDF

Tudo junto, no inicio, não haverá possibilidade de abrir OS e fechar apenas criar e já emitir a OS

O backend deve receber todos os dados prontos para o cadastro da OS

```js
  const order = {
    order_number = "Vem do banco de dados",
    client_id,
    vehicle_id,
    complaint,
    observations,
    odometer_in,
    odometer_out,
    subtotal_in_cents,
    subtotal_services_in_cents,
    subtotal_products_in_cents,
    products = {
      id,
      quantity,
      price
    }[],
    services = {
      id,
      quantity,
      price
    }[],
    payments = {
      installment_number,
      due_date,
      payment_method,
      value,
    }[],
    status = "Pago" | "Não Pago" - "Status inicial",
    created_at,
  }
```