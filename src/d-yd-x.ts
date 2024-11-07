import {
  LogOperatorSet as LogOperatorSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/dYdX/dYdX"; // Removido dYdXContract pois não é necessário aqui
import { LogOperatorSet, OwnershipTransferred, FlashLoanTransaction } from "../generated/schema";
import { BigInt, Bytes, log, ethereum } from "@graphprotocol/graph-ts";

// Handler para LogOperatorSet
export function handleLogOperatorSet(event: LogOperatorSetEvent): void {
  let entity = new LogOperatorSet(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.trusted = event.params.trusted;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

// Handler para OwnershipTransferred
export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

// Handler para Operate utilizando ethereum.Call diretamente
export function handleOperate(call: ethereum.Call): void {
  // ID único para a transação com base no hash da transação
  let id = call.transaction.hash.toHex();
  let flashLoan = new FlashLoanTransaction(Bytes.fromHexString(id) as Bytes);

  // Configurando os parâmetros principais
  flashLoan.borrower = call.from;
  flashLoan.amount = BigInt.zero(); // Inicializamos com 0, mas pode ser alterado conforme necessário
  flashLoan.actionType = "FlashLoan";
  flashLoan.timestamp = call.block.timestamp;
  flashLoan.blockNumber = call.block.number;
  flashLoan.transactionHash = call.transaction.hash;

  // Detalhes adicionais
  flashLoan.details = "Detalhes sobre a transação de Flash Loan";

  // Salvando a entidade FlashLoanTransaction no subgraph
  flashLoan.save();

  log.info("Operação de Flash Loan registrada: {}", [flashLoan.transactionHash.toHex()]);
}
