import { describe, test, expect} from "vitest";
import { auth } from "../reducers";

describe("auth reducer", () => {
  test('should manage "auth/login/fulfilled" action', ()=> {
    const result = auth(false, {type: "auth/login/fulfilled"});
    expect(result).toBe(true);
  });
  test('should manage "auth/logout" action', ()=> {
    const result = auth(true, {type: "auth/logout"});
    expect(result).toBe(false);
  });
  test('should manage any other action', ()=> {
    const result = auth(true, {type: "ui/reset-error"});
    expect(result).toBe(true);
  });
});
    