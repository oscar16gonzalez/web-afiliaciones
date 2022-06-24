export class MembershipModel {
        //DATOS BASICOS
        cedula: number;
        apellido: string;
        nombre: string;
        genero: string
        fecha_nacimiento: string;

        //DATOS DE NOTIFICACION
        direccion: string;
        correo:string;
        celular: number;
        telefono: number;
        nombre_emergencia: string;
        celular_emergencia: number;
        
        //DATOS TRABAJADOR
        fecha_ingreso:string;
        curso_alturas: boolean;
        rut: string;
        examen_ingreso: boolean;
        cargo: string;
        salario: number;

        //DATOS AFILIACION
        eps: string;
        arl: string;
        fondo_pensiones: string;
        caja_compensacion: string;
        
        //DATOS BANCARIOS
        entidad_bancaria: string;
        numero_cuenta: string;
        estado: string;
        foto: string;
        
        // DATOS QUE NO VAN 
        // contratista: string;
        // contrato: string;
        // departamento: string;
        // municipio: string;
       

        constructor(){
                this.estado = 'pendiente_examen_medico';
            }
}