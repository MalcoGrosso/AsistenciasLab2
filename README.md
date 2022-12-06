# AsistenciasLab2
Sistema de Gestion de Asistencias Lab 2 ULP Javascript - node - Handlebars - Mysql 

Estos eran los objetivos requeridos para el sistema.

PROYECTO “Asistencia Clases Online”
TECNICATURA UNIVERSITARIA EN DESARROLLO WEB 
LABORATORIO de PROGRAMACIÓN II 

Tiempo de Desarrollo

Para el desarrollo del proyecto, el tiempo estimado es de 7 semanas. 

El desarrollo de la aplicación deberá ser realizado en forma individual a excepción de las actividades de definición de requisitos, análisis y diseño del software que podrán ser realizadas en grupo. 

Pautas de presentación 
   - La presentación funcional de la aplicación será individual, realizada en máquina y será evaluada por los responsables de la cátedra. 
   - El desarrollo de la aplicación será individual pudiendo realizar actividades grupales para las actividades previas a la codificación. 
   - Se deberán entregar los archivos fuentes de la aplicación desarrollada (fuentes y backup de la BD) en formato comprimido (.rar) junto con un informe en papel que incluya: 
   - Listado de problemas surgidos durante el desarrollo; y para cada uno, indicar como se solucionó. 
   - Aportes que el alumno considere importantes para anexar a la especificación, por ej.: pasos de instalación, aspectos de diseño de las interfaces, etc. 

Recomendaciones 
   - Realizar un análisis del dominio de la aplicación y definir el alcance del proyecto. 
   - Evacuar todas las dudas respecto a los requerimientos funcionales en el comienzo del proyecto. 
   - Organizar de forma efectiva los archivos fuentes de la aplicación como así también la claridad del código escrito. 
   
Evaluación 
   - Se considerará la completitud de los requisitos funcionales. 
   - La interfaz desarrollada para que el usuario logre realizar sus actividades. 
   - La validación de los datos tanto en el cliente como en el servidor. 
   - El diseño de la Base de Datos como también la definición de los diferentes mecanismos de restricciones. 
   - El uso de objetos de la BD como SP, Triggers, Funciones, eventos, etc. 
   - La arquitectura y organización de la aplicación (Front-End/Back-End). 
   - Buenas prácticas en general.
   
                                                Especificación del problema 
                                      Aplicación web “Asistencia de Clases Online” 
                                      
La carrera Tecnicatura Desarrollador de Software necesita de una herramienta para gestionar la asistencia a clases online del alumnado de las diversas materias que se cursan. 
Se necesita que la aplicación pueda registrar las materias con sus respectivos profesores y alumnos que la cursan. Por lo general las materias son cuatrimestrales pero podría darse casos de materias con dictados 
anuales. Las materias suelen dictarse en ambos cuatrimestres. 

Sistema de gestión y Autenticación de usuarios 

Se deben considerar 3 tipos de usuarios (roles): 

1 Usuarios Profesores (Autenticados) 
  - 1.1 Validan registración de alumnos en la materia. 
  - 1.2 Gestiona horarios de la Materia 
  - 1.3 Consultan asistencia de los cursos a cargo 
  - 1.4 Pueden exportar asistencia del curso en un archivo Excel (formato del documento más abajo) 
  
2 Usuarios Alumnos (Autenticados) 
  - 2.1 Se auto registran en la materia que cursan. (Usuario debe ser mail) 
  - 2.2 Registran la asistencia los días de clase que cursan. 
  
3 Usuarios Coordinadores (Autenticados) 
  - 3.1 Gestiona Materias y Profesores a cargo 
  - 3.2 Visión general sobre la asistencia de la carrera (% de asistencia general, indicador tipo semáforo por materia) 
  
El alumno deberá identificar la información necesaria para las diferentes entidades/conceptos. 

Algunas reglas de negocio que se deben considerar 

- El sistema debe notificar y resaltar de cierta forma los alumnos que tienen conflicto de horario. 
O sea, están cursando materias que tienen algún horario solapado. Es necesario que profesores y coordinadores puedan saber quienes son esos alumnos, en que materias y horarios tienen 
conflicto. 

- El registro de la asistencia debe realizarse dentro de los 30 primeros minutos del horario de la clase que asiste. 

- El profesor puede registrar el no dictado de una clase. Esto permitirá que la clase no sea tenida en cuenta para los indicadores de asistencia (y que por lo tanto no se considere a los alumnos 
ausentes)  

Formato del Excel que debe poder exportar el profesor para una materia


![tabla1](https://user-images.githubusercontent.com/71795846/205929066-77040856-22db-4b1a-8ea7-1a888ec36259.jpg)


** Cualquier consideración, requisito no definido o aclaración se debatirá y consensuará en clases. 


   
