# Ejercicio Teórico 
### 1. Que problemas detectas en la operación y razona la respuesta

El principal problema que veo es que el precio del servicio esta guardado en MultimediaContent y no en el propio servicio.
Si en algun momento futuro el precio de un servicio es modificado la funcion getTotal() ya no devolveria correctamente el precio.

Ademas creo que se podrian hacer algunas optimizaciones al codigo:
- Sustituir el forEach por un reduce, asi tampoco necesitariamos la variable total
- Para assegurar que no haya errores yo gestionaria los precios con centimos (enteros) y no euros con decimales, al devolver el valor total se divide entre 100 y el resultado seria el mismo

![image](https://i.imgur.com/9DjmqpA.png)

### 2. Propón una solución alternativa que corrija los problemas de la operación.

Para solucionar el problema nombrado anteriormente creo que la mejor solucion seria crear un metodo en el Service que devolviera el precio del mismo (teniendo en cuenta el tipo de servicio y si es premium).

La funcion getTotal de RegistredUser:
```
getTotal: () => this.services.reduce((total, service) => total += service.getPrice(), 0);
```