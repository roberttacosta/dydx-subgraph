import {
  LogOperatorSet as LogOperatorSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/dYdX/dYdX"
import { LogOperatorSet, OwnershipTransferred } from "../generated/schema"

export function handleLogOperatorSet(event: LogOperatorSetEvent): void {
  let entity = new LogOperatorSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.trusted = event.params.trusted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
