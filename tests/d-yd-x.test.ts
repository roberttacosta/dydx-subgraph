import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { LogOperatorSet } from "../generated/schema"
import { LogOperatorSet as LogOperatorSetEvent } from "../generated/dYdX/dYdX"
import { handleLogOperatorSet } from "../src/d-yd-x"
import { createLogOperatorSetEvent } from "./d-yd-x-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let operator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let trusted = "boolean Not implemented"
    let newLogOperatorSetEvent = createLogOperatorSetEvent(
      owner,
      operator,
      trusted
    )
    handleLogOperatorSet(newLogOperatorSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LogOperatorSet created and stored", () => {
    assert.entityCount("LogOperatorSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LogOperatorSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LogOperatorSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "operator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LogOperatorSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "trusted",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
