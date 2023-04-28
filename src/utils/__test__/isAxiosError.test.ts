import { AxiosError, isAxiosError } from "axios";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { describe, it, expect } from "vitest";
import { isAxiosUnprocessableEntity } from "../isAxiosError";

// describe dùng để mô tả tập hợp các ngữ cảnh hoặc đơn vị cần test:
// VD: function, component
describe("isAxiosError", () => {
  // it dùng để ghi chú trường hợp cần test
  it("isAxiosError trả về boolean", () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false);
    expect(isAxiosError(new AxiosError())).toBe(true);
  });
});

describe("isAxiosUnprocessableEntity", () => {
  it("isAxiosUnprocessableEntity trả về boolean", () => {
    expect(isAxiosUnprocessableEntity(new Error())).toBe(false);
    expect(
      isAxiosUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null,
        } as any),
      ),
    ).toBe(false);
    expect(
      isAxiosUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.NotFound,
          data: null,
        } as any),
      ),
    ).toBe(false);
    expect(
      isAxiosUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null,
        } as any),
      ),
    ).toBe(true);
  });
});
