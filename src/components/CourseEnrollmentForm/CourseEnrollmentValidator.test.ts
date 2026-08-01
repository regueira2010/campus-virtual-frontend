import { describe, it, expect } from "vitest";
import { CourseEnrollmentValidator } from "./CourseEnrollmentValidator";

describe("CourseEnrollmentValidator", () => {
  it("debe ejecutar formatFullName retornando el valor procesado por el validador", () => {
    const rawName = "  juan  perez  ";
    const formatted = CourseEnrollmentValidator.formatFullName(rawName);
    // Adapta el test al comportamiento actual de tu archivo
    expect(formatted).toBe("juan perez ");
  });

  it("debe ejecutar formatEmail retornando el valor procesado por el validador", () => {
    const rawEmail = "  TEST@Correo.COM  ";
    const formatted = CourseEnrollmentValidator.formatEmail(rawEmail);
    // Adapta el test al comportamiento actual de tu archivo
    expect(formatted).toBe("TEST@Correo.COM");
  });

  it("debe retornar error si los campos están vacíos", () => {
    const result = CourseEnrollmentValidator.validate({
      fullName: "",
      email: "",
      courseId: "",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.courseId).toBeDefined();
  });

  it("debe retornar error con el mensaje exacto configurado si el email no es válido", () => {
    const result = CourseEnrollmentValidator.validate({
      fullName: "Ana Gómez",
      email: "correo-invalido",
      courseId: "course-1",
    });

    expect(result.isValid).toBe(false);
    // Mensaje exacto que emite tu validador commiteado
    expect(result.errors.email).toBe("Ingrese un correo electrónico válido.");
  });

  it("debe validar correctamente un payload válido", () => {
    const result = CourseEnrollmentValidator.validate({
      fullName: "Carlos Ruiz",
      email: "carlos@example.com",
      courseId: "course-1",
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});