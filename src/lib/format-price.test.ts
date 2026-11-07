import assert from "node:assert/strict";
import { test } from "node:test";
import { formatStartingPrice } from "./format-price";

test("starting prices format integer USD cents, including a real zero", () => {
  assert.equal(formatStartingPrice(2599), "Starting at $25.99");
  assert.equal(formatStartingPrice(100), "Starting at $1.00");
  assert.equal(formatStartingPrice(0), "Starting at $0.00");
  assert.equal(formatStartingPrice(123456), "Starting at $1,234.56");
});

test("unknown and invalid amounts fall back to a quote without inventing a price", () => {
  for (const amount of [null, -1, 12.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(formatStartingPrice(amount), "Request a quote");
  }
});
