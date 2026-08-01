export interface CourseEnrollmentPayload {
  fullName: string;
  email: string;
  courseId: string;
}

export interface CourseEnrollmentErrors {
  fullName?: string;
  email?: string;
  courseId?: string;
}

export class CourseEnrollmentValidator {
  private static NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  private static EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  /** Formatea en tiempo real: elimina espacios iniciales y espacios dobles */
  static formatFullName(name: string): string {
    return name.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
  }

  /** Formatea en tiempo real: elimina todo espacio en blanco */
  static formatEmail(email: string): string {
    return email.replace(/\s+/g, "");
  }

  /** Valida el payload completo y retorna el estado y errores */
  static validate(payload: CourseEnrollmentPayload): { isValid: boolean; errors: CourseEnrollmentErrors } {
    const errors: CourseEnrollmentErrors = {};
    const cleanName = payload.fullName.trim();
    const cleanEmail = payload.email.trim();
    const words = cleanName.split(" ").filter((w) => w.length >= 2);

    // Validar Nombre
    if (!cleanName) {
      errors.fullName = "El nombre completo es obligatorio.";
    } else if (!this.NAME_REGEX.test(cleanName)) {
      errors.fullName = "El nombre solo debe contener letras.";
    } else if (words.length < 2) {
      errors.fullName = "Ingrese al menos nombre y apellido válidos.";
    }

    // Validar Email
    if (!cleanEmail) {
      errors.email = "El correo es obligatorio.";
    } else if (!this.EMAIL_REGEX.test(cleanEmail) || cleanEmail.includes("..") || cleanEmail.endsWith(".")) {
      errors.email = "Ingrese un correo electrónico válido.";
    }

    // Validar Curso
    if (!payload.courseId) {
      errors.courseId = "Debe seleccionar un curso de la lista.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}